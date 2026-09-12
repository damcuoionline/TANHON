import React from 'react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { Phone, ArrowUp, Heart } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GoldenLotusIcon, WavingVietnameseFlag, SectionCornerDecorations } from './PatrioticEmblem';

interface FooterProps {
  onOpenGiftModal?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="wedding-footer" className="bg-[#FAF7EE] text-stone-800 pt-16 pb-20 sm:pb-12 relative overflow-hidden border-t-2 border-amber-300/80">
      {/* Decorative Ornaments */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal direction="fly-down" duration={0.45} className="text-center max-w-2xl mx-auto mb-10">
          {/* Couple Monogram with Lotus Emblem */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
            <div className="w-full h-full rounded-full border-2 border-amber-400 flex items-center justify-center bg-white shadow-md">
              <span className="font-heading text-lg sm:text-xl font-bold text-amber-900">C & N</span>
            </div>
            <div className="absolute -top-2 -right-2">
              <GoldenLotusIcon size={24} className="animate-lotus-glow" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-900 border border-amber-300 shadow-2xs mb-3">
            <WavingVietnameseFlag width={20} height={13} showPole={false} />
            <span className="text-xs uppercase tracking-widest font-bold font-heading">
              Trọn Tình Vẹn Nghĩa Son Sắt
            </span>
          </div>

          <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-amber-950 mb-2">
            Trương Minh Cảnh & Nguyễn Đàm Thanh Nhi
          </h3>
          <p className="text-xs sm:text-sm text-red-800 font-heading tracking-widest uppercase mb-3 font-semibold whitespace-nowrap">
            04 • 10 • 2026 • Lễ Thành Hôn
          </p>
          <div className="flex items-center justify-center gap-2 mx-auto mb-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            <GoldenLotusIcon size={16} className="text-amber-500" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* Sincere Thank You Message */}
          <p className="font-serif-cormorant text-base sm:text-lg italic text-stone-600 leading-relaxed max-w-lg mx-auto">
            Cảm ơn sự đồng hành, sẻ chia và tình cảm yêu thương của Quý khách dành cho Minh Cảnh & Thanh Nhi trong ngày Thành Hôn trọng đại này!
          </p>
        </ScrollReveal>

        {/* Contact Hotline & Social Grid */}
        <ScrollReveal direction="fly-up" duration={0.45} delay={0.05} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
          {/* Groom Contact */}
          <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Liên Hệ Chú Rể (Minh Cảnh)
              </span>
              <p className="font-bold text-stone-900 text-sm mt-0.5">{WEDDING_CONFIG.groom.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${WEDDING_CONFIG.groom.phone}`}
                className="p-2 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 transition-colors shadow-2xs cursor-pointer"
                title="Gọi điện"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={WEDDING_CONFIG.groom.zalo}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold cursor-pointer"
              >
                Zalo
              </a>
            </div>
          </div>

          {/* Bride Contact */}
          <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-red-700 tracking-wider">
                Liên Hệ Cô Dâu (Thanh Nhi)
              </span>
              <p className="font-bold text-stone-900 text-sm mt-0.5">{WEDDING_CONFIG.bride.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${WEDDING_CONFIG.bride.phone}`}
                className="p-2 rounded-full bg-rose-400 hover:bg-rose-500 text-white transition-colors shadow-2xs cursor-pointer"
                title="Gọi điện"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={WEDDING_CONFIG.bride.zalo}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-semibold cursor-pointer"
              >
                Zalo
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Links & Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-amber-200/70 text-xs text-stone-600 gap-3">
          <div className="flex items-center gap-1.5 text-center">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>Trương Minh Cảnh & Nguyễn Đàm Thanh Nhi • 04.10.2026</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="hover:text-amber-950 flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
            >
              <span>Về Đầu Trang</span>
              <ArrowUp className="w-3.5 h-3.5 text-amber-700" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
