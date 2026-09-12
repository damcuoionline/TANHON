// Wedding Background Audio Engine with Automatic Direct Stream Fallbacks
// 1. "Váy Cưới" - ERIK, Kai Đinh (Primary track requested)
// 2. "Lễ Đường" - Kai Đinh

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  fallbackUrls?: string[];
  badge: string;
}

export const WEDDING_PLAYLIST: SongTrack[] = [
  {
    id: "vay-cuoi",
    title: "Váy Cưới",
    artist: "ERIK, Kai Đinh",
    src: "/assets/aistudio/vay-cuoi.mp3",
    fallbackUrls: [
      "https://cdn.jsdelivr.net/gh/damcuoionline/filenhac@main/Va%CC%81y%20Cu%CC%9Bo%CC%9B%CC%81i%20-%20ERIK,%20Kai%20%C4%90inh.mp3",
      "https://github.com/damcuoionline/filenhac/raw/refs/heads/main/Va%CC%81y%20Cu%CC%9Bo%CC%9B%CC%81i%20-%20ERIK,%20Kai%20%C4%90inh.mp3",
      "https://raw.githubusercontent.com/damcuoionline/filenhac/refs/heads/main/Va%CC%81y%20Cu%CC%9Bo%CC%9B%CC%81i%20-%20ERIK,%20Kai%20%C4%90inh.mp3"
    ],
    badge: "Bài 1"
  },
  {
    id: "le-duong",
    title: "Lễ Đường",
    artist: "Kai Đinh",
    src: "/assets/aistudio/le-duong.mp3",
    fallbackUrls: [
      "https://cdn.jsdelivr.net/gh/damcuoionline/filenhac@main/Le%CC%82%CC%83%20%C4%90u%CC%9Bo%CC%9B%CC%80ng%20-%20Kai%20%C4%90inh.mp3",
      "https://github.com/damcuoionline/filenhac/raw/refs/heads/main/Le%CC%82%CC%83%20%C4%90u%CC%9Bo%CC%9B%CC%80ng%20-%20Kai%20%C4%90inh.mp3",
      "https://raw.githubusercontent.com/damcuoionline/filenhac/refs/heads/main/Le%CC%82%CC%83%20%C4%90u%CC%9Bo%CC%9B%CC%80ng%20-%20Kai%20%C4%90inh.mp3"
    ],
    badge: "Bài 2"
  }
];

export interface AudioState {
  isPlaying: boolean;
  trackIndex: number;
  currentTrack: SongTrack;
  currentTime: number;
  duration: number;
}

class WeddingAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private currentCandidateIndex: number = 0;
  private volume: number = 0.85;
  private listeners: ((state: AudioState) => void)[] = [];
  private hasInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private getCandidatesForTrack(trackIndex: number): string[] {
    const track = WEDDING_PLAYLIST[trackIndex] || WEDDING_PLAYLIST[0];
    const list: string[] = [];
    if (track.src) list.push(track.src);
    if (track.fallbackUrls) {
      list.push(...track.fallbackUrls);
    }
    // Deduplicate
    return Array.from(new Set(list));
  }

  private initAudio() {
    if (this.hasInitialized || typeof window === 'undefined') return;
    this.hasInitialized = true;

    try {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.audio.volume = this.volume;

      this.audio.addEventListener('ended', () => {
        this.nextTrack();
      });

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('timeupdate', () => {
        this.notify();
      });

      this.audio.addEventListener('loadedmetadata', () => {
        this.notify();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Wedding audio error:', e);
        this.tryNextCandidate(this.isPlaying);
      });

      this.loadTrack(this.currentTrackIndex, false);
    } catch (err) {
      console.warn('Could not initialize audio:', err);
    }
  }

  private tryNextCandidate(shouldAutoPlay: boolean) {
    if (!this.audio) return;
    const candidates = this.getCandidatesForTrack(this.currentTrackIndex);
    if (this.currentCandidateIndex + 1 < candidates.length) {
      this.currentCandidateIndex += 1;
      const nextUrl = candidates[this.currentCandidateIndex];
      console.log(`Switching to backup audio URL (${this.currentCandidateIndex + 1}/${candidates.length}):`, nextUrl);
      this.audio.src = nextUrl;
      this.audio.load();
      if (shouldAutoPlay) {
        this.audio.play().then(() => {
          this.isPlaying = true;
          this.notify();
        }).catch(() => {
          this.tryNextCandidate(shouldAutoPlay);
        });
      }
    } else {
      console.warn('All audio sources exhausted for track', this.currentTrackIndex);
    }
  }

  private loadTrack(index: number, autoPlay: boolean = true) {
    this.initAudio();
    if (!this.audio) return;

    this.currentTrackIndex = (index + WEDDING_PLAYLIST.length) % WEDDING_PLAYLIST.length;
    this.currentCandidateIndex = 0;
    const candidates = this.getCandidatesForTrack(this.currentTrackIndex);
    const targetUrl = candidates[0];

    try {
      this.audio.src = targetUrl;
      this.audio.load();
    } catch (e) {
      console.warn('Error setting audio src:', e);
    }

    if (autoPlay) {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            console.log('Autoplay attempt caught, trying direct fallback stream:', err);
            this.tryNextCandidate(true);
          });
      }
    } else {
      this.notify();
    }
  }

  public subscribe(callback: (state: AudioState) => void) {
    this.listeners.push(callback);
    this.notify();
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notify() {
    const currentTrack = WEDDING_PLAYLIST[this.currentTrackIndex] || WEDDING_PLAYLIST[0];
    const state: AudioState = {
      isPlaying: this.isPlaying,
      trackIndex: this.currentTrackIndex,
      currentTrack,
      currentTime: this.audio ? this.audio.currentTime : 0,
      duration: this.audio && !isNaN(this.audio.duration) ? this.audio.duration : 0
    };
    this.listeners.forEach((cb) => {
      try {
        cb(state);
      } catch {
        // ignore callback error
      }
    });
  }

  public getCurrentTrack(): SongTrack {
    return WEDDING_PLAYLIST[this.currentTrackIndex] || WEDDING_PLAYLIST[0];
  }

  public getTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public play() {
    this.initAudio();
    if (!this.audio) return;
    if (!this.audio.src || this.audio.src === '' || this.audio.error) {
      this.loadTrack(this.currentTrackIndex, true);
      return;
    }
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch((err) => {
          console.log('Audio play failed, retrying with fallback CDN stream:', err);
          this.tryNextCandidate(true);
        });
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    this.pause();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public playTrack(index: number) {
    this.loadTrack(index, true);
  }

  public nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % WEDDING_PLAYLIST.length;
    this.loadTrack(nextIdx, true);
  }

  public prevTrack() {
    const prevIdx = (this.currentTrackIndex - 1 + WEDDING_PLAYLIST.length) % WEDDING_PLAYLIST.length;
    this.loadTrack(prevIdx, true);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }
}

export const weddingAudio = new WeddingAudioEngine();
