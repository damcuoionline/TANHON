import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS, WEDDING_CONFIG } from '../data/weddingData';
import { Heart, Sparkles, ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon, Award, Eye } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GoldenLotusIcon, WavingVietnameseFlag, SectionCornerDecorations } from './PatrioticEmblem';
import { OptimizedImage } from './OptimizedImage';

export const LuxuryFramesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: 'all', label: 'Tất Cả Khung Ảnh', count: GALLERY_PHOTOS.length },
    { key: 'prewedding', label: 'Ảnh Cổng & Ngoại Cảnh', count: GALLERY_PHOTOS.filter(p => p.category === 'prewedding').length },
    { key: 'studio', label: 'Áo Dài & Studio Sang Trọng', count: GALLERY_PHOTOS.filter(p => p.category === 'studio').length },
    { key: 'moments', label: 'Khoảnh Khắc Tự Nhiên', count: GALLERY_PHOTOS.filter(p => p.category === 'moments').length },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  return (
    <section
      id="couple-story"
      className="py-16 sm:py-24 relative bg-gradient-to-b from-[#FEFCF7] via-[#FFFDF9] to-[#FEFDF9] border-b border-amber-200/70 overflow-hidden"
    >
      {/* Subtle Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-200/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 1. Section Header with Motion Blur Fly-Down */}
        <ScrollReveal direction="fly-down" duration={0.9} blurAmount={10} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-amber-50 text-red-900 border border-amber-300 shadow-2xs mb-3">
            <WavingVietnameseFlag width={22} height={14} showPole={false} />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold font-heading">
              Bộ Sưu Tập Khung Hình Cưới Truyền Thống & Sang Trọng
            </span>
            <GoldenLotusIcon size={16} className="animate-lotus-glow" />
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-amber-950 tracking-tight mb-3">
            Khung Ảnh Hạnh Phúc
          </h2>
          <div className="flex items-center justify-center gap-2 mx-auto mb-4">
            <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            <GoldenLotusIcon size={20} className="text-amber-500 animate-spin-slow" />
            <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed px-2 font-serif-cormorant italic text-base sm:text-lg">
            Mỗi khung hình là một tác phẩm nghệ thuật, lưu giữ nét đẹp thanh xuân, nụ cười rạng rỡ và tình yêu son sắt của Minh Cảnh & Thanh Nhi trong tà áo dài truyền thống Việt Nam.
          </p>
        </ScrollReveal>

        {/* 2. Grand Featured Centerpiece Masterpiece Frame with Zoom-Blur Motion */}
        <ScrollReveal direction="zoom-blur" duration={1} blurAmount={12} delay={0.1} className="mb-14 sm:mb-20">
          <div className="relative max-w-5xl mx-auto p-3 sm:p-6 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300 shadow-xl border border-amber-300/80">
            {/* Lotus Corner Badges */}
            <div className="absolute top-2 left-2 pointer-events-none opacity-80">
              <GoldenLotusIcon size={28} />
            </div>
            <div className="absolute top-2 right-2 pointer-events-none opacity-80">
              <GoldenLotusIcon size={28} />
            </div>

            {/* Inner Luxury Passe-Partout Matting Container */}
            <div className="p-3 sm:p-5 rounded-[22px] sm:rounded-[28px] bg-white border-2 border-amber-100 shadow-inner grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Grand Photo Slot */}
              <div
                onClick={() => openLightbox(0)}
                className="lg:col-span-7 relative h-72 sm:h-96 md:h-[460px] rounded-2xl overflow-hidden shadow-lg border border-amber-200/80 group cursor-pointer bg-stone-900"
              >
                <OptimizedImage
                  src={WEDDING_CONFIG.coupleCoverImage || GALLERY_PHOTOS[0].imageUrl}
                  alt="Khung Ảnh Cổng Hoàng Gia - Minh Cảnh & Thanh Nhi"
                  priority={true}
                  containerClassName="w-full h-full"
                  className="group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle Inner Gold Bevel Outline */}
                <div className="absolute inset-2 sm:inset-3 border border-amber-200/50 rounded-xl pointer-events-none" />

                {/* Hover Reveal Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2 text-yellow-300 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-xs uppercase font-bold tracking-wider">Khung Ảnh Chủ Đạo</span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                    Minh Cảnh & Thanh Nhi • Lễ Thành Hôn
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 font-serif-cormorant italic mt-1">
                    Nhấp để phóng to toàn màn hình chất lượng cao
                  </p>
                </div>

                {/* Top Badge with Flag & Lotus */}
                <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md text-amber-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-md border border-amber-300/40">
                  <WavingVietnameseFlag width={20} height={13} showPole={false} />
                  <span>Ảnh Bìa Chính Thức</span>
                  <GoldenLotusIcon size={14} />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-yellow-300" />
                </div>
              </div>

              {/* Grand Frame Side Details & Bride/Groom Royal Presentation */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4 px-2 sm:px-4">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-red-50 text-red-800 text-xs font-bold border border-red-200 shadow-2xs">
                  <GoldenLotusIcon size={14} />
                  <span>Trang Trọng Nhất</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-amber-950 leading-snug">
                  Ánh Mắt Nguyện Ước & Nụ Cười Hạnh Phúc
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-serif-cormorant italic leading-relaxed text-base">
                  Cảm ơn cuộc đời đã cho ta gặp nhau, cùng nhau dệt nên những khoảnh khắc đẹp nhất trên mảnh đất Việt Nam mến yêu.
                </p>

                {/* Bride & Groom Mini Profile Cards (Groom first) */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full mx-auto mb-1.5 overflow-hidden border-2 border-amber-300 shadow-xs">
                      <OptimizedImage
                        src={WEDDING_CONFIG.groom.avatar}
                        alt="Chú Rể Minh Cảnh"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider">Chú Rể</span>
                    <h4 className="font-heading text-xs sm:text-sm font-bold text-amber-950 truncate">
                      {WEDDING_CONFIG.groom.shortName}
                    </h4>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full mx-auto mb-1.5 overflow-hidden border-2 border-rose-300 shadow-xs">
                      <OptimizedImage
                        src={WEDDING_CONFIG.bride.avatar}
                        alt="Cô Dâu Thanh Nhi"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider">Cô Dâu</span>
                    <h4 className="font-heading text-xs sm:text-sm font-bold text-amber-950 truncate">
                      {WEDDING_CONFIG.bride.shortName}
                    </h4>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-xs text-amber-900 font-semibold flex-wrap gap-1">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <WavingVietnameseFlag width={16} height={11} showPole={false} />
                    <span>Lễ Thành Hôn: 04.10.2026</span>
                  </span>
                  <span className="text-red-800 whitespace-nowrap">Tư Gia Nhà Trai</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3. Filter Category Pills with Motion Blur */}
        <ScrollReveal direction="fly-up" delay={0.15} blurAmount={8} className="flex items-center justify-center gap-2 mb-8 sm:mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-stone-950 font-bold scale-105 border border-amber-300 shadow-xs'
                  : 'bg-white text-stone-700 border border-amber-200/80 hover:bg-amber-50 hover:border-amber-300'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="whitespace-nowrap">{cat.label}</span>
              <span className="ml-0.5 sm:ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-amber-950/10 text-amber-950 font-bold shrink-0">
                {cat.count}
              </span>
            </button>
          ))}
        </ScrollReveal>

        {/* 4. Luxury Photo Frames Masonry / Grid with Directional Fly-In */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => {
            const flyDir = index % 3 === 0 ? 'fly-left' : index % 3 === 1 ? 'fly-up' : 'fly-right';
            return (
              <ScrollReveal
                key={photo.id}
                direction={flyDir}
                delay={0.06 * (index % 3)}
                duration={0.85}
                blurAmount={10}
                className="flex"
              >
                {/* Luxury Picture Frame Structure with Passe-Partout & Gold Rim */}
                <div
                  onClick={() => openLightbox(index)}
                  className="group w-full rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-white border border-amber-200/90 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Subtle Top Gold & Crimson Frame Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 opacity-85" />

                  {/* Photo Matting Slot */}
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 border border-amber-100 shadow-inner">
                    <OptimizedImage
                      src={photo.imageUrl}
                      alt={photo.title}
                      containerClassName="w-full h-full"
                      className="group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    {/* Frame Inner Inset Border */}
                    <div className="absolute inset-2 border border-white/20 rounded-lg pointer-events-none" />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-1">
                          <GoldenLotusIcon size={14} />
                          <span>Khung Ảnh #{index + 1}</span>
                        </span>
                        <Eye className="w-4 h-4 text-yellow-300" />
                      </div>
                      <p className="text-xs text-stone-200 font-serif-cormorant italic">
                        {photo.caption}
                      </p>
                    </div>

                    {/* Corner Tag */}
                    <div className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-sm text-yellow-300 p-1.5 rounded-full shadow-xs">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Frame Caption Details */}
                  <div className="pt-3.5 pb-1 px-1 flex items-start justify-between">
                    <div>
                      <h4 className="font-heading text-sm sm:text-base font-bold text-amber-950 group-hover:text-amber-700 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-1 font-serif-cormorant italic mt-0.5">
                        {photo.caption}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 border border-amber-200">
                      {photo.category}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* 5. Fullscreen Luxury Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/20 cursor-pointer"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/20 cursor-pointer"
            title="Ảnh trước (Mũi tên trái)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Main Image in Framed Presentation */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center relative p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2 sm:p-3 rounded-2xl bg-white/10 border border-amber-300/40 shadow-2xl backdrop-blur-sm">
              <img
                src={filteredPhotos[lightboxIndex].imageUrl}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[66vh] sm:max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>
            {/* Caption & Navigation Indicators */}
            <div className="mt-3 text-center text-white max-w-xl px-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] sm:text-xs font-bold uppercase mb-1">
                <GoldenLotusIcon size={14} />
                <span>{filteredPhotos[lightboxIndex].category}</span>
              </div>
              <h3 className="font-heading text-base sm:text-xl font-bold text-yellow-300">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-serif-cormorant italic mt-0.5">
                {filteredPhotos[lightboxIndex].caption}
              </p>
              <span className="text-[10px] sm:text-[11px] text-amber-300/80 mt-1 block font-mono">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-2 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/20 cursor-pointer"
            title="Ảnh sau (Mũi tên phải)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
