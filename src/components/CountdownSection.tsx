import React, { useState, useEffect } from 'react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { Calendar, Heart, Clock, Bell, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GoldenLotusIcon, WavingVietnameseFlag, SectionCornerDecorations } from './PatrioticEmblem';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(WEDDING_CONFIG.weddingDate).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Lễ Thành Hôn & Tiệc Cưới: Minh Cảnh & Thanh Nhi`);
    const details = encodeURIComponent(
      `Chào mừng quý quan khách đến chung vui Lễ Thành Hôn tại Tư Gia Nhà Trai (Đường Đồng Khởi, KP. Ninh Phước, TT. Lộc Ninh) và Tiệc Mừng tại Trung Tâm Tiệc Cưới Minh Hiếu cùng gia đình và đôi uyên ương Minh Cảnh - Thanh Nhi! Rất hân hạnh được đón tiếp!`
    );
    const location = encodeURIComponent(`Tư Gia Nhà Trai (Đường Đồng Khởi, KP. Ninh Phước, TT. Lộc Ninh, Bình Phước) & TT Tiệc Cưới Minh Hiếu`);
    const startTime = '20261004T020000Z';
    const endTime = '20261004T070000Z';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const timeBlocks = [
    { label: 'Ngày', value: timeLeft.days, direction: 'fly-left' as const },
    { label: 'Giờ', value: timeLeft.hours, direction: 'fly-up' as const },
    { label: 'Phút', value: timeLeft.minutes, direction: 'fly-up' as const },
    { label: 'Giây', value: timeLeft.seconds, direction: 'fly-right' as const },
  ];

  return (
    <section
      id="countdown"
      className="py-14 sm:py-20 relative bg-[#FEFDF9] overflow-hidden"
    >
      {/* Subtle Lotus Background Watermark */}
      <div className="absolute -top-10 -right-10 pointer-events-none opacity-10">
        <GoldenLotusIcon size={240} />
      </div>
      <div className="absolute -bottom-10 -left-10 pointer-events-none opacity-10">
        <GoldenLotusIcon size={240} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="fly-down" duration={0.45} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-900 mb-3 shadow-xs">
            <WavingVietnameseFlag width={22} height={14} showPole={false} />
            <span className="text-[11px] uppercase tracking-widest font-bold">
              Đếm Ngược Ngày Chung Đôi
            </span>
            <GoldenLotusIcon size={14} className="animate-lotus-glow" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-amber-950 tracking-tight mb-3">
            Thời Gian Chờ Đến Ngày Hạnh Phúc
          </h2>
          <div className="flex items-center justify-center gap-2 mx-auto mb-4">
            <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            <GoldenLotusIcon size={20} className="text-amber-500 animate-spin-slow" />
            <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed px-2 font-serif-cormorant italic text-base sm:text-lg">
            Từng giây phút trôi qua đều là niềm mong đợi hạnh phúc ngập tràn cho ngày <strong>04.10.2026</strong>.
          </p>
        </ScrollReveal>

        {/* 4 Countdown Boxes with Dynamic Directional Motion */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto mb-8 sm:mb-10">
          {timeBlocks.map((block, idx) => (
            <ScrollReveal
              key={idx}
              direction={block.direction}
              delay={idx * 0.04}
              duration={0.45}
              className="w-full"
            >
              <div className="bg-gradient-to-b from-amber-50/80 to-red-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center border border-amber-200/90 shadow-2xs hover:shadow-lg transition-all group transform hover:-translate-y-1 relative overflow-hidden">
                {/* Subtle corner lotus detail */}
                <div className="absolute top-1 right-1 opacity-20 group-hover:opacity-40 transition-opacity">
                  <GoldenLotusIcon size={24} />
                </div>
                <div className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-amber-950 group-hover:text-red-800 transition-colors">
                  {String(block.value).padStart(2, '0')}
                </div>
                <div className="w-8 sm:w-10 h-0.5 bg-amber-300 mx-auto my-1.5 sm:my-2" />
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-900 whitespace-nowrap">
                  {block.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Date Details Bar & Add To Calendar CTA */}
        <ScrollReveal direction="fly-up" duration={0.45} delay={0.1}>
          <div className="bg-gradient-to-r from-amber-50/90 via-red-50/40 to-amber-50/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-amber-200/90 shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-200/80 border border-amber-300 flex items-center justify-center text-amber-950 shrink-0 shadow-2xs">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h4 className="font-heading text-sm sm:text-base font-bold text-amber-950">
                    Chủ Nhật, 04 Tháng 10 Năm 2026
                  </h4>
                  <GoldenLotusIcon size={14} className="text-amber-600" />
                </div>
                <p className="text-xs text-amber-900 font-medium">
                  (Nhằm ngày 24 tháng 08 năm Bính Ngọ • Lễ Thành Hôn)
                </p>
              </div>
            </div>

            <button
              onClick={handleAddToCalendar}
              id="add-to-calendar-btn"
              className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-500 hover:to-yellow-400 text-stone-950 text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 shrink-0 border border-amber-200 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-stone-950 shrink-0" />
              <span>Lưu Lịch Vào Google Calendar</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
