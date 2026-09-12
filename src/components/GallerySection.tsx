import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_PHOTOS, WEDDING_CONFIG } from '../data/weddingData';
import {
  Heart,
  ZoomIn,
  ZoomOut,
  RotateCw,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  LayoutGrid,
  Columns,
  Image as ImageIcon,
  Play,
  Pause,
  SlidersHorizontal,
  Frame,
  Film,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScrollReveal } from './ScrollReveal';
import { GoldenLotusIcon, WavingVietnameseFlag } from './PatrioticEmblem';
import { OptimizedImage } from './OptimizedImage';
import { DiversePhotoCard } from './DiversePhotoCard';

type GalleryLayout = 'gallery-frames' | 'masonry' | 'cinematic-slideshow';
type FitMode = 'contain' | 'cover';
type ColorFilter = 'original' | 'warm-sun' | 'romantic-rose' | 'vintage-film' | 'classic-bw';

const FILTER_STYLES: Record<ColorFilter, string> = {
  original: '',
  'warm-sun': 'sepia-[0.22] saturate-[1.25] contrast-[1.05] brightness-[1.02]',
  'romantic-rose': 'hue-rotate-[-10deg] saturate-[1.18] brightness-[1.04]',
  'vintage-film': 'sepia-[0.38] contrast-[0.96] brightness-[0.98]',
  'classic-bw': 'grayscale contrast-[1.12]',
};

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<GalleryLayout>('gallery-frames');
  const [fitMode, setFitMode] = useState<FitMode>('cover');
  const [activeFilter, setActiveFilter] = useState<ColorFilter>('original');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, number>>({});
  
  // Slideshow state for Cinematic Mode
  const [slideshowIndex, setSlideshowIndex] = useState<number>(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState<boolean>(true);
  const [slideshowIntervalSec, setSlideshowIntervalSec] = useState<number>(4);
  const [slideshowProgress, setSlideshowProgress] = useState<number>(0);

  // Lightbox Zoom & Rotate state
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [lightboxRotation, setLightboxRotation] = useState<number>(0);
  const [isLightboxPlaying, setIsLightboxPlaying] = useState<boolean>(false);

  // Initial visible photo count (5-6 photos, with load more / expand option)
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  // Sliced photos for gallery display
  const displayedPhotos = filteredPhotos.slice(0, visibleCount);
  const hasMorePhotos = filteredPhotos.length > visibleCount;
  const remainingCount = Math.max(0, filteredPhotos.length - visibleCount);

  // Safeguard index bounds
  const currentPhotoIndex = lightboxIndex !== null ? lightboxIndex % filteredPhotos.length : 0;
  const safeSlideshowIndex = slideshowIndex % (filteredPhotos.length || 1);

  // Like with Confetti Burst
  const handleLikePhoto = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));

    // Trigger sweet heart confetti explosion
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 28,
      spread: 60,
      origin: { x, y },
      colors: ['#D97706', '#DC2626', '#F59E0B', '#F43F5E', '#FFFDF0'],
      ticks: 160,
      gravity: 0.9,
      scalar: 0.9,
    });
  };

  // Open & Close Lightbox
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxZoom(1);
    setLightboxRotation(0);
    setIsLightboxPlaying(false);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setLightboxZoom(1);
    setLightboxRotation(0);
    setIsLightboxPlaying(false);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
      setLightboxZoom(1);
      setLightboxRotation(0);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
      setLightboxZoom(1);
      setLightboxRotation(0);
    }
  };

  // Lightbox Zoom & Rotate Handlers
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxZoom((prev) => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxZoom((prev) => Math.max(prev - 0.3, 0.7));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxZoom(1);
    setLightboxRotation(0);
  };

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxRotation((prev) => (prev + 90) % 360);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === '+' || e.key === '=') setLightboxZoom((z) => Math.min(z + 0.25, 2.5));
      if (e.key === '-') setLightboxZoom((z) => Math.max(z - 0.25, 0.7));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  // Slideshow Timer for Cinematic Section
  useEffect(() => {
    if (layoutMode !== 'cinematic-slideshow' || !isSlideshowPlaying || filteredPhotos.length <= 1) {
      return;
    }

    const intervalMs = 50;
    const totalSteps = (slideshowIntervalSec * 1000) / intervalMs;
    const progressPerStep = 100 / totalSteps;

    const timer = setInterval(() => {
      setSlideshowProgress((prev) => {
        if (prev >= 100) {
          setSlideshowIndex((idx) => (idx + 1) % filteredPhotos.length);
          return 0;
        }
        return prev + progressPerStep;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [layoutMode, isSlideshowPlaying, slideshowIntervalSec, filteredPhotos.length]);

  // Lightbox Auto-play Slideshow
  useEffect(() => {
    if (lightboxIndex === null || !isLightboxPlaying || filteredPhotos.length <= 1) return;

    const timer = setInterval(() => {
      setLightboxIndex((idx) => (idx !== null ? (idx + 1) % filteredPhotos.length : 0));
    }, 4000);

    return () => clearInterval(timer);
  }, [lightboxIndex, isLightboxPlaying, filteredPhotos.length]);

  // Masonry Aspect Ratios that maintain clean framing
  const getMasonryAspectClass = (index: number) => {
    const pattern = index % 4;
    switch (pattern) {
      case 0:
        return 'h-[360px] sm:h-[430px]'; // Tall portrait
      case 1:
        return 'h-[320px] sm:h-[370px]'; // Medium
      case 2:
        return 'h-[380px] sm:h-[460px]'; // Extra tall portrait
      case 3:
        return 'h-[340px] sm:h-[400px]'; // Balanced
      default:
        return 'h-[360px] sm:h-[420px]';
    }
  };

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 relative bg-[#FDFBF7] overflow-hidden select-none"
    >
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#D97706_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Section Header */}
        <ScrollReveal direction="fly-down" duration={0.6} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-amber-50 text-red-900 border border-amber-300 shadow-2xs mb-3">
            <WavingVietnameseFlag width={22} height={14} showPole={false} />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold font-heading">
              Khoảnh Khắc Tình Yêu & Kỷ Niệm
            </span>
            <GoldenLotusIcon size={16} className="animate-lotus-glow" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-amber-950 tracking-tight mb-3">
            Album Ảnh Kỷ Niệm
          </h2>
          <div className="flex items-center justify-center gap-2 mx-auto mb-4">
            <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            <GoldenLotusIcon size={20} className="text-amber-500 animate-spin-slow" />
            <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed px-2 font-serif-cormorant italic">
            Mỗi khung hình là một câu chuyện tình yêu ngọt ngào, được canh chỉnh trọn vẹn trong khung nghệ thuật để bạn chiêm ngưỡng trọn vẹn từng khoảnh khắc son sắt của Minh Cảnh & Thanh Nhi.
          </p>
        </ScrollReveal>

        {/* 2. Enhanced Control Bar: Category Filters, Frame Fit Toggle, Color Effects, & Layouts */}
        <div className="space-y-3 mb-8 sm:mb-10">
          {/* Top Bar: Categories & Layout Modes */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-amber-200/80 shadow-[0_4px_25px_rgba(180,83,9,0.06)]">
            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap w-full lg:w-auto">
              {[
                { key: 'all', label: `Tất Cả (${GALLERY_PHOTOS.length})` },
                { key: 'prewedding', label: 'Lễ Phục & Kỷ Niệm' },
                { key: 'studio', label: 'Vest Cưới & Váy Cưới' },
                { key: 'moments', label: 'Nhẫn Cưới & Nắm Tay' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  id={`gallery-filter-${cat.key}`}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    setSlideshowIndex(0);
                    setSlideshowProgress(0);
                    setVisibleCount(6);
                  }}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.key
                      ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white font-semibold shadow-md shadow-amber-900/15 scale-102'
                      : 'bg-stone-100 text-stone-700 hover:bg-amber-100/70 hover:text-amber-900 border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex items-center gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200 shrink-0 max-w-full overflow-x-auto">
              <button
                id="btn-layout-frames"
                type="button"
                onClick={() => setLayoutMode('gallery-frames')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  layoutMode === 'gallery-frames'
                    ? 'bg-white text-amber-950 shadow-xs border border-amber-200/60'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Khung Triển Lãm Hoàng Gia (Ảnh nằm trọn trong khung)"
              >
                <Frame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Khung Tranh</span>
              </button>
              <button
                id="btn-layout-slideshow"
                type="button"
                onClick={() => setLayoutMode('cinematic-slideshow')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  layoutMode === 'cinematic-slideshow'
                    ? 'bg-white text-amber-950 shadow-xs border border-amber-200/60'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Trình chiếu Slideshow rạp phim tự động"
              >
                <Film className="w-3.5 h-3.5 text-red-600 animate-pulse shrink-0" />
                <span>Slideshow</span>
              </button>
              <button
                id="btn-layout-masonry"
                type="button"
                onClick={() => setLayoutMode('masonry')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  layoutMode === 'masonry'
                    ? 'bg-white text-amber-950 shadow-xs border border-amber-200/60'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Bố cục so le Pinterest nghệ thuật"
              >
                <Columns className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>So Le</span>
              </button>
            </div>
          </div>

          {/* Sub-Bar: Frame Fit Tuning (Canh chỉnh hình trong khung) & Color Effects Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-amber-50/70 border border-amber-200/80 px-3 sm:px-3.5 py-2.5 rounded-2xl">
            {/* Canh Chỉnh Khung: Fit vs Cover Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1 whitespace-nowrap">
                <Frame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Khung ảnh:</span>
              </span>
              <div className="inline-flex rounded-lg bg-white/90 p-0.5 border border-amber-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setFitMode('cover')}
                  className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    fitMode === 'cover'
                      ? 'bg-amber-600 text-white font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-amber-900'
                  }`}
                  title="Lấp đầy toàn bộ khung ảnh - Tuyệt đối không có viền đen thừa"
                >
                  <span className="hidden sm:inline">📐 Lấp đầy (Không viền đen)</span>
                  <span className="sm:hidden">📐 Không viền đen</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFitMode('contain')}
                  className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    fitMode === 'contain'
                      ? 'bg-amber-600 text-white font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-amber-900'
                  }`}
                  title="Xem toàn ảnh với nền hòa sắc tự nhiên cùng ảnh"
                >
                  <span className="hidden sm:inline">🖼️ Toàn cảnh (Hòa sắc)</span>
                  <span className="sm:hidden">🖼️ Hòa sắc</span>
                </button>
              </div>
            </div>

            {/* Hiệu ứng Màu Sắc Nghệ Thuật (Color Filters) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1 mr-1 whitespace-nowrap">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Hiệu ứng:</span>
              </span>
              {[
                { key: 'original' as ColorFilter, label: 'Chuẩn Gốc', dot: 'bg-amber-400' },
                { key: 'warm-sun' as ColorFilter, label: 'Nắng Ấm', dot: 'bg-amber-500' },
                { key: 'romantic-rose' as ColorFilter, label: 'Hồng Lãng Mạn', dot: 'bg-rose-400' },
                { key: 'vintage-film' as ColorFilter, label: 'Cổ Điển', dot: 'bg-amber-700' },
                { key: 'classic-bw' as ColorFilter, label: 'Trắng Đen', dot: 'bg-stone-800' },
              ].map((filt) => (
                <button
                  key={filt.key}
                  type="button"
                  onClick={() => setActiveFilter(filt.key)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                    activeFilter === filt.key
                      ? 'bg-amber-950 text-amber-100 font-bold shadow-xs'
                      : 'bg-white/80 text-stone-600 hover:text-amber-900 hover:bg-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${filt.dot} shrink-0`} />
                  <span>{filt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. GALLERY LAYOUTS */}

        {/* ========================================================= */}
        {/* LAYOUT 1: BỘ SƯU TẬP ĐA PHONG CÁCH VÀ HIỆU ỨNG NGHỆ THUẬT */}
        {/* ========================================================= */}
        {layoutMode === 'gallery-frames' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {displayedPhotos.map((photo, index) => {
              const originalIndex = filteredPhotos.findIndex((p) => p.id === photo.id);
              const likes = (likedPhotos[photo.id] || 0) + (24 + (index * 7) % 43);
              return (
                <ScrollReveal
                  key={photo.id}
                  direction="fly-up"
                  delay={Math.min((index % 3) * 0.08, 0.22)}
                  duration={0.6}
                  className="h-full"
                >
                  <DiversePhotoCard
                    photo={photo}
                    index={index}
                    likes={likes}
                    onLike={(e) => handleLikePhoto(e, photo.id)}
                    onOpen={() => openLightbox(originalIndex !== -1 ? originalIndex : index)}
                    fitMode={fitMode}
                    activeFilter={activeFilter}
                  />
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* LAYOUT 2: RẠP PHIM SLIDESHOW TỰ ĐỘNG (Cinematic Showcase) */}
        {/* ========================================================= */}
        {layoutMode === 'cinematic-slideshow' && filteredPhotos.length > 0 && (
          <div className="space-y-6">
            {/* Grand Centerpiece Cinematic Frame */}
            <div className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300 p-3 sm:p-6 shadow-2xl border-2 border-amber-300">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 pointer-events-none opacity-80">
                <GoldenLotusIcon size={26} />
              </div>
              <div className="absolute top-3 right-3 pointer-events-none opacity-80">
                <GoldenLotusIcon size={26} />
              </div>

              {/* Master Display Box */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 border-2 border-amber-200/80 shadow-2xl h-[380px] sm:h-[500px] md:h-[580px] flex items-center justify-center">
                {/* Ambient Blurred Backdrop */}
                {fitMode === 'contain' && filteredPhotos[safeSlideshowIndex]?.imageUrl && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={filteredPhotos[safeSlideshowIndex].imageUrl}
                      alt=""
                      aria-hidden="true"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className={`w-full h-full object-cover blur-3xl scale-125 opacity-70 transition-all duration-1000 ${FILTER_STYLES[activeFilter]}`}
                    />
                    <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-xs" />
                  </div>
                )}

                {/* Primary Photo In Frame */}
                <div
                  className="relative z-10 w-full h-full cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(safeSlideshowIndex)}
                >
                  <OptimizedImage
                    key={filteredPhotos[safeSlideshowIndex].id}
                    src={filteredPhotos[safeSlideshowIndex].imageUrl}
                    fallbackSrc={filteredPhotos[safeSlideshowIndex].fallbackUrl || filteredPhotos[safeSlideshowIndex].thumbnailUrl}
                    alt={filteredPhotos[safeSlideshowIndex].title}
                    placeholderTitle={filteredPhotos[safeSlideshowIndex].title}
                    objectFit={fitMode}
                    priority={true}
                    containerClassName="w-full h-full"
                    className={`w-full h-full transition-all duration-700 ease-out hover:scale-102 ${FILTER_STYLES[activeFilter]}`}
                  />
                </div>

                {/* Shimmer Light Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                {/* Top Info Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-amber-200 border border-amber-300/40 text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Film className="w-3.5 h-3.5 text-red-400" />
                    <span>Ảnh {safeSlideshowIndex + 1} / {filteredPhotos.length}</span>
                  </span>
                  <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-stone-200 border border-white/20 text-xs">
                    {filteredPhotos[safeSlideshowIndex].category === 'prewedding' ? 'Pre-Wedding' : 'Studio Sang Trọng'}
                  </span>
                </div>

                {/* Previous & Next Floating Buttons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideshowIndex((idx) => (idx - 1 + filteredPhotos.length) % filteredPhotos.length);
                    setSlideshowProgress(0);
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-black/65 backdrop-blur-md text-white hover:bg-amber-600 hover:text-white border border-white/20 transition-all z-20 active:scale-95 shadow-lg cursor-pointer"
                  title="Ảnh trước"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideshowIndex((idx) => (idx + 1) % filteredPhotos.length);
                    setSlideshowProgress(0);
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-black/65 backdrop-blur-md text-white hover:bg-amber-600 hover:text-white border border-white/20 transition-all z-20 active:scale-95 shadow-lg cursor-pointer"
                  title="Ảnh sau"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Bottom Caption & Controls Bar Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-white font-heading font-bold text-lg sm:text-2xl drop-shadow-md text-amber-200">
                      {filteredPhotos[safeSlideshowIndex].title}
                    </h3>
                    <p className="text-stone-200 text-xs sm:text-sm font-serif italic mt-0.5 max-w-xl">
                      {filteredPhotos[safeSlideshowIndex].caption}
                    </p>
                  </div>

                  {/* Play/Pause & Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
                        isSlideshowPlaying
                          ? 'bg-amber-600 text-white hover:bg-amber-700'
                          : 'bg-white text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {isSlideshowPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Tạm dừng</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Tự động phát</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleLikePhoto(e, filteredPhotos[safeSlideshowIndex].id)}
                      className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-rose-600 border border-white/20 transition-all active:scale-90 cursor-pointer shadow-md"
                      title="Thả tim ảnh này"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openLightbox(safeSlideshowIndex)}
                      className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 transition-all cursor-pointer shadow-md"
                      title="Phóng to toàn màn hình"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Animated Slideshow Progress Bar */}
                {isSlideshowPlaying && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-30 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-red-500 transition-all duration-75 ease-linear"
                      style={{ width: `${slideshowProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Clickable Filmstrip Thumbnails Strip */}
            <div className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-amber-200/80 shadow-md">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dải phim cuộn: Chọn ảnh để xem ngay</span>
                </span>
                <span className="text-[11px] text-stone-500">
                  {filteredPhotos.length} bức ảnh
                </span>
              </div>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                {filteredPhotos.map((photo, idx) => {
                  const isActive = idx === safeSlideshowIndex;
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => {
                        setSlideshowIndex(idx);
                        setSlideshowProgress(0);
                      }}
                      className={`relative shrink-0 w-16 sm:w-20 h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-stone-900 ${
                        isActive
                          ? 'border-amber-500 ring-2 ring-amber-400 scale-105 shadow-md'
                          : 'border-stone-300 opacity-70 hover:opacity-100 hover:border-amber-300'
                      }`}
                    >
                      <OptimizedImage
                        src={photo.imageUrl}
                        fallbackSrc={photo.fallbackUrl || photo.thumbnailUrl}
                        alt={photo.title}
                        objectFit="cover"
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-amber-500/20 pointer-events-none" />
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center py-0.5 truncate px-1">
                        #{idx + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* LAYOUT 3: SO LE PINTEREST (Masonry Grid with Framing)      */}
        {/* ========================================================= */}
        {layoutMode === 'masonry' && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 space-y-5 sm:space-y-6">
            {displayedPhotos.map((photo, index) => {
              const originalIndex = filteredPhotos.findIndex((p) => p.id === photo.id);
              const likes = (likedPhotos[photo.id] || 0) + (18 + (index * 7) % 43);
              const aspectClass = getMasonryAspectClass(index);
              return (
                <ScrollReveal
                  key={photo.id}
                  direction="fly-up"
                  delay={Math.min((index % 3) * 0.08, 0.22)}
                  duration={0.6}
                  className="break-inside-avoid"
                >
                  <div
                    id={`gallery-masonry-item-${photo.id}`}
                    onClick={() => openLightbox(originalIndex !== -1 ? originalIndex : index)}
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-950 shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_22px_50px_rgba(180,83,9,0.3)] border-2 border-amber-300/90 ring-1 ring-amber-400/30 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
                  >
                    <div className={`relative w-full ${aspectClass} overflow-hidden flex items-center justify-center`}>
                      {/* Ambient Blurred Background in contain mode */}
                      {fitMode === 'contain' && photo.imageUrl && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            src={photo.imageUrl}
                            alt=""
                            aria-hidden="true"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            className={`w-full h-full object-cover blur-2xl scale-125 opacity-70 transition-all duration-700 ${FILTER_STYLES[activeFilter]}`}
                          />
                          <div className="absolute inset-0 bg-stone-900/15 backdrop-blur-xs" />
                        </div>
                      )}

                      {/* Actual Photo */}
                      <div className="relative z-10 w-full h-full overflow-hidden">
                        <OptimizedImage
                          src={photo.imageUrl}
                          fallbackSrc={photo.fallbackUrl || photo.thumbnailUrl}
                          alt={photo.title}
                          placeholderTitle={photo.title}
                          objectFit={fitMode}
                          containerClassName="w-full h-full"
                          className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-104 ${FILTER_STYLES[activeFilter]}`}
                        />
                      </div>

                      {/* Shimmer Light Sweep */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                      {/* Gradient Overlay for Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-300 z-20 pointer-events-none" />

                      {/* Category Tag (Top-left) */}
                      <div className="absolute top-3 left-3 z-30">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-amber-200 border border-amber-300/30">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                          {photo.category === 'prewedding' ? 'Pre-Wedding' : photo.category === 'studio' ? 'Studio' : 'Kỷ Niệm'}
                        </span>
                      </div>

                      {/* Heart Like & Zoom Actions (Top-right) */}
                      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => handleLikePhoto(e, photo.id)}
                          className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-rose-600 hover:text-white border border-white/20 transition-all transform active:scale-90 cursor-pointer shadow-md"
                          title="Thả tim bức ảnh"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current text-rose-400 group-hover:text-white" />
                        </button>
                        <div className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                          <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                        </div>
                      </div>

                      {/* Bottom Caption Info */}
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-30 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-heading text-base sm:text-lg font-bold text-white tracking-wide mb-1 drop-shadow-md flex items-center justify-between">
                          <span>{photo.title}</span>
                          <span className="text-[11px] font-sans font-normal text-amber-200/90 flex items-center gap-1">
                            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                            {likes}
                          </span>
                        </p>
                        <p className="text-stone-300 text-xs sm:text-sm line-clamp-2 font-serif italic text-amber-100/80 drop-shadow-xs">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* NÚT XEM TIẾP TOÀN BỘ ALBUM / THU GỌN 6 ẢNH ĐẦU              */}
        {/* ========================================================= */}
        {layoutMode !== 'cinematic-slideshow' && filteredPhotos.length > 6 && (
          <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3.5">
            {/* Status Counter Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/85 border border-amber-300 text-amber-950 text-xs sm:text-sm font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>
                Đang hiển thị <span className="text-red-600 font-bold">{Math.min(visibleCount, filteredPhotos.length)}</span> / {filteredPhotos.length} bức ảnh cưới
              </span>
            </div>

            {/* Main Action Button */}
            {hasMorePhotos ? (
              <button
                id="btn-expand-gallery"
                type="button"
                onClick={() => setVisibleCount(filteredPhotos.length)}
                className="group relative inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 hover:from-amber-700 hover:via-yellow-600 hover:to-amber-800 text-white font-bold text-sm sm:text-base shadow-[0_10px_35px_rgba(217,119,6,0.35)] hover:shadow-[0_16px_45px_rgba(217,119,6,0.5)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer border border-yellow-200/60"
              >
                <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Xem tiếp toàn bộ album ({remainingCount} ảnh còn lại)</span>
                <ChevronDown className="w-5 h-5 text-yellow-100 group-hover:translate-y-1 transition-transform" />
              </button>
            ) : (
              <button
                id="btn-collapse-gallery"
                type="button"
                onClick={() => {
                  setVisibleCount(6);
                  const galleryEl = document.getElementById('wedding-gallery');
                  if (galleryEl) {
                    galleryEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 hover:text-amber-900 font-semibold text-xs sm:text-sm border border-stone-300 hover:border-amber-400 shadow-sm transition-all cursor-pointer"
              >
                <span>Thu gọn bớt ảnh (Hiển thị 6 ảnh)</span>
                <ChevronUp className="w-4 h-4 text-stone-500 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        )}

        {/* 4. Google Drive High-Resolution Original 4K Album Link */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-300/80 shadow-[0_8px_30px_rgba(180,83,9,0.08)]">
            <div className="flex items-center gap-3 text-amber-950 font-medium text-xs sm:text-sm">
              <ImageIcon className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Xem trọn bộ album ảnh cưới chất lượng gốc siêu nét (Full HD / 4K):</span>
            </div>
            <a
              id="btn-view-drive-gallery"
              href={WEDDING_CONFIG.googleDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-98"
            >
              <span>Mở Google Drive Album</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 5. LUXURY CINEMA FULLSCREEN LIGHTBOX WITH COMPLETE FRAMING & CONTROLS */}
      {lightboxIndex !== null && filteredPhotos[currentPhotoIndex] && (
        <div
          id="wedding-gallery-lightbox"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-2 sm:p-5 transition-all duration-300 select-none overflow-hidden"
          onClick={closeLightbox}
        >
          {/* Top Bar Controls */}
          <div
            className="w-full max-w-6xl flex items-center justify-between z-30 py-2 px-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title & Index */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="flex items-baseline gap-2 truncate">
                <span className="font-heading font-bold text-sm sm:text-base text-amber-200 truncate">
                  {filteredPhotos[currentPhotoIndex].title}
                </span>
                <span className="text-xs text-stone-400 shrink-0">
                  ({currentPhotoIndex + 1}/{filteredPhotos.length})
                </span>
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Play/Pause Slideshow in Lightbox - Desktop & Tablet */}
              <button
                type="button"
                onClick={() => setIsLightboxPlaying(!isLightboxPlaying)}
                className={`hidden md:flex p-1.5 sm:p-2 rounded-xl text-xs font-semibold items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  isLightboxPlaying ? 'bg-amber-600 text-white' : 'bg-white/10 hover:bg-white/20 text-stone-200'
                }`}
                title={isLightboxPlaying ? 'Tạm dừng chiếu ảnh' : 'Tự động chiếu ảnh (4s)'}
              >
                {isLightboxPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isLightboxPlaying ? 'Dừng' : 'Chiếu'}</span>
              </button>

              {/* Zoom Out */}
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={lightboxZoom <= 0.8}
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-stone-200 transition-all cursor-pointer shrink-0"
                title="Thu nhỏ (-)"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Reset Zoom */}
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-1.5 sm:px-2 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] sm:text-xs text-amber-300 font-mono transition-all cursor-pointer shrink-0"
                title="Đặt lại kích thước chuẩn"
              >
                {Math.round(lightboxZoom * 100)}%
              </button>

              {/* Zoom In */}
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={lightboxZoom >= 2.4}
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-stone-200 transition-all cursor-pointer shrink-0"
                title="Phóng to (+)"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Rotate - hide on mobile, show on sm+ */}
              <button
                type="button"
                onClick={handleRotate}
                className="hidden sm:flex p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 transition-all cursor-pointer shrink-0"
                title="Xoay ảnh 90°"
              >
                <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Heart Like */}
              <button
                type="button"
                onClick={(e) => handleLikePhoto(e, filteredPhotos[currentPhotoIndex].id)}
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-all cursor-pointer shrink-0"
                title="Thả tim"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              </button>

              {/* Close (Esc) */}
              <button
                type="button"
                onClick={closeLightbox}
                className="p-1.5 sm:p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-all cursor-pointer ml-0.5 sm:ml-1 shrink-0"
                title="Đóng (Esc)"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevPhoto}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/65 backdrop-blur-md text-white hover:bg-amber-600 border border-white/20 transition-all z-40 transform active:scale-90 cursor-pointer shadow-xl"
            title="Ảnh trước (Mũi tên trái)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextPhoto}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/65 backdrop-blur-md text-white hover:bg-amber-600 border border-white/20 transition-all z-40 transform active:scale-90 cursor-pointer shadow-xl"
            title="Ảnh sau (Mũi tên phải)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Main Photo Frame - Canh chỉnh nằm trọn trong khung để xem hình */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center p-2 sm:p-4 z-20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[72vh] sm:max-h-[76vh] max-w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-300/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-stone-900/90 flex items-center justify-center">
              {/* Warm Dynamic Ambient Blur behind photo */}
              {filteredPhotos[currentPhotoIndex]?.imageUrl && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    src={filteredPhotos[currentPhotoIndex].imageUrl}
                    alt=""
                    aria-hidden="true"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="w-full h-full object-cover blur-2xl scale-125 opacity-40"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
                </div>
              )}
              <img
                src={filteredPhotos[currentPhotoIndex].imageUrl}
                alt={filteredPhotos[currentPhotoIndex].title}
                onError={(e) => {
                  const fallback = filteredPhotos[currentPhotoIndex]?.fallbackUrl || filteredPhotos[currentPhotoIndex]?.thumbnailUrl;
                  if (fallback && e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
                style={{
                  transform: `scale(${lightboxZoom}) rotate(${lightboxRotation}deg)`,
                  transition: 'transform 0.3s ease-out',
                }}
                className={`relative z-10 max-h-[70vh] sm:max-h-[74vh] max-w-full w-auto object-contain mx-auto select-none rounded-xl ${FILTER_STYLES[activeFilter]}`}
              />
            </div>
          </div>

          {/* Bottom Bar: Caption & Thumbnails Strip */}
          <div
            className="w-full max-w-5xl z-30 flex flex-col items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Caption Text */}
            <div className="text-center px-4">
              <p className="text-stone-300 text-xs sm:text-sm font-serif italic text-amber-100/90">
                "{filteredPhotos[currentPhotoIndex].caption}"
              </p>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full px-2 py-1 scrollbar-thin">
              {filteredPhotos.map((photo, idx) => {
                const isActive = idx === currentPhotoIndex;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxZoom(1);
                      setLightboxRotation(0);
                    }}
                    className={`relative shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-stone-900 ${
                      isActive
                        ? 'border-amber-400 ring-2 ring-amber-400 scale-105 shadow-md'
                        : 'border-white/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
