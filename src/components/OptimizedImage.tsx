import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl, memoryLoadedImages } from '../utils/imageOptimizer';
import { Image as ImageIcon, Sparkles, Heart } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallbackSrc?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholderTitle?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src = '',
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  fallbackSrc,
  objectFit = 'cover',
  placeholderTitle,
  ...rest
}) => {
  const hasValidSrc = Boolean(src && src.trim().length > 0);
  const optimizedSrc = hasValidSrc ? getOptimizedImageUrl(src) : '';
  const isAlreadyCached = hasValidSrc && memoryLoadedImages.has(optimizedSrc);
  const [isLoaded, setIsLoaded] = useState<boolean>(isAlreadyCached);
  const [hasError, setHasError] = useState<boolean>(!hasValidSrc);
  const [currentSrc, setCurrentSrc] = useState<string>(optimizedSrc);

  useEffect(() => {
    if (!src || src.trim() === '') {
      setHasError(true);
      setIsLoaded(true);
      return;
    }

    const directUrl = getOptimizedImageUrl(src);
    setCurrentSrc(directUrl);
    setHasError(false);
    
    if (memoryLoadedImages.has(directUrl)) {
      setIsLoaded(true);
      return;
    }

    // Check if the image is already in browser cache
    const img = new Image();
    img.src = directUrl;
    if (img.complete && img.naturalWidth > 0) {
      memoryLoadedImages.add(directUrl);
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = () => {
    if (currentSrc) {
      memoryLoadedImages.add(currentSrc);
    }
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else if (src && currentSrc !== src) {
      setCurrentSrc(src);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  // If no source provided or failed to load: render luxury wedding photo placeholder frame
  if (!hasValidSrc || hasError) {
    return (
      <div 
        className={`relative overflow-hidden flex flex-col items-center justify-center p-4 text-center select-none bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EC] to-[#F3E7D5] border border-amber-200/80 shadow-inner ${containerClassName}`}
      >
        {/* Ornate corner flourishes */}
        <div className="absolute top-2 left-2 text-[10px] text-amber-400/60 font-serif pointer-events-none">✤</div>
        <div className="absolute top-2 right-2 text-[10px] text-amber-400/60 font-serif pointer-events-none">✤</div>
        <div className="absolute bottom-2 left-2 text-[10px] text-amber-400/60 font-serif pointer-events-none">✤</div>
        <div className="absolute bottom-2 right-2 text-[10px] text-amber-400/60 font-serif pointer-events-none">✤</div>

        {/* Soft radial gold spotlight */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-100/80 border border-amber-300/60 flex items-center justify-center mb-2.5 shadow-xs text-amber-700">
          <ImageIcon className="w-7 h-7 sm:w-9 sm:h-9 text-amber-600 drop-shadow-xs" />
        </div>

        <div className="space-y-1 max-w-[85%]">
          <p className="font-heading font-bold text-amber-950 text-xs sm:text-sm line-clamp-1">
            {placeholderTitle || alt || 'Khung Ảnh Kỷ Niệm'}
          </p>
          <p className="text-[11px] text-stone-500 font-serif italic">
            Chạm để xem hoặc thêm ảnh
          </p>
        </div>

        <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/50 border border-amber-300/40 text-[10px] text-amber-800 font-medium">
          <Sparkles className="w-2.5 h-2.5 text-amber-600" />
          <span>Vị trí ảnh cưới</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Soft warm champagne shimmer skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#FBF8F3] animate-pulse flex items-center justify-center z-0">
          <div className="w-full h-full bg-gradient-to-r from-amber-100/30 via-yellow-100/40 to-amber-100/30 animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full ${
          objectFit === 'contain' ? 'object-contain' : objectFit === 'fill' ? 'object-fill' : 'object-cover'
        } transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-102 blur-xs'
        } ${className}`}
        {...rest}
      />
    </div>
  );
};
