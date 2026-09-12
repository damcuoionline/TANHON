import React from 'react';
import { GalleryPhoto } from '../data/weddingData';
import {
  Heart,
  ZoomIn,
  Sparkles,
  Crown,
  Camera,
  Film,
  Gem,
} from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { GoldenLotusIcon } from './PatrioticEmblem';

export type ColorFilter = 'original' | 'warm-sun' | 'romantic-rose' | 'vintage-film' | 'classic-bw';

export const FILTER_STYLES: Record<ColorFilter, string> = {
  original: '',
  'warm-sun': 'sepia-[0.22] saturate-[1.25] contrast-[1.05] brightness-[1.02]',
  'romantic-rose': 'hue-rotate-[-10deg] saturate-[1.18] brightness-[1.04]',
  'vintage-film': 'sepia-[0.38] contrast-[0.96] brightness-[0.98]',
  'classic-bw': 'grayscale contrast-[1.12]',
};

export type CardStyleType =
  | 'royal-arch'
  | 'vintage-polaroid'
  | 'film-strip-35mm'
  | 'editorial-vogue'
  | 'heritage-gold-leaf'
  | 'cameo-medallion';

interface DiversePhotoCardProps {
  photo: GalleryPhoto;
  index: number;
  likes: number;
  onLike: (e: React.MouseEvent) => void;
  onOpen: () => void;
  fitMode: 'contain' | 'cover';
  activeFilter: ColorFilter;
}

