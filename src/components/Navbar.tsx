import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Menu, X, Mail } from 'lucide-react';
import { GoldenLotusIcon, WavingVietnameseFlag } from './PatrioticEmblem';

interface NavbarProps {
  isPlaying: boolean;
  toggleMusic: () => void;
  onOpenGiftModal?: () => void;
  onOpenInvitation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isPlaying, 
  toggleMusic, 
  onOpenInvitation 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang Chủ', href: '#hero' },
    { label: 'Đếm Ngược', href: '#countdown' },
    { label: 'Album Ảnh Cưới', href: '#gallery' },
    { label: 'Lễ Thành Hôn', href: '#events' },
    { label: 'Đăng Ký (RSVP)', href: '#rsvp' },
    { label: 'Hỏi Đáp', href: '#faq' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'translate-y-0 opacity-100 bg-[#FEFCF7]/95 backdrop-blur-md shadow-sm border-b border-amber-200/80 py-2.5 sm:py-3 text-stone-800'
          : '-translate-y-full opacity-0 pointer-events-none py-3 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Monogram with Flag & Lotus */}
        <a
          href="#hero"
          className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-400 to-yellow-300 text-stone-950 flex items-center justify-center font-bold text-xs sm:text-sm font-heading shadow-md border border-amber-200">
              C&N
            </div>
            <div className="absolute -top-1.5 -right-1.5">
              <WavingVietnameseFlag width={14} height={9} showPole={false} />
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-heading text-sm sm:text-base font-bold tracking-wide transition-colors flex items-center gap-1.5 ${
                isScrolled ? 'text-amber-950' : 'text-white'
              }`}
            >
              <span>Minh Cảnh & Thanh Nhi</span>
              <GoldenLotusIcon size={14} className="opacity-90" />
            </span>
            <span
              className={`text-[10px] tracking-widest uppercase font-medium ${
                isScrolled ? 'text-red-700' : 'text-amber-300/90'
              }`}
            >
              04 • 10 • 2026 • LỄ THÀNH HÔN
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6" id="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-wider font-semibold transition-colors hover:text-amber-600 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-500 hover:after:w-full after:transition-all ${
                isScrolled ? 'text-stone-700' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Xem Lại Thiệp Mời Button */}
          {onOpenInvitation && (
            <button
              id="reopen-invitation-btn"
              onClick={onOpenInvitation}
              title="Mở thiệp mời & Bắn pháo hoa"
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                isScrolled
                  ? 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200 shadow-2xs'
                  : 'bg-white/15 text-amber-200 border-amber-300/50 hover:bg-white/25 backdrop-blur-sm'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
              <span className="hidden sm:inline">Mở Thiệp</span>
            </button>
          )}

          {/* Direct Music Toggle Button ("Bật/Tắt") */}
          <button
            id="nav-music-toggle-btn"
            onClick={toggleMusic}
            title={isPlaying ? "Tắt âm thanh đám cưới" : "Bật âm thanh đám cưới"}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-semibold shadow-2xs active:scale-95 cursor-pointer ${
              isPlaying
                ? isScrolled
                  ? 'bg-amber-400 text-stone-950 border-amber-400'
                  : 'bg-amber-400 text-stone-950 border-amber-300'
                : isScrolled
                  ? 'bg-amber-50 text-stone-700 border-amber-200 hover:bg-amber-100 hover:text-amber-950'
                  : 'bg-white/15 text-white border-white/30 hover:bg-white/25'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 animate-pulse" />
                <span className="hidden sm:inline text-[11px] font-bold">Tắt Nhạc</span>
                <span className="flex items-end gap-0.5 h-2.5 ml-0.5">
                  <span className="w-0.5 bg-stone-950 rounded-full animate-pulse h-2" />
                  <span className="w-0.5 bg-stone-950 rounded-full animate-pulse h-2.5" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 bg-stone-950 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.4s' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400" />
                <span className="hidden sm:inline text-[11px]">Bật Nhạc</span>
              </>
            )}
          </button>

          {/* Quick RSVP CTA */}
          <a
            href="#rsvp"
            id="nav-rsvp-btn"
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-stone-950 shadow-2xs hover:brightness-105 transition-all border border-amber-300"
          >
            Gửi RSVP
          </a>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className={`p-1.5 rounded-lg lg:hidden transition-colors cursor-pointer ${
              isScrolled ? 'text-stone-800 hover:bg-amber-100/50' : 'text-white hover:bg-white/20'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#FEFCF7] border-b border-amber-200 shadow-xl px-4 pt-3 pb-5 mt-2 space-y-2 animate-fadeIn text-stone-800"
        >
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-amber-100/60 hover:text-amber-950 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-amber-700">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-amber-200/80 flex flex-col gap-2">
            {/* Toggle Music in Mobile Menu */}
            <button
              onClick={() => {
                toggleMusic();
              }}
              className={`w-full py-2.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isPlaying 
                  ? 'bg-amber-400 text-stone-950 border-amber-400' 
                  : 'bg-amber-50 text-stone-800 border-amber-200'
              }`}
            >
              {isPlaying ? <Volume2 className="w-4 h-4 text-stone-950" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
              <span>{isPlaying ? 'Tắt Nhạc Đang Phát' : 'Bật Nhạc Đám Cưới'}</span>
            </button>

            {onOpenInvitation && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInvitation();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-red-600 fill-red-500" />
                <span>Chạm Để Mở Thiệp</span>
              </button>
            )}

            <a
              href="#rsvp"
              onClick={handleLinkClick}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-2xs border border-amber-300"
            >
              <Heart className="w-4 h-4 text-stone-950 fill-stone-950/20" />
              <span>Xác Nhận Tham Dự (RSVP)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
