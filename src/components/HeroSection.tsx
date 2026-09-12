import React, { useState, useEffect } from 'react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { Heart, MapPin, ChevronDown, PartyPopper } from 'lucide-react';
import { triggerWeddingFireworks } from '../utils/fireworks';
import { WavingVietnameseFlag, SectionCornerDecorations } from './PatrioticEmblem';
import { ScrollReveal } from './ScrollReveal';

interface HeroSectionProps {
  onOpenGiftModal?: () => void;
  onOpenInvitation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInvitation }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFireworks = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerWeddingFireworks();
  };

  const scrollToInvitation = () => {
    const target = document.getElementById('wedding-invitation-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic overlay: Starts at 0 (completely pure, bright couple photo),
  // smoothly darkens only when user scrolls down to reveal wedding details
  const overlayDarkness = Math.min(0.78, Math.max(0, (scrollY - 20) / 360) * 0.78);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start overflow-hidden bg-stone-950 text-white"
    >
      {/* 1. Fixed Background Couple Photo with Dynamic Scroll Darkening */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={WEDDING_CONFIG.bgImage || WEDDING_CONFIG.heroImage}
          onError={(e) => {
            const fallback = "/assets/aistudio/hero_bg_clean_1920.webp";
            if (e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          alt="Trương Minh Cảnh & Nguyễn Đàm Thanh Nhi"
          className="w-full h-full object-cover object-[center_20%] sm:object-[center_24%] brightness-105 contrast-[1.02]"
        />
        {/* Dynamic Soft Overlay: 100% transparent at top, softly tints on scroll */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{ 
            backgroundColor: `rgba(12, 10, 9, ${overlayDarkness})`,
          }}
        />
        {/* Smooth gradient that only emerges as user scrolls */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-stone-950 pointer-events-none transition-opacity duration-300"
          style={{ opacity: Math.min(1, scrollY / 150) }}
        />
      </div>

      {/* 2. STAGE 1: Fullscreen Couple Photo View - PURE PHOTO, ZERO OTHER CONTENT */}
      <div className="relative z-10 w-full min-h-[100dvh] flex flex-col justify-end items-center px-4 pb-6 sm:pb-8 pointer-events-auto select-none">
        {/* Subtle, non-intrusive animated scroll indicator */}
        <button
          type="button"
          onClick={scrollToInvitation}
          className="flex flex-col items-center gap-1 cursor-pointer text-white/90 hover:text-amber-200 transition-all active:scale-95 group mb-2"
          title="Cuộn để xem thiệp"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] opacity-85 group-hover:opacity-100">
            Cuộn xuống để xem thiệp
          </span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
        </button>
      </div>

      {/* 3. STAGE 2: Main Wedding Invitation Card & Details - Glides Up when scrolling up */}
      <div 
        id="wedding-invitation-content"
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center flex flex-col items-center"
      >
        {/* Patriotic Warm Welcome Grand Badge */}
        <ScrollReveal direction="fly-down" duration={0.45}>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-1.5 sm:py-2 rounded-full bg-stone-950/80 backdrop-blur-md border border-amber-400/60 text-amber-200 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-5 sm:mb-6 shadow-xl">
            <WavingVietnameseFlag width={32} height={21} showPole={false} />
            <span className="text-amber-300 font-bold">Bên Nhau Trọn Đời</span>
          </div>
        </ScrollReveal>

        {/* Script Intro with Motion fly-left */}
        <ScrollReveal direction="fly-left" duration={0.45} delay={0.05}>
          <p className="font-script text-2xl sm:text-4xl text-amber-200 mb-1 sm:mb-2 drop-shadow-md">
            Lễ Thành Hôn
          </p>
        </ScrollReveal>

        {/* Main Grand Names - Groom Trương Minh Cảnh first, Bride Nguyễn Đàm Thanh Nhi with full Vietnamese diacritic clarity */}
        <ScrollReveal direction="fly-up" duration={0.5} delay={0.08}>
          <div className="relative my-2 w-full max-w-full px-2">
            <h1 className="font-heading font-bold uppercase leading-normal drop-shadow-2xl flex flex-col items-center justify-center py-1 w-full text-center">
              <span className="text-[clamp(1.15rem,5vw,3.5rem)] tracking-tight sm:tracking-wide text-amber-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] py-0.5 px-1 text-center w-full block">
                Trương Minh Cảnh
              </span>
              <span className="text-xl sm:text-3xl md:text-4xl font-script text-amber-300 normal-case my-0.5 sm:my-1.5 font-normal leading-none select-none text-center">
                &
              </span>
              <span className="text-[clamp(1.15rem,5vw,3.5rem)] tracking-tight sm:tracking-wide text-amber-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] py-0.5 px-1 text-center w-full block">
                Nguyễn Đàm Thanh Nhi
              </span>
            </h1>
          </div>
        </ScrollReveal>

        {/* Elegant Golden Divider */}
        <ScrollReveal direction="zoom" duration={0.45} delay={0.1}>
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className="w-16 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-amber-300" />
            <div className="w-2 h-2 rotate-45 bg-amber-400 shadow-xs" />
            <div className="w-16 sm:w-28 h-[1.5px] bg-gradient-to-l from-transparent via-amber-400 to-amber-300" />
          </div>
        </ScrollReveal>

        {/* Intimate & Heartfelt Thank-You Letter to Guests */}
        <ScrollReveal direction="fly-up" duration={0.5} delay={0.12}>
          <div className="relative my-3 sm:my-5 max-w-2xl mx-auto p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-stone-950/75 border border-amber-300/40 backdrop-blur-md shadow-2xl text-stone-100">
            {/* Subtle Inner Gold Border */}
            <div className="absolute inset-2 sm:inset-2.5 border border-amber-300/20 rounded-xl sm:rounded-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs whitespace-nowrap">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse shrink-0" />
                <span>Lời Tri Ân & Cảm Ơn Chân Thành</span>
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse shrink-0" />
              </div>
              
              <h3 className="font-heading text-base sm:text-xl md:text-2xl font-bold text-amber-200 mb-1.5 text-center">
                Kính gửi Quý Quan Khách & Người Thân Yêu Quý
              </h3>
              
              <p className="font-serif-cormorant italic text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed text-center px-1 sm:px-3">
                Tình yêu đẹp nhất khi đơm hoa kết trái trong vòng tay yêu thương và chúc phúc của gia đình, thầy cô cùng những người thân quý nhất. Sự hiện diện và tình cảm chân thành của Quý khách là món quà quý giá, ý nghĩa nhất trong ngày Thành Hôn của chúng con/chúng mình. Gia đình cùng chú rể Minh Cảnh & cô dâu Thanh Nhi xin gửi lời cảm ơn sâu sắc và trân trọng nhất!
              </p>

              <div className="mt-3 pt-2.5 border-t border-amber-300/30 flex flex-col sm:flex-row items-center justify-between w-full text-[11px] sm:text-xs text-amber-200/90 font-medium px-1 gap-1 sm:gap-2">
                <span className="font-script text-base sm:text-lg text-amber-300 font-normal">Minh Cảnh & Thanh Nhi</span>
                <span className="font-serif italic text-stone-300 whitespace-nowrap">Trân trọng kính mời & cảm ơn!</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Location Badges */}
        <ScrollReveal direction="fly-right" duration={0.45} delay={0.14}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-3 sm:my-4 text-xs text-amber-100">
            <div className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/40 text-[11px] sm:text-xs shadow-md whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Lễ Thành Hôn: Tư Gia Nhà Trai</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/40 text-[11px] sm:text-xs shadow-md whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Tiệc Mừng: TT Tiệc Cưới Minh Hiếu</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal direction="fly-up" duration={0.5} delay={0.16}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto px-4 max-w-md sm:max-w-none">
            <a
              href="#rsvp"
              id="hero-rsvp-cta"
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wide shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-amber-200 whitespace-nowrap"
            >
              <Heart className="w-4 h-4 fill-stone-950 shrink-0" />
              <span>Đăng Ký Tham Dự (RSVP)</span>
            </a>
            <a
              href="#events"
              id="hero-events-cta"
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-red-950/60 hover:bg-red-900/70 text-amber-200 border border-amber-400/50 backdrop-blur-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md whitespace-nowrap"
            >
              <span>Lễ Thành Hôn</span>
            </a>
            <button
              id="hero-fireworks-btn"
              onClick={handleFireworks}
              title="Bắn pháo hoa chúc mừng"
              className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-full bg-amber-400/20 hover:bg-amber-400/35 text-amber-200 border border-amber-300/50 backdrop-blur-md font-medium text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-md whitespace-nowrap"
            >
              <PartyPopper className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Pháo Hoa Mừng</span>
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#countdown"
        className="relative z-10 my-4 flex flex-col items-center text-stone-300 hover:text-amber-300 transition-colors group"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium mb-0.5 group-hover:translate-y-0.5 transition-transform text-amber-200/90">
          Lịch trình & Đếm ngược
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-300" />
      </a>
    </section>
  );
};
