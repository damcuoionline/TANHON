/**
 * Image URL Optimization & Staged Progressive Preloading Service
 * 
 * Strategy:
 * 1. Phase 1 (Highest Priority): Preload primary background image first.
 * 2. Phase 2 (Progressive Background Queue): Once the background is fully loaded,
 *    trickle/slow-load remaining images (avatars, milestones, gallery) in small batches
 *    during browser idle time. This keeps the network and main thread 100% responsive
 *    for smooth 60fps animations while ensuring all photos are ready before the user scrolls to them.
 */

// Global set to keep track of loaded images in memory so we don't flash skeletons on already loaded images
export const memoryLoadedImages = new Set<string>();

/**
 * Converts GitHub repository URLs to direct high-speed CDN / Raw URLs to bypass redirect hops
 */
export function getOptimizedImageUrl(url: string): string {
  if (!url) return '';

  // Convert github blob URL with raw=true to raw.githubusercontent.com
  if (url.includes('github.com') && url.includes('/blob/main/')) {
    return url
      .replace('https://github.com/', 'https://raw.githubusercontent.com/')
      .replace('/blob/main/', '/main/')
      .replace('?raw=true', '');
  }

  return url;
}

/**
 * Phase 1: Load and decode the primary background image with highest priority.
 * Guaranteed to resolve (with safety timeout) so slow connections never hang the app.
 */
export function loadPrimaryBackground(url: string, timeoutMs: number = 2500): Promise<boolean> {
  const directUrl = getOptimizedImageUrl(url);
  if (!directUrl) return Promise.resolve(false);

  if (memoryLoadedImages.has(directUrl)) {
    return Promise.resolve(true);
  }

  return new Promise<boolean>((resolve) => {
    let resolved = false;

    const finish = (success: boolean) => {
      if (!resolved) {
        resolved = true;
        if (success) {
          memoryLoadedImages.add(directUrl);
        }
        resolve(success);
      }
    };

    // Safety timeout to avoid blocking subsequent image loading on poor networks
    const timer = setTimeout(() => {
      finish(false);
    }, timeoutMs);

    const img = new Image();
    img.decoding = 'async';
    // Priority hint for modern browsers
    if ('fetchPriority' in img) {
      (img as HTMLImageElement).fetchPriority = 'high';
    }

    img.onload = () => {
      clearTimeout(timer);
      if ('decode' in img && typeof img.decode === 'function') {
        img.decode()
          .then(() => finish(true))
          .catch(() => finish(true)); // Resolved even if decode fails
      } else {
        finish(true);
      }
    };

    img.onerror = () => {
      clearTimeout(timer);
      finish(false);
    };

    img.src = directUrl;
  });
}

export interface ProgressivePreloadOptions {
  batchSize?: number; // Number of images to load in parallel per batch (default: 2)
  batchDelayMs?: number; // Delay between batches to yield thread (default: 160ms)
  onProgress?: (loaded: number, total: number) => void;
}

/**
 * Phase 2: Controlled progressive slow-load of remaining images.
 * Batches images into small chunks spaced by idle callbacks/timeouts to prevent
 * saturating the network bandwidth or UI main thread.
 */
export function queueProgressivePreload(
  urls: string[],
  options: ProgressivePreloadOptions = {}
): { cancel: () => void; promise: Promise<void> } {
  const { batchSize = 2, batchDelayMs = 160, onProgress } = options;
  const directUrls = Array.from(new Set(urls.map(getOptimizedImageUrl).filter(Boolean)));
  
  // Filter out already cached images
  const pendingUrls = directUrls.filter((url) => !memoryLoadedImages.has(url));
  const total = directUrls.length;
  let loadedCount = total - pendingUrls.length;

  if (onProgress) {
    onProgress(loadedCount, total);
  }

  if (pendingUrls.length === 0) {
    return {
      cancel: () => {},
      promise: Promise.resolve(),
    };
  }

  let isCancelled = false;
  let currentTimeout: ReturnType<typeof setTimeout> | null = null;

  const cancel = () => {
    isCancelled = true;
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
  };

  const promise = new Promise<void>((resolve) => {
    let index = 0;

    const loadBatch = () => {
      if (isCancelled || index >= pendingUrls.length) {
        resolve();
        return;
      }

      const currentBatch = pendingUrls.slice(index, index + batchSize);
      index += batchSize;

      const batchPromises = currentBatch.map((src) => {
        return new Promise<void>((batchResolve) => {
          if (memoryLoadedImages.has(src)) {
            batchResolve();
            return;
          }

          const img = new Image();
          img.decoding = 'async';
          if ('fetchPriority' in img) {
            (img as HTMLImageElement).fetchPriority = 'low';
          }

          img.onload = () => {
            memoryLoadedImages.add(src);
            loadedCount++;
            if (onProgress) onProgress(loadedCount, total);
            batchResolve();
          };

          img.onerror = () => {
            // Still resolve so queue moves forward
            loadedCount++;
            if (onProgress) onProgress(loadedCount, total);
            batchResolve();
          };

          img.src = src;
        });
      });

      Promise.all(batchPromises).then(() => {
        if (isCancelled) {
          resolve();
          return;
        }

        // Use requestIdleCallback if available, fallback to setTimeout
        const scheduleNext = (callback: () => void) => {
          if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
              .requestIdleCallback(callback, { timeout: 350 });
          } else {
            currentTimeout = setTimeout(callback, batchDelayMs);
          }
        };

        scheduleNext(() => {
          loadBatch();
        });
      });
    };

    // Kick off first batch
    loadBatch();
  });

  return { cancel, promise };
}

/**
 * Legacy compatibility wrapper for preloadImages
 */
export function preloadImages(urls: string[], priority: 'high' | 'low' = 'low'): Promise<void[]> {
  const optimizedUrls = urls.map(getOptimizedImageUrl).filter(Boolean);

  const promises = optimizedUrls.map((src) => {
    return new Promise<void>((resolve) => {
      if (memoryLoadedImages.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.decoding = 'async';
      if (priority === 'high' && 'fetchPriority' in img) {
        (img as HTMLImageElement).fetchPriority = 'high';
      }

      img.onload = () => {
        memoryLoadedImages.add(src);
        resolve();
      };

      img.onerror = () => {
        resolve();
      };

      img.src = src;
    });
  });

  return Promise.all(promises);
}