export const DiversePhotoCard: React.FC<DiversePhotoCardProps> = ({
  photo,
  index,
  likes,
  onLike,
  onOpen,
  fitMode,
  activeFilter,
}) => {
  // Cycle through 6 distinct artistic styles based on index
  const styleTypes: CardStyleType[] = [
    'royal-arch',
    'vintage-polaroid',
    'film-strip-35mm',
    'editorial-vogue',
    'heritage-gold-leaf',
    'cameo-medallion',
  ];
  const styleType = styleTypes[index % styleTypes.length];
  const filterClass = FILTER_STYLES[activeFilter] || '';

  // -------------------------------------------------------------
  // STYLE 0: KHUNG VÒM CUNG ĐIỆN HOÀNG GIA (Royal Cathedral Arch)
  // -------------------------------------------------------------
  if (styleType === 'royal-arch') {
    return (
      <div
        id={`gallery-card-arch-${photo.id}`}
        onClick={onOpen}
        className="group relative rounded-t-[75px] sm:rounded-t-[95px] rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF5E8] to-[#F3E8D0] p-3 sm:p-4 border-2 border-amber-400 shadow-[0_16px_40px_rgba(217,119,6,0.12)] hover:shadow-[0_28px_65px_rgba(217,119,6,0.32)] ring-1 ring-amber-300/60 transition-all duration-500 hover:-translate-y-2.5 cursor-pointer flex flex-col justify-between h-full overflow-hidden"
      >
        {/* Style Badge at Crown Apex */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-stone-950 shadow-md border border-yellow-200 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
          <Crown className="w-3 h-3 text-stone-900" />
          <span>Vòm Hoàng Gia</span>
        </div>

        {/* Ambient Halo Behind Arch on Hover */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Inner Velvet Arch Frame */}
        <div className="relative w-full h-[380px] sm:h-[420px] mt-6 rounded-t-[60px] sm:rounded-t-[75px] rounded-b-xl overflow-hidden bg-gradient-to-b from-[#1E1712] via-[#2A2019] to-[#18130F] shadow-[inset_0_4px_25px_rgba(0,0,0,0.5)] border-2 border-amber-400/80 flex items-center justify-center ring-1 ring-amber-300/40">
          {/* Ambient Blurred Aura in contain mode */}
          {fitMode === 'contain' && photo.imageUrl && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={photo.imageUrl}
                alt=""
                aria-hidden="true"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className={`w-full h-full object-cover blur-2xl scale-125 opacity-70 transition-all duration-700 ${filterClass}`}
              />
              <div className="absolute inset-0 bg-amber-950/20 backdrop-blur-xs" />
            </div>
          )}

          {/* Photo - Seamless Edge to Edge */}
          <div className="relative z-10 w-full h-full overflow-hidden">
            <OptimizedImage
              src={photo.imageUrl}
              fallbackSrc={photo.fallbackUrl || photo.thumbnailUrl}
              alt={photo.title}
              placeholderTitle={photo.title}
              objectFit={fitMode}
              containerClassName="w-full h-full"
              className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${filterClass}`}
            />
          </div>

          {/* Vertical Light Cascade Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-200/20 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3 z-30">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-amber-200 border border-amber-300/40 shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              {photo.category === 'prewedding' ? 'Pre-Wedding' : photo.category === 'studio' ? 'Studio' : 'Kỷ Niệm'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
            <button
              type="button"
              onClick={onLike}
              className="p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-rose-600 hover:text-white border border-white/20 transition-all transform active:scale-90 cursor-pointer shadow-md"
              title="Thả tim bức ảnh này"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-400 group-hover:text-white" />
            </button>
            <div className="p-2 rounded-full bg-black/70 backdrop-blur-md text-amber-200 border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity shadow-md">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Royal Caption Plaque */}
        <div className="mt-3.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-100/80 via-yellow-50/95 to-amber-100/80 border border-amber-300/90 flex items-center justify-between shadow-xs">
          <div className="pr-2 min-w-0 flex-1">
            <h3 className="font-heading font-bold text-amber-950 text-sm sm:text-base truncate">
              {photo.title}
            </h3>
            <p className="text-stone-600 text-xs font-serif italic line-clamp-1 mt-0.5">
              {photo.caption}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg bg-white/90 border border-amber-200 text-rose-600 font-bold text-xs shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STYLE 1: ẢNH POLAROID KỶ NIỆM CỔ ĐIỂN (Artisan Vintage Polaroid)
  // -------------------------------------------------------------
  if (styleType === 'vintage-polaroid') {
    return (
      <div
        id={`gallery-card-polaroid-${photo.id}`}
        onClick={onOpen}
        className="group relative rounded-xl bg-[#FAF7F0] p-3 sm:p-4 pb-5 border border-stone-300/90 shadow-[0_14px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_25px_60px_rgba(180,83,9,0.25)] transition-all duration-500 transform sm:-rotate-1 hover:rotate-0 hover:-translate-y-3 cursor-pointer flex flex-col justify-between h-full"
      >
        {/* Decorative Washi Tape at Top */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-30 w-24 h-5 bg-gradient-to-r from-amber-200/90 via-yellow-100/95 to-amber-200/90 backdrop-blur-xs border border-amber-300/80 shadow-xs rotate-[1deg] flex items-center justify-center">
          <span className="text-[9px] font-mono tracking-widest text-amber-950 font-bold uppercase">✦ MEMORY ✦</span>
        </div>

        {/* Style Badge */}
        <div className="absolute top-4 left-4 z-30">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/80 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-amber-200 border border-amber-300/40 shadow-xs">
            <Camera className="w-2.5 h-2.5 text-amber-300" />
            <span>Polaroid Cổ Điển</span>
          </span>
        </div>

        {/* Action Buttons (Top Right) */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5">
          <button
            type="button"
            onClick={onLike}
            className="p-2 rounded-full bg-white/90 text-stone-800 hover:bg-rose-500 hover:text-white border border-stone-200 transition-all transform active:scale-90 cursor-pointer shadow-md"
            title="Thả tim bức ảnh này"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-rose-500 group-hover:text-rose-500" />
          </button>
          <div className="p-2 rounded-full bg-white/90 text-stone-700 border border-stone-200 opacity-90 group-hover:opacity-100 transition-opacity shadow-md">
            <ZoomIn className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Photographic Window with Inset Frame */}
        <div className="relative w-full h-[360px] sm:h-[390px] mt-3 rounded-lg overflow-hidden bg-stone-100 border border-stone-300/80 shadow-inner flex items-center justify-center">
          {fitMode === 'contain' && photo.imageUrl && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={photo.imageUrl}
                alt=""
                aria-hidden="true"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className={`w-full h-full object-cover blur-2xl scale-125 opacity-70 transition-all duration-700 ${filterClass}`}
              />
              <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-xs" />
            </div>
          )}

          <div className="relative z-10 w-full h-full overflow-hidden">
            <OptimizedImage
              src={photo.imageUrl}
              fallbackSrc={photo.fallbackUrl || photo.thumbnailUrl}
              alt={photo.title}
              placeholderTitle={photo.title}
              objectFit={fitMode}
              containerClassName="w-full h-full"
              className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-104 ${filterClass}`}
            />
          </div>

          {/* Subtle Flash Shimmer Flare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
        </div>

        {/* Polaroid Bottom Margin with Handwritten Calligraphy */}
        <div className="mt-4 px-1 flex items-end justify-between">
          <div className="pr-2 min-w-0 flex-1">
            <h3 className="font-serif italic font-bold text-amber-950 text-base sm:text-lg truncate">
              {photo.title}
            </h3>
            <p className="text-stone-600 text-xs font-serif italic line-clamp-1 mt-0.5">
              "{photo.caption}"
            </p>
            <div className="text-[10px] text-amber-800/80 font-mono mt-1">
              Minh Cảnh & Thanh Nhi • 04/10/2026
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-rose-600 font-bold text-xs shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STYLE 2: THƯỚC PHIM ĐIỆN ẢNH 35MM (Cinematic 35mm Film Strip)
  // -------------------------------------------------------------
  if (styleType === 'film-strip-35mm') {
    return (
      <div
        id={`gallery-card-film-${photo.id}`}
        onClick={onOpen}
        className="group relative rounded-2xl bg-[#0E0C0A] p-3 sm:p-4 border-2 border-amber-500/70 shadow-[0_16px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_26px_65px_rgba(245,158,11,0.28)] transition-all duration-500 hover:-translate-y-2.5 cursor-pointer flex flex-col justify-between h-full overflow-hidden"
      >
        {/* Top 35mm Perforation Sprockets Strip */}
        <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-[9px] font-mono text-amber-400/85 tracking-widest uppercase">
          <div className="flex items-center gap-1">
            <Film className="w-3 h-3 text-red-400 animate-pulse" />
            <span>KODAK PORTRA 400</span>
          </div>
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="w-2.5 h-2 rounded-[2px] bg-stone-700/80 group-hover:bg-amber-400/60 transition-colors inline-block" />
            ))}
          </div>
          <span>FRAME #{index + 1}</span>
        </div>

        {/* Inner Cinema Window */}
        <div className="relative w-full h-[360px] sm:h-[400px] my-2.5 rounded-xl overflow-hidden bg-stone-950 border border-amber-400/50 shadow-inner flex items-center justify-center">
          {fitMode === 'contain' && photo.imageUrl && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={photo.imageUrl}
                alt=""
                aria-hidden="true"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className={`w-full h-full object-cover blur-2xl scale-125 opacity-70 transition-all duration-700 ${filterClass}`}
              />
              <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-xs" />
            </div>
          )}

          <div className="relative z-10 w-full h-full overflow-hidden">
            <OptimizedImage
              src={photo.imageUrl}
              fallbackSrc={photo.fallbackUrl || photo.thumbnailUrl}
              alt={photo.title}
              placeholderTitle={photo.title}
              objectFit={fitMode}
              containerClassName="w-full h-full"
              className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${filterClass}`}
            />
          </div>

          {/* Horizontal Golden Light Leak Streak Sweep on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-20" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3 z-30">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-amber-200 border border-amber-400/40">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>35mm Điện Ảnh</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
            <button
              type="button"
              onClick={onLike}
              className="p-2 rounded-full bg-black/80 backdrop-blur-md text-white hover:bg-rose-600 border border-white/20 transition-all transform active:scale-90 cursor-pointer shadow-md"
              title="Thả tim bức ảnh này"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-400 group-hover:text-white" />
            </button>
            <div className="p-2 rounded-full bg-black/80 backdrop-blur-md text-amber-300 border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity shadow-md">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Bottom 35mm Sprocket Holes and Caption */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1 text-amber-100">
            <div className="pr-2 min-w-0 flex-1">
              <h3 className="font-heading font-bold text-amber-200 text-sm sm:text-base truncate drop-shadow-sm">
                {photo.title}
              </h3>
              <p className="text-stone-300 text-xs font-serif italic line-clamp-1 mt-0.5">
                {photo.caption}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg bg-stone-900 border border-amber-500/40 text-rose-400 font-bold text-xs shadow-inner">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{likes}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-stone-800 text-[8px] font-mono text-stone-400 tracking-wider">
            <span>ISO 400 • F/2.8 • 1/250s</span>
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="w-2.5 h-2 rounded-[2px] bg-stone-700/80 group-hover:bg-amber-400/60 transition-colors inline-block" />
              ))}
            </div>
            <span>CINEMA ROLL</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STYLE 3: BÌA TẠP CHÍ CƯỚI VOGUE / EDITORIAL (Luxury Vogue Cover)
  // -------------------------------------------------------------
  if (styleType === 'editorial-vogue') {
    return (
      <div
        id={`gallery-card-vogue-${photo.id}`}
        onClick={onOpen}
        className="group relative rounded-2xl bg-gradient-to-b from-[#FFFDFB] via-[#FAF6F0] to-[#F5EFE6] p-3 sm:p-4 border border-amber-300/90 shadow-[0_14px_35px_rgba(180,83,9,0.1)] hover:shadow-[0_28px_65px_rgba(180,83,9,0.25)] ring-1 ring-amber-200/50 transition-all duration-500 hover:-translate-y-2.5 cursor-pointer flex flex-col justify-between h-full overflow-hidden"
      >
        {/* Style Badge */}
        <div className="flex items-center justify-between pb-2 border-b border-amber-200/80">
          <span className="font-heading font-black text-amber-950 tracking-[0.2em] text-xs uppercase">
            L'AMOUR • VOGUE BRIDE
          </span>
          <span className="text-[10px] font-mono text-amber-800/80">
            N° 10 • 2026
          </span>
        </div>

        {/* High-Fashion Editorial Photo Box with Expanding Corner Brackets */}
        <div className="relative w-full h-[370px] sm:h-[410px] my-2.5 rounded-xl overflow-hidden bg-stone-100 border border-amber-300/80 flex items-center justify-center">
          {fitMode === 'contain' && photo.imageUrl && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={photo.imageUrl}
                alt=""
                aria-hidden="true"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className={`w-full h-full object-cover blur-2xl scale-125 opacity-70 transition-all duration-700 ${filterClass}`}
              />
              <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-xs" />
            </div>
          )}

          <div className="relative z-10 w-full h-full overflow-hidden">
            <OptimizedImage
              src={photo.imageUrl}
              fallbackSrc={photo.fallbackUrl || photo.thumbnailUrl}
              alt={photo.title}
              placeholderTitle={photo.title}
              objectFit={fitMode}
              containerClassName="w-full h-full"
              className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-107 ${filterClass}`}
            />
          </div>

          {/* 4 Art-Deco Gold Corner Brackets that Expand Outward on Hover */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400 z-20 pointer-events-none transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400 z-20 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-400 z-20 pointer-events-none transition-transform duration-500 group-hover:-translate-x-1 group-hover:translate-y-1" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-400 z-20 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />

          {/* Editorial Watermark Overlay */}
          <div className="absolute top-3 inset-x-0 text-center pointer-events-none z-20">
            <span className="text-[11px] font-heading tracking-[0.25em] text-white/70 font-semibold drop-shadow-md uppercase">
              SPECIAL WEDDING EDITION
            </span>
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-3 left-3 z-30">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-amber-200 border border-amber-300/40">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>Tạp Chí Cưới</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
            <button
              type="button"
              onClick={onLike}
              className="p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-rose-600 border border-white/20 transition-all transform active:scale-90 cursor-pointer shadow-md"
              title="Thả tim bức ảnh này"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-400 group-hover:text-white" />
            </button>
            <div className="p-2 rounded-full bg-black/70 backdrop-blur-md text-amber-200 border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity shadow-md">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Minimalist Editorial Headline Caption */}
        <div className="pt-2 px-1 flex items-center justify-between">
          <div className="pr-2 min-w-0 flex-1">
            <h3 className="font-heading font-bold text-amber-950 text-sm sm:text-base truncate uppercase tracking-wide">
              {photo.title}
            </h3>
            <p className="text-stone-600 text-xs font-serif italic line-clamp-1 mt-0.5">
              {photo.caption}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg bg-amber-100/80 border border-amber-300 text-rose-600 font-bold text-xs shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STYLE 4: TRANH KHẢM SƠN MÀI & HOA SEN VÀNG (Heritage Gold Leaf & Lacquer)
  // -------------------------------------------------------------
  if (styleType === 'heritage-gold-leaf') {
    return (
      <div
        id={`gallery-card-heritage-${photo.id}`}
        onClick={onOpen}
        className="group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#2E0B0F] via-[#200609] to-[#140305] p-3.5 sm:p-4 border-4 border-amber-400/90 shadow-[0_20px_50px_rgba(180,83,9,0.35)] ring-2 ring-amber-300/40 transition-all duration-500 hover:-translate-y-2.5 cursor-pointer flex flex-col justify-between h-full overflow-hidden"
      >
        {/* 4 Ornate Golden Lotus Corners with Pulse Rotation */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none z-30 transition-transform duration-500 group-hover:scale-115 group-hover:-rotate-12">
          <GoldenLotusIcon size={20} showAura />
        </div>
        <div className="absolute top-2.5 right-2.5 pointer-events-none z-30 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-12">
          <GoldenLotusIcon size={20} showAura />
        </div>

        {/* Style Badge Center */}
        <div className="text-center pt-1 pb-2">
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-[10px] sm:text-xs font-bold text-amber-200 tracking-wider uppercase shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
            <span>Sơn Mài Hoàng Triều</span>
          </span>
        </div>

        {/* Inner Ruby Velvet Frame */}
        <div className="relative w-full h-[360px] sm:h-[400px] rounded-xl overflow-hidden bg-[#240609] border-2 border-amber-300/80 shadow-[inset_0_4px_30px_rgba(0,0,0,0.6)] flex items-center justify-center">
          {fitMode === 'contain' && photo.imageUrl && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={photo.imageUrl}
                alt=""
                aria-hidden="true"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className={`w-full h-full object-cover blur-2xl scale-125 opacity-70 transition-all duration-700 ${filterClass}`}
              />
              <div className="absolute inset-0 bg-[#200406]/30 backdrop-blur-xs" />
            </div>
          )}

          <div className="relative z-10 w-full h-full overflow-hidden">
            <OptimizedImage
              src={photo.imageUrl}
              fallbackSrc={photo.fallbackUrl || photo.thumbnailUrl}
              alt={photo.title}
              placeholderTitle={photo.title}
              objectFit={fitMode}
              containerClassName="w-full h-full"
              className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${filterClass}`}
            />
          </div>

          {/* 45-Degree Golden Glitter Shimmer Beam Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-300/30 to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
            <button
              type="button"
              onClick={onLike}
              className="p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-rose-600 border border-white/20 transition-all transform active:scale-90 cursor-pointer shadow-md"
              title="Thả tim bức ảnh này"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-400 group-hover:text-white" />
            </button>
            <div className="p-2 rounded-full bg-black/70 backdrop-blur-md text-amber-200 border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity shadow-md">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Royal Bronze Engraved Plaque */}
        <div className="mt-3.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#4A161B] via-[#350E13] to-[#4A161B] border border-amber-400/80 flex items-center justify-between shadow-md">
          <div className="pr-2 min-w-0 flex-1">
            <h3 className="font-heading font-bold text-amber-200 text-sm sm:text-base truncate drop-shadow-sm">
              {photo.title}
            </h3>
            <p className="text-amber-100/80 text-xs font-serif italic line-clamp-1 mt-0.5">
              {photo.caption}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg bg-stone-950/80 border border-amber-400/60 text-rose-400 font-bold text-xs shadow-inner">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STYLE 5: KHUNG BẦU DỤC TÂN CỔ ĐIỂN (Neoclassic Cameo Medallion)
  // -------------------------------------------------------------
  return (
    <div
      id={`gallery-card-cameo-${photo.id}`}
      onClick={onOpen}
      className="group relative rounded-[42px] sm:rounded-[52px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E6] to-[#F2E5CD] p-3.5 sm:p-4.5 border-3 border-amber-400/85 shadow-[0_16px_45px_rgba(217,119,6,0.18)] hover:shadow-[0_28px_65px_rgba(217,119,6,0.35)] ring-1 ring-amber-300/50 transition-all duration-500 hover:-translate-y-2.5 cursor-pointer flex flex-col justify-between h-full overflow-hidden"
    >
      {/* Radiant Rose-Gold Aura Halo Behind Card on Hover */}
      <div className="absolute inset-0 bg-radial from-amber-400/25 via-rose-300/15 to-transparent rounded-[42px] sm:rounded-[52px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

      {/* Top Cameo Gem Badge */}
      <div className="flex items-center justify-between pb-2 px-3">
        <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/90 border border-amber-300 text-[10px] sm:text-xs font-bold text-amber-900 shadow-2xs">
          <Gem className="w-3 h-3 text-amber-600" />
          <span>Cameo Tân Cổ Điển</span>
        </span>
        <span className="text-[11px] font-serif italic text-amber-800">
          Chung Đôi Son Sắt
        </span>
      </div>

      {/* Inner Cameo Pill Shape Frame with Beaded Border */}
      <div className="relative w-full h-[370px] sm:h-[410px] rounded-[32px] sm:rounded-[42px] overflow-hidden bg-gradient-to-b from-[#241A12] via-[#2F2318] to-[#1E150E] border-2 border-amber-400/80 shadow-[inset_0_4px_25px_rgba(0,0,0,0.5)] flex items-center justify-center">
        {fitMode === 'contain' && photo.imageUrl && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={photo.imageUrl}
              alt=""
              aria-hidden="true"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className={`w-full h-full object-cover blur-2xl scale-125 opacity-70 transition-all duration-700 ${filterClass}`}
            />
            <div className="absolute inset-0 bg-amber-950/20 backdrop-blur-xs" />
          </div>
        )}

        <div className="relative z-10 w-full h-full overflow-hidden">
          <OptimizedImage
            src={photo.imageUrl}
            fallbackSrc={photo.fallbackUrl || photo.thumbnailUrl}
            alt={photo.title}
            placeholderTitle={photo.title}
            objectFit={fitMode}
            containerClassName="w-full h-full"
            className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-106 ${filterClass}`}
          />
        </div>

        {/* Radial Shimmer Bloom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />

        {/* Action Buttons */}
        <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-1.5">
          <button
            type="button"
            onClick={onLike}
            className="p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-rose-600 border border-white/20 transition-all transform active:scale-90 cursor-pointer shadow-md"
            title="Thả tim bức ảnh này"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-rose-400 group-hover:text-white" />
          </button>
          <div className="p-2 rounded-full bg-black/70 backdrop-blur-md text-amber-200 border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity shadow-md">
            <ZoomIn className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Cameo Bottom Plaque */}
      <div className="mt-3.5 px-4 py-2.5 rounded-2xl bg-white/95 border border-amber-300 flex items-center justify-between shadow-xs">
        <div className="pr-2 min-w-0 flex-1">
          <h3 className="font-heading font-bold text-amber-950 text-sm sm:text-base truncate">
            {photo.title}
          </h3>
          <p className="text-stone-600 text-xs font-serif italic line-clamp-1 mt-0.5">
            {photo.caption}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-rose-600 font-bold text-xs shadow-2xs">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};
