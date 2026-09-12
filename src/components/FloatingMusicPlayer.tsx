import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Music, Check, Sparkles } from 'lucide-react';
import { weddingAudio, SongTrack, AudioState, WEDDING_PLAYLIST } from './AudioEngine';

export const FloatingMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(weddingAudio.getStatus());
  const [currentTrack, setCurrentTrack] = useState<SongTrack>(weddingAudio.getCurrentTrack());
  const [trackIndex, setTrackIndex] = useState<number>(weddingAudio.getTrackIndex());
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state: AudioState) => {
      setIsPlaying(state.isPlaying);
      setCurrentTrack(state.currentTrack);
      setTrackIndex(state.trackIndex);
      setCurrentTime(state.currentTime);
      setDuration(state.duration);
    });
    return () => unsubscribe();
  }, []);

  // Close playlist popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPlaylist(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    weddingAudio.toggle();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.nextTrack();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.prevTrack();
  };

  const handleSelectTrack = (index: number) => {
    weddingAudio.playTrack(index);
    setShowPlaylist(false);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      aria-label="Trình phát nhạc đám cưới"
      className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none"
    >
      {/* Playlist Popover Menu */}
      {showPlaylist && (
        <div className="mb-2.5 w-72 sm:w-80 bg-[#FFFDF9]/95 backdrop-blur-xl border-2 border-amber-300 rounded-2xl shadow-2xl p-3 text-stone-800 animate-fadeIn overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200/80">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
              <ListMusic className="w-4 h-4 text-amber-600" />
              <span>Danh Sách Nhạc Cưới ({WEDDING_PLAYLIST.length})</span>
            </div>
            <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-full">
              Minh Cảnh & Thanh Nhi
            </span>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {WEDDING_PLAYLIST.map((song, idx) => {
              const isCurrent = trackIndex === idx;
              return (
                <button
                  key={song.id}
                  type="button"
                  onClick={() => handleSelectTrack(idx)}
                  className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-100/90 border border-amber-400 text-stone-950 font-bold shadow-xs'
                      : 'hover:bg-amber-50/80 text-stone-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                      isCurrent ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-heading font-bold truncate leading-tight">
                        {song.title}
                      </p>
                      <p className="text-[10px] text-stone-500 truncate">
                        {song.artist}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1">
                    {isCurrent && isPlaying && (
                      <span className="flex items-end gap-0.5 h-3">
                        <span className="w-0.5 bg-amber-600 rounded-full animate-pulse h-2" />
                        <span className="w-0.5 bg-amber-600 rounded-full animate-pulse h-3" style={{ animationDelay: '0.15s' }} />
                        <span className="w-0.5 bg-amber-600 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.3s' }} />
                      </span>
                    )}
                    {isCurrent && !isPlaying && (
                      <Check className="w-3.5 h-3.5 text-amber-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-amber-200/60 text-[10px] text-center text-stone-500 italic">
            Chạm để chọn phát bài trực tiếp
          </div>
        </div>
      )}

      {/* Floating Compact Player Pill / Disc */}
      <div 
        className="flex items-center gap-1.5 sm:gap-2 bg-[#FFFDF7]/95 backdrop-blur-md border-2 border-amber-300/90 shadow-[0_10px_35px_rgba(217,119,6,0.25)] rounded-full p-1.5 pr-2.5 sm:pr-3 transition-all duration-300 relative overflow-hidden"
      >
        {/* Subtle Bottom Progress Line */}
        {duration > 0 && (
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-amber-100">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Spinning Vinyl Disc Button */}
        <button
          type="button"
          onClick={handleToggle}
          title={isPlaying ? "Tạm dừng nhạc (Pause)" : "Phát nhạc nền (Play)"}
          className="relative group focus:outline-hidden cursor-pointer"
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-900 border-2 border-amber-300 flex items-center justify-center shadow-md transition-transform duration-300 active:scale-95 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          >
            {/* Vinyl record grooves */}
            <div className="absolute inset-1 rounded-full border border-stone-700/80 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-stone-700/40 pointer-events-none" />
            
            {/* Center label */}
            <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
            </div>

            {/* Play/Pause Overlay indicator on hover */}
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white fill-white" />
              ) : (
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              )}
            </div>
          </div>

          {/* Floating musical note animation when playing */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          )}
        </button>

        {/* Track info & click to toggle playlist */}
        <div 
          onClick={() => setShowPlaylist(!showPlaylist)}
          title="Bấm để xem danh sách bài hát"
          className="flex flex-col cursor-pointer max-w-[120px] sm:max-w-[150px] pl-1 pr-0.5"
        >
          <div className="flex items-center gap-1">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-800 flex items-center gap-0.5">
              {isPlaying ? (
                <>
                  <Volume2 className="w-3 h-3 text-amber-600 animate-pulse" />
                  <span>Đang phát</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-stone-400" />
                  <span>Tắt tiếng</span>
                </>
              )}
            </span>
            {isPlaying && (
              <span className="flex items-end gap-0.5 h-2">
                <span className="w-0.5 bg-amber-600 rounded-full animate-pulse h-1.5" />
                <span className="w-0.5 bg-amber-600 rounded-full animate-pulse h-2" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 bg-amber-600 rounded-full animate-pulse h-1" style={{ animationDelay: '0.4s' }} />
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[11px] sm:text-xs font-bold text-amber-950 truncate leading-tight">
              {currentTrack.title}
            </p>
          </div>
          <span className="text-[9px] text-stone-500 truncate">
            {currentTrack.artist}
          </span>
        </div>

        {/* Previous, Play/Pause, Next & Playlist Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={handlePrev}
            title="Bài trước"
            className="p-1 sm:p-1.5 rounded-full hover:bg-amber-200/60 text-stone-700 hover:text-amber-950 active:scale-95 transition-all cursor-pointer"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleToggle}
            title={isPlaying ? "Tạm dừng" : "Phát tiếp"}
            className="p-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-stone-900 active:scale-95 transition-all cursor-pointer shadow-2xs"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-stone-900" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-stone-900 ml-0.5" />
            )}
          </button>
          <button
            type="button"
            onClick={handleNext}
            title="Bài tiếp theo (Váy Cưới / Lễ Đường)"
            className="p-1 sm:p-1.5 rounded-full hover:bg-amber-200/60 text-stone-700 hover:text-amber-950 active:scale-95 transition-all cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowPlaylist(!showPlaylist);
            }}
            title="Mở danh sách bài hát"
            className={`p-1 sm:p-1.5 rounded-full transition-all cursor-pointer ${
              showPlaylist ? 'bg-amber-400 text-stone-950' : 'hover:bg-amber-200/60 text-amber-800'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
