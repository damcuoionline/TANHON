import React, { useState } from 'react';
import { FAQ_LIST } from '../data/weddingData';
import { Heart, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SectionCornerDecorations } from './PatrioticEmblem';

interface FAQSectionProps {
  onOpenGiftModal?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const dressCodeColors = [
    { name: 'Vàng Pastel / Kem', code: '#FEF08A' },
    { name: 'Vàng Champagne', code: '#FDE047' },
    { name: 'Trắng Ngà (Ivory)', code: '#FFFDF0', border: true },
    { name: 'Pastel Hồng Nhạt', code: '#FDE2E4' },
  ];

  return (
    <section
      id="faq"
      className="py-14 sm:py-20 relative bg-[#FEFCF6] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-amber-800 mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span className="text-xs uppercase tracking-widest font-semibold font-heading">
              Thông Tin Khách Mời Cần Biết
            </span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-amber-950 tracking-tight mb-3">
            Giải Đáp Thắc Mắc (FAQ)
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto mb-4" />
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed font-serif-cormorant italic text-base sm:text-lg">
            Dưới đây là một số thông tin giải đáp nhanh cho những câu hỏi thường gặp của quý khách mời.
          </p>
        </ScrollReveal>

        {/* Dress Code Color Palette Visual Display with Scroll Reveal */}
        <ScrollReveal direction="up" delay={0.1} className="mb-8 bg-amber-50/50 p-4 sm:p-6 rounded-3xl border border-amber-200/80 shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-heading text-xs sm:text-sm font-bold text-amber-950">
              Gợi Ý Bảng Màu Trang Phục (Dress Code Palette)
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {dressCodeColors.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-xl bg-white border border-amber-200/80 shadow-2xs"
              >
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full shrink-0 shadow-inner ${
                    c.border ? 'border border-amber-300' : ''
                  }`}
                  style={{ backgroundColor: c.code }}
                />
                <span className="text-[11px] sm:text-xs font-semibold text-stone-800 whitespace-nowrap">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* FAQ Accordion List with Scroll Reveal */}
        <div className="space-y-3 sm:space-y-3.5">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal
                key={index}
                direction="up"
                delay={0.06 * index}
              >
                <div className="bg-amber-50/40 rounded-2xl border border-amber-200/80 shadow-2xs overflow-hidden transition-all">
                  <button
                    onClick={() => toggleIndex(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-amber-100/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-200/80 text-amber-950 flex items-center justify-center text-xs font-bold shrink-0 border border-amber-300/80">
                        ?
                      </div>
                      <span className="font-semibold text-xs sm:text-sm md:text-base text-stone-900">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-amber-200/60 bg-white/80 animate-fadeIn">
                      <p className="font-serif-cormorant text-sm sm:text-base italic text-stone-800">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
