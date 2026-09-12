import React, { useState, useEffect } from 'react';
import { INITIAL_WISHES, WishMessage } from '../data/weddingData';
import confetti from 'canvas-confetti';
import { Heart, Send, MessageSquare, Sparkles, X, PartyPopper } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GoldenLotusIcon, WavingVietnameseFlag, SectionCornerDecorations } from './PatrioticEmblem';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwpxi7QfALOdf0bmmyKaB0MwDXop3zP9eL43MoTFoT48b7So1BSSdZ0agCCK1Znuog/exec';

const TELEGRAM_BOT_TOKEN = '8837421521:AAE8D6lBgxF16afXUgE91nOdM4QgPu5ukNQ';
const TELEGRAM_CHAT_ID = '1942103494';

export const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneOrEmail: '',
    attendance: 'Có', // 'Có' | 'Không'
    attendeeCount: '1',
    wishMessage: '',
    guestOf: 'Nhà Trai (Chú Rể Minh Cảnh)',
    attendingEvents: 'Tất Cả Sự Kiện (Đêm Nhóm Họ, Lễ Thành Hôn & Tiệc Cưới)',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const [wishes, setWishes] = useState<WishMessage[]>(() => {
    const saved = localStorage.getItem('wedding_wishes_canh_nhi');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_WISHES;
      }
    }
    return INITIAL_WISHES;
  });

  useEffect(() => {
    localStorage.setItem('wedding_wishes_canh_nhi', JSON.stringify(wishes));
  }, [wishes]);

  // Auto-hide toast after 8 seconds
  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // If attendance is set to 'Không', default attendeeCount to '0'
      if (name === 'attendance' && value === 'Không') {
        updated.attendeeCount = '0';
      } else if (name === 'attendance' && value === 'Có' && prev.attendeeCount === '0') {
        updated.attendeeCount = '1';
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    setIsSubmitting(true);
    const guestName = formData.fullName.trim();
    const guestPhone = formData.phoneOrEmail.trim();
    const isAttending = formData.attendance === 'Có' ? 'Có' : 'Không';
    const guestCount = isAttending === 'Không' ? '0' : formData.attendeeCount;
    const guestWish = formData.wishMessage.trim();

    // Payload exactly matching requested Google Sheet column headers:
    // 'Họ Tên', 'Số điện thoại', 'Tham dự (Có/Không)', 'Số lượng', 'Lời chúc'
    const payload = {
      'Họ Tên': guestName,
      'Số điện thoại': guestPhone || 'Chưa cung cấp',
      'Tham dự (Có/Không)': isAttending,
      'Số lượng': guestCount,
      'Lời chúc': guestWish || 'Chúc hai bạn trăm năm hạnh phúc, vẹn tròn nghĩa phu thê!',
    };

    try {
      // Build URLSearchParams for dual compatibility (e.parameter & JSON postData)
      const queryParams = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => {
        queryParams.append(k, String(v));
      });
      const fullUrl = `${GOOGLE_SCRIPT_URL}?${queryParams.toString()}`;

      // Send POST fetch request to Google Apps Script
      await fetch(fullUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn('Lỗi khi gửi Google Sheets Apps Script, tiếp tục ghi nhận:', error);
    }

    // Gửi thông tin trực tiếp về Telegram Bot cho gia đình
    try {
      const now = new Date();
      const timeString = `${now.toLocaleTimeString('vi-VN')} - ${now.toLocaleDateString('vi-VN')}`;
      const telegramMessage =
        `💍 *CÓ KHÁCH XÁC NHẬN MỚI!*\n\n` +
        `👤 *Họ tên:* ${guestName}\n` +
        `📞 *Số điện thoại:* ${guestPhone || 'Không có'}\n` +
        `🏷 *Nhóm:* ${formData.guestOf}\n` +
        `💌 *Tham dự:* ${isAttending === 'Có' ? 'Có tham dự' : 'Rất tiếc không thể tham dự'}\n` +
        `👥 *Số lượng đi:* ${guestCount} người\n` +
        `🎪 *Sự kiện:* ${formData.attendingEvents}\n` +
        `📝 *Lời chúc/Ghi chú:* ${guestWish || 'Không có'}\n` +
        `⏰ *Thời gian:* ${timeString}`;

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      const tgRes = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      });

      const tgData = await tgRes.json();
      if (!tgData.ok) {
        // Fallback plain text nếu có ký tự đặc biệt làm lỗi cú pháp Markdown
        await fetch(telegramUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage.replace(/\*/g, ''),
          }),
        });
      }
    } catch (telegramErr) {
      console.error('Lỗi kết nối gửi Telegram Bot:', telegramErr);
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#fef08a', '#e11d48', '#d97706', '#f43f5e'],
      });
    } catch {
      // ignore
    }

    // Append wish to online guestbook
    if (guestWish) {
      const newWish: WishMessage = {
        id: `w-${Date.now()}`,
        name: guestName,
        relation: formData.guestOf,
        message: guestWish,
        date: 'Vừa xong',
        likes: 1,
      };
      setWishes((prev) => [newWish, ...prev]);
    }

    // Update submitted feedback info
    setSubmittedName(guestName);
    setShowSuccessToast(true);
    setIsSubmitting(false);

    // Auto-reset form to clean state for next input
    setFormData({
      fullName: '',
      phoneOrEmail: '',
      attendance: 'Có',
      attendeeCount: '1',
      wishMessage: '',
      guestOf: 'Nhà Trai (Chú Rể Minh Cảnh)',
      attendingEvents: 'Tất Cả Sự Kiện (Đêm Nhóm Họ, Lễ Thành Hôn & Tiệc Cưới)',
    });
  };

  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  return (
    <section
      id="rsvp"
      className="py-14 sm:py-20 relative bg-[#FEFCF6] overflow-hidden"
    >
      {/* Cute Thank You Toast / Popup */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-md w-[calc(100%-2rem)] bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl border-2 border-amber-300 text-stone-800 animate-bounce-subtle transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shrink-0 shadow-xs">
                <PartyPopper className="w-6 h-6 text-amber-600 animate-pulse" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-amber-950 text-sm sm:text-base flex items-center gap-1.5">
                  <span>Cảm Ơn {submittedName || 'Bạn'} Yêu Quý!</span>
                  <GoldenLotusIcon size={16} />
                </h4>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed font-serif-cormorant italic text-sm">
                  Thông tin xác nhận & lời chúc gửi tới Minh Cảnh & Thanh Nhi thành công. Hẹn gặp bạn tại Lễ Thành Hôn nhé!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100 transition-colors shrink-0 cursor-pointer"
              title="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="fly-down" duration={0.45} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-amber-50 text-red-900 border border-amber-300 shadow-2xs mb-3">
            <WavingVietnameseFlag width={22} height={14} showPole={false} />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold font-heading">
              Xác Nhận Tham Dự Lễ Thành Hôn
            </span>
            <GoldenLotusIcon size={16} className="animate-lotus-glow" />
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-amber-950 tracking-tight mb-3">
            Báo Hỷ Tham Dự & Sổ Lưu Bút
          </h2>
          <div className="flex items-center justify-center gap-2 mx-auto mb-4">
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            <GoldenLotusIcon size={18} className="text-amber-500 animate-spin-slow" />
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed px-2 font-serif-cormorant italic text-base sm:text-lg">
            Sự hiện diện của Quý khách là niềm vinh hạnh to lớn cho gia đình và đôi uyên ương Minh Cảnh & Thanh Nhi. 
            Xin vui lòng phản hồi trước ngày <strong>25/09/2026</strong> để gia đình chuẩn bị đón tiếp chu đáo nhất nhé!
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* Left Column: RSVP Form */}
          <ScrollReveal direction="fly-left" duration={0.45} delay={0.05} className="lg:col-span-7">
            <div className="bg-gradient-to-b from-amber-50/50 to-white rounded-3xl p-5 sm:p-8 shadow-md border border-amber-200/90 h-full relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" id="guestForm">
                {/* Full Name (Họ Tên) */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1 font-heading">
                    Họ và Tên <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Nguyễn Văn A hoặc Gia đình Anh B"
                    className="w-full px-3.5 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none text-base sm:text-sm text-stone-900 placeholder:text-stone-400 bg-white transition-all shadow-2xs"
                  />
                </div>

                {/* Phone / Email (Số điện thoại) */}
                <div>
                  <label htmlFor="rsvp-phoneOrEmail" className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1 font-heading">
                    Số Điện Thoại
                  </label>
                  <input
                    id="rsvp-phoneOrEmail"
                    type="tel"
                    name="phoneOrEmail"
                    value={formData.phoneOrEmail}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: 0901 234 567 (Để gửi thông tin nhắc lịch)"
                    className="w-full px-3.5 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none text-base sm:text-sm text-stone-900 placeholder:text-stone-400 bg-white transition-all shadow-2xs"
                  />
                </div>

                {/* Attendance (Tham dự không) & Number of Attendees (Số lượng) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Tham dự không) */}
                  <div>
                    <label htmlFor="rsvp-attendance" className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1 font-heading">
                      Bạn Sẽ Tham Dự? <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="rsvp-attendance"
                      name="attendance"
                      value={formData.attendance}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none text-base sm:text-sm text-stone-900 bg-white transition-all shadow-2xs cursor-pointer"
                    >
                      <option value="Có">Có, chắc chắn mình sẽ đến</option>
                      <option value="Không">Rất tiếc, mình không thể tham dự</option>
                    </select>
                  </div>

                  {/* Số lượng */}
                  <div>
                    <label htmlFor="accompany" className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1 font-heading">
                      Số Lượng Người
                    </label>
                    <select
                      id="accompany"
                      name="attendeeCount"
                      disabled={formData.attendance === 'Không'}
                      value={formData.attendeeCount}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none text-base sm:text-sm text-stone-900 bg-white transition-all shadow-2xs disabled:bg-stone-100 disabled:text-stone-400 cursor-pointer"
                    >
                      {formData.attendance === 'Không' ? (
                        <option value="0">0 người (Không tham dự)</option>
                      ) : (
                        <>
                          <option value="1">1 người (Đi một mình)</option>
                          <option value="2">2 người (Đi cùng người thương)</option>
                          <option value="3">3 người (Gia đình 3 người)</option>
                          <option value="4+">4 người trở lên</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Guest Of */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label htmlFor="group" className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1 font-heading">
                      Bạn Là Khách Mời Của
                    </label>
                    <select
                      id="group"
                      name="guestOf"
                      value={formData.guestOf}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none text-base sm:text-sm text-stone-900 bg-white transition-all shadow-2xs cursor-pointer"
                    >
                      <option value="Nhà Trai (Chú Rể Minh Cảnh)">Nhà Trai (Chú Rể Minh Cảnh)</option>
                      <option value="Nhà Gái (Cô Dâu Thanh Nhi)">Nhà Gái (Cô Dâu Thanh Nhi)</option>
                      <option value="Cả Hai (Bạn Chung)">Cả Hai (Bạn Chung)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="rsvp-attendingEvents" className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1 font-heading">
                      Sự Kiện Tham Dự
                    </label>
                    <select
                      id="rsvp-attendingEvents"
                      name="attendingEvents"
                      value={formData.attendingEvents}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none text-base sm:text-sm text-stone-900 bg-white transition-all shadow-2xs cursor-pointer"
                    >
                      <option value="Tất Cả Sự Kiện (Đêm Nhóm Họ, Lễ Thành Hôn & Tiệc Cưới)">Tất Cả Sự Kiện (Đêm Nhóm Họ, Lễ & Tiệc)</option>
                      <option value="Đêm Nhóm Họ (17:30 Thứ Bảy 03/10 tại Tư Gia Nhà Trai)">Đêm Nhóm Họ (17:30 Chiều 03/10 tại Nhà Trai)</option>
                      <option value="Lễ Thành Hôn (09:00 Sáng 04/10 tại Tư Gia Nhà Trai)">Lễ Thành Hôn (09:00 Sáng 04/10 tại Nhà Trai)</option>
                      <option value="Tiệc Mừng Thành Hôn (11:00 Trưa 04/10 tại TT Tiệc Cưới Minh Hiếu)">Tiệc Mừng Thành Hôn (11:00 Trưa 04/10 tại Minh Hiếu)</option>
                      <option value="Cả Lễ & Tiệc Ngày 04/10 (Tư Gia Nhà Trai & TT Tiệc Cưới Minh Hiếu)">Cả Lễ & Tiệc Ngày 04/10 (Nhà Trai & TT Minh Hiếu)</option>
                    </select>
                  </div>
                </div>

                {/* Wish Message (Lời chúc) */}
                <div>
                  <label htmlFor="note" className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1 font-heading">
                    Lời Chúc Yêu Thương & Nhắn Nhủ
                  </label>
                  <textarea
                    id="note"
                    name="wishMessage"
                    rows={3}
                    value={formData.wishMessage}
                    onChange={handleInputChange}
                    placeholder="Viết lời chúc phúc đến Minh Cảnh & Thanh Nhi nhé..."
                    className="w-full px-3.5 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none text-base sm:text-sm text-stone-900 placeholder:text-stone-400 bg-white transition-all resize-none shadow-2xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-rsvp-btn"
                  className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-bold text-xs sm:text-sm tracking-wide uppercase shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-98 border border-amber-200 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-stone-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang gửi...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-stone-950 shrink-0" />
                      <span className="whitespace-nowrap">Gửi Đăng Ký Tham Dự & Lời Chúc</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Right Column: Live Guestbook */}
          <ScrollReveal direction="fly-right" duration={0.45} delay={0.1} className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-b from-amber-50/50 to-white rounded-3xl p-5 sm:p-7 shadow-md border border-amber-200/90 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3.5 border-b border-amber-200/80 mb-4">
                <div className="flex items-center gap-2">
                  <GoldenLotusIcon size={18} />
                  <h3 className="font-heading text-base sm:text-lg font-bold text-amber-950">
                    Sổ Lưu Bút Online
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-bold border border-amber-300/80 whitespace-nowrap">
                  {wishes.length} Lời chúc
                </span>
              </div>

              {/* Wishes List */}
              <div className="space-y-3 overflow-y-auto max-h-[440px] pr-1 scrollbar-thin flex-1">
                {wishes.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white border border-amber-200/80 transition-all hover:bg-amber-50/60 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-amber-950 flex flex-wrap items-center gap-1.5">
                          <span className="truncate">{item.name}</span>
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-amber-100/70 text-amber-900 border border-amber-200/60 whitespace-nowrap">
                            {item.relation}
                          </span>
                        </h4>
                        <span className="text-[10px] text-stone-400">{item.date}</span>
                      </div>
                      <button
                        onClick={() => handleLikeWish(item.id)}
                        className="flex items-center gap-1 text-[11px] text-red-600 hover:text-red-700 px-2 py-0.5 rounded-full bg-red-50 hover:bg-red-100 transition-colors border border-red-100 cursor-pointer shrink-0"
                        title="Thả tim lời chúc"
                      >
                        <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed font-serif-cormorant text-sm italic break-words">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 pt-3 border-t border-amber-200/70 text-center">
                <p className="text-[11px] text-stone-500 italic">
                  Lời chúc của bạn khi gửi form RSVP sẽ đồng bộ lên Google Sheets & hiển thị tại đây.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
