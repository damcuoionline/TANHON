import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChibiProps {
  onTap?: () => void;
  className?: string;
  compact?: boolean;
}

export const ChibiGroom: React.FC<ChibiProps> = ({ onTap, className = '', compact = false }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    "Mời bạn đến chung vui ăn cưới cùng tụi mình nhé! 🥂",
    "Sự hiện diện của bạn là niềm vui lớn của Minh Cảnh! 🤵",
    "Nhớ đến sớm chụp hình kỷ niệm cùng chú rể nha! 📸",
    "Hẹn gặp bạn ngày 04/10/2026 tại Nhà Trai! 🎉",
  ];

  const handleNextQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
    if (onTap) onTap();
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      <motion.div
        key={quoteIndex}
        initial={{ opacity: 0, y: 4, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        onClick={handleNextQuote}
        className={`relative cursor-pointer group ${compact ? 'mb-1 w-full max-w-[110px]' : 'mb-2'}`}
      >
        <div className={`bg-white/95 text-stone-900 rounded-xl sm:rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] border border-amber-300 font-medium text-center leading-tight overflow-hidden ${
          compact 
            ? 'px-1.5 py-1 w-full text-[8.5px]' 
            : 'px-3 py-1.5 max-w-[150px] sm:max-w-[170px] text-[11px] sm:text-xs'
        }`}>
          <span className={`font-bold text-red-700 block mb-0.5 truncate ${
            compact ? 'text-[8.5px] tracking-tight' : 'text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap'
          }`}>
            Chú Rể Minh Cảnh
          </span>
          <p className={`${compact ? 'text-[8px] leading-tight line-clamp-2 text-stone-700 font-normal break-words' : 'text-stone-800'}`}>
            {quotes[quoteIndex]}
          </p>
        </div>
        {/* Little triangle arrow pointing down */}
        <div className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-white/95 mx-auto -mt-[1px] drop-shadow-xs" />
      </motion.div>

      {/* Chibi Figure (SVG) */}
      <motion.div
        animate={{ 
          y: [0, -6, 0],
          rotate: [0, -1, 1, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextQuote}
        className="relative cursor-pointer filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
      >
        <svg
          viewBox="0 0 160 210"
          className={`${compact ? 'w-14 sm:w-18' : 'w-24 sm:w-28 md:w-32'} h-auto`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow beneath feet */}
          <ellipse cx="80" cy="202" rx="35" ry="6" fill="#000000" opacity="0.3" />

          {/* Body: Traditional Red Silk Áo Dài */}
          {/* Legs / Black Pants & Shoes */}
          <path d="M68 175 L68 198 Q68 202 75 202 L76 202 Q80 202 80 198 L80 175 Z" fill="#1E293B" />
          <path d="M82 175 L82 198 Q82 202 87 202 L93 202 Q97 202 96 198 L94 175 Z" fill="#1E293B" />
          {/* Shoes */}
          <ellipse cx="73" cy="200" rx="9" ry="4" fill="#0F172A" />
          <ellipse cx="91" cy="200" rx="9" ry="4" fill="#0F172A" />

          {/* Áo Dài Body */}
          <path
            d="M58 115 Q50 145 52 185 Q70 188 80 188 Q90 188 108 185 Q110 145 102 115 Z"
            fill="url(#groomAoDaiGrad)"
          />
          {/* Center split seam & Gold Trim */}
          <path d="M80 120 L80 188" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />
          
          {/* Golden Circular Dragon / Song Hy Medallion on Chest */}
          <circle cx="80" cy="142" r="14" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="80" cy="142" r="11" fill="#F59E0B" opacity="0.3" />
          {/* Stylized Double Happiness in circle */}
          <path d="M74 137 H86 M74 142 H86 M74 147 H86 M77 134 V150 M83 134 V150" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />

          {/* Left Arm: Holding golden invite scroll */}
          <g>
            <path
              d="M58 120 Q44 135 48 152 Q53 158 60 152 Q56 138 65 125 Z"
              fill="#DC2626"
            />
            {/* Hand */}
            <circle cx="49" cy="154" r="7" fill="#FDE047" opacity="0.2" />
            <circle cx="49" cy="154" r="6" fill="#FED7AA" />
            {/* Golden invitation scroll with red ribbon */}
            <rect x="36" y="146" width="24" height="9" rx="4" fill="#FEF08A" stroke="#D97706" strokeWidth="1.5" transform="rotate(-20 36 146)" />
            <rect x="44" y="143" width="5" height="11" rx="1.5" fill="#EF4444" transform="rotate(-20 44 143)" />
          </g>

          {/* Right Arm: Waving greeting hand */}
          <motion.g
            animate={{ rotate: [0, 14, -6, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "100px 122px" }}
          >
            <path
              d="M102 120 Q118 125 124 105 Q118 100 110 108 Q106 115 97 122 Z"
              fill="#DC2626"
            />
            {/* Waving Hand */}
            <circle cx="123" cy="102" r="7.5" fill="#FED7AA" />
            {/* Little fingers */}
            <ellipse cx="125" cy="98" rx="2.5" ry="3.5" fill="#FED7AA" />
            <ellipse cx="128" cy="101" rx="2" ry="3" fill="#FED7AA" />
          </motion.g>

          {/* Head & Neck */}
          <rect x="73" y="102" width="14" height="12" rx="4" fill="#FDBA74" />
          {/* Cute Chubby Chibi Face */}
          <ellipse cx="80" cy="74" rx="35" ry="32" fill="#FED7AA" />

          {/* Ears */}
          <ellipse cx="45" cy="76" rx="5" ry="7" fill="#FED7AA" />
          <ellipse cx="115" cy="76" rx="5" ry="7" fill="#FED7AA" />

          {/* Big Adorable Anime Hair */}
          <path
            d="M44 68 Q44 42 80 40 Q116 42 116 68 Q118 78 114 82 Q112 68 106 58 Q92 50 80 52 Q68 50 54 58 Q48 68 46 82 Q42 78 44 68 Z"
            fill="#1E1B18"
          />
          {/* Hair bangs */}
          <path d="M52 56 Q66 66 76 60 Q85 68 100 58 Q90 52 80 53 Q66 52 52 56 Z" fill="#2D241E" />
          <path d="M58 54 Q65 65 72 58" stroke="#1E1B18" strokeWidth="3" strokeLinecap="round" />
          <path d="M82 56 Q88 64 96 58" stroke="#1E1B18" strokeWidth="3" strokeLinecap="round" />

          {/* Traditional Vietnamese Groom Khăn Đóng (Red turban with gold wraps) */}
          <path
            d="M46 50 Q80 34 114 50 Q116 38 80 24 Q44 38 46 50 Z"
            fill="url(#khanDongGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />
          {/* Golden layers/folds on Khăn Đóng */}
          <path d="M49 44 Q80 30 111 44" stroke="#FBBF24" strokeWidth="2.5" fill="none" />
          <path d="M53 38 Q80 26 107 38" stroke="#FDE68A" strokeWidth="1.5" fill="none" />
          <circle cx="80" cy="34" r="3" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />

          {/* Cheeks: Cute Rosy Blushing circles */}
          <ellipse cx="58" cy="84" rx="7" ry="4.5" fill="#FB7185" opacity="0.65" />
          <ellipse cx="102" cy="84" rx="7" ry="4.5" fill="#FB7185" opacity="0.65" />

          {/* Big Sparkling Anime Eyes */}
          {/* Left Eye */}
          <g>
            <ellipse cx="64" cy="74" rx="6.5" ry="8" fill="#1C1917" />
            <circle cx="62.5" cy="71.5" r="2.8" fill="#FFFFFF" />
            <circle cx="66" cy="76.5" r="1.4" fill="#FFFFFF" />
            {/* Eyelash / Eyebrow */}
            <path d="M57 65 Q64 61 70 64" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
          {/* Right Eye (Happy Winking or Sparkly) */}
          <g>
            <ellipse cx="96" cy="74" rx="6.5" ry="8" fill="#1C1917" />
            <circle cx="94.5" cy="71.5" r="2.8" fill="#FFFFFF" />
            <circle cx="98" cy="76.5" r="1.4" fill="#FFFFFF" />
            {/* Eyelash / Eyebrow */}
            <path d="M90 64 Q96 61 103 65" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* Cute Happy Smile */}
          <path
            d="M74 84 Q80 92 86 84"
            stroke="#991B1B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#DC2626"
          />
          <path d="M77 85 Q80 88 83 85" fill="#FECDD3" />

          {/* Gradients */}
          <defs>
            <linearGradient id="groomAoDaiGrad" x1="50" y1="115" x2="110" y2="190" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DC2626" />
              <stop offset="0.6" stopColor="#B91C1C" />
              <stop offset="1" stopColor="#991B1B" />
            </linearGradient>
            <linearGradient id="khanDongGrad" x1="45" y1="25" x2="115" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DC2626" />
              <stop offset="0.5" stopColor="#B91C1C" />
              <stop offset="1" stopColor="#7F1D1D" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Heart / Sparkle */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], y: [0, -4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute -top-1 -right-1 text-sm pointer-events-none"
        >
          ✨
        </motion.div>
      </motion.div>

      {/* Name Label */}
      <div className={`rounded-full bg-red-950/85 border border-amber-300/70 shadow-md backdrop-blur-xs whitespace-nowrap inline-flex items-center justify-center shrink-0 ${
        compact ? 'mt-1 px-2 py-0.5 max-w-[100px]' : 'mt-1.5 px-3 py-0.5'
      }`}>
        <span className={`font-bold text-amber-200 select-none ${
          compact ? 'text-[8.5px] tracking-tight' : 'text-[10px] sm:text-[11px] tracking-wider'
        }`}>
          Chú Rể Minh Cảnh
        </span>
      </div>
    </div>
  );
};

export const ChibiBride: React.FC<ChibiProps> = ({ onTap, className = '', compact = false }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    "Chuẩn bị bụng đói đi ăn cỗ thật ngon nha! 😋💖",
    "Thanh Nhi rất mong được gặp mọi người ngày vui! 🌸",
    "Lên đồ thật lộng lẫy đến chụp ảnh cùng mình nhé! 👗✨",
    "Nhớ ghé chung vui cùng tụi mình nhé cả nhà! 👰",
  ];

  const handleNextQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
    if (onTap) onTap();
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      <motion.div
        key={quoteIndex}
        initial={{ opacity: 0, y: 4, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        onClick={handleNextQuote}
        className={`relative cursor-pointer group ${compact ? 'mb-1 w-full max-w-[110px]' : 'mb-2'}`}
      >
        <div className={`bg-white/95 text-stone-900 rounded-xl sm:rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] border border-pink-300 font-medium text-center leading-tight overflow-hidden ${
          compact 
            ? 'px-1.5 py-1 w-full text-[8.5px]' 
            : 'px-3 py-1.5 max-w-[150px] sm:max-w-[170px] text-[11px] sm:text-xs'
        }`}>
          <span className={`font-bold text-rose-600 block mb-0.5 truncate ${
            compact ? 'text-[8.5px] tracking-tight' : 'text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap'
          }`}>
            Cô Dâu Thanh Nhi
          </span>
          <p className={`${compact ? 'text-[8px] leading-tight line-clamp-2 text-stone-700 font-normal break-words' : 'text-stone-800'}`}>
            {quotes[quoteIndex]}
          </p>
        </div>
        {/* Little triangle arrow pointing down */}
        <div className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-white/95 mx-auto -mt-[1px] drop-shadow-xs" />
      </motion.div>

      {/* Chibi Figure (SVG) */}
      <motion.div
        animate={{ 
          y: [0, -6, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ 
          duration: 3.2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.3
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextQuote}
        className="relative cursor-pointer filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
      >
        <svg
          viewBox="0 0 160 210"
          className={`${compact ? 'w-14 sm:w-18' : 'w-24 sm:w-28 md:w-32'} h-auto`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow beneath dress */}
          <ellipse cx="80" cy="202" rx="38" ry="6" fill="#000000" opacity="0.3" />

          {/* Long flowing hair behind back */}
          <path
            d="M48 70 Q42 120 45 160 Q54 165 60 160 Q52 120 54 85 Z"
            fill="#1C1917"
          />
          <path
            d="M112 70 Q118 120 115 160 Q106 165 100 160 Q108 120 106 85 Z"
            fill="#1C1917"
          />

          {/* Body: Red Bridal Áo Dài with Gold Trim */}
          {/* White/Ivory Silk Inner Skirt under Ao Dai */}
          <path
            d="M52 155 Q46 188 44 200 Q80 203 116 200 Q114 188 108 155 Z"
            fill="#FEF3C7"
            opacity="0.9"
          />
          {/* Outer Red Silk Áo Dài */}
          <path
            d="M57 115 Q48 150 48 190 Q80 194 112 190 Q112 150 103 115 Z"
            fill="url(#brideAoDaiGrad)"
          />

          {/* Golden Phoenix / Floral Embroidery Pattern */}
          <path
            d="M80 122 Q75 140 68 155 Q80 165 92 155 Q85 140 80 122"
            stroke="#FDE047"
            strokeWidth="1.5"
            fill="#FEF08A"
            fillOpacity="0.2"
          />
          <circle cx="80" cy="142" r="3" fill="#F59E0B" />
          <circle cx="73" cy="150" r="2.5" fill="#F59E0B" />
          <circle cx="87" cy="150" r="2.5" fill="#F59E0B" />

          {/* Golden Wedding Kiềng (Choker necklace) */}
          <ellipse cx="80" cy="115" rx="11" ry="4" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="80" cy="119" r="2" fill="#FEF08A" />

          {/* Right Hand: Waving or Saranghae Mini Heart */}
          <motion.g
            animate={{ rotate: [0, -12, 6, -12, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "60px 122px" }}
          >
            <path
              d="M58 120 Q42 125 36 105 Q42 100 50 108 Q54 115 63 122 Z"
              fill="#DC2626"
            />
            {/* Hand */}
            <circle cx="37" cy="102" r="7" fill="#FED7AA" />
            {/* Cute finger heart floating above hand */}
            <path
              d="M37 92 C37 89 33 87 31 90 C29 93 37 98 37 98 C37 98 45 93 43 90 C41 87 37 89 37 92 Z"
              fill="#F43F5E"
            />
          </motion.g>

          {/* Left Hand: Holding lovely wedding flower bouquet */}
          <g>
            <path
              d="M102 120 Q112 135 106 150 Q100 155 94 148 Q98 136 95 125 Z"
              fill="#DC2626"
            />
            {/* Hand holding flowers */}
            <circle cx="106" cy="150" r="6" fill="#FED7AA" />

            {/* Wedding Bouquet */}
            {/* Green stems & leaves */}
            <ellipse cx="108" cy="155" rx="4" ry="7" fill="#15803D" transform="rotate(25 108 155)" />
            {/* Flowers (Pink & Cream Roses/Lotus) */}
            <circle cx="107" cy="144" r="7" fill="#FB7185" stroke="#F43F5E" strokeWidth="1" />
            <circle cx="114" cy="148" r="6" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="1" />
            <circle cx="101" cy="147" r="5.5" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />
            <circle cx="108" cy="144" r="3" fill="#FFE4E6" />
            {/* Ribbon tie */}
            <path d="M108 152 Q112 162 116 168 M106 153 Q102 162 98 168" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Head & Neck */}
          <rect x="73" y="102" width="14" height="12" rx="4" fill="#FDBA74" />
          {/* Chubby Cute Chibi Face */}
          <ellipse cx="80" cy="74" rx="35" ry="32" fill="#FED7AA" />

          {/* Cute Ears with Pearl Earrings */}
          <ellipse cx="45" cy="76" rx="5" ry="7" fill="#FED7AA" />
          <circle cx="45" cy="83" r="2.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="0.8" />
          
          <ellipse cx="115" cy="76" rx="5" ry="7" fill="#FED7AA" />
          <circle cx="115" cy="83" r="2.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="0.8" />

          {/* Bride Hair: Elegant feminine fringe & side-tendrils */}
          <path
            d="M44 68 Q44 42 80 40 Q116 42 116 68 Q118 80 114 84 Q112 70 106 60 Q92 50 80 52 Q68 50 54 60 Q48 70 46 84 Q42 80 44 68 Z"
            fill="#1E1B18"
          />
          {/* Soft side curls */}
          <path d="M46 80 Q43 95 48 105" stroke="#1E1B18" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M114 80 Q117 95 112 105" stroke="#1E1B18" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Wispy Bangs */}
          <path d="M54 58 Q66 67 76 60 Q85 67 104 58 Q92 52 80 53 Q66 52 54 58 Z" fill="#2D241E" />

          {/* Vietnamese Bridal Mấn / Khăn Đóng (Ornate Golden & Red Headdress) */}
          <path
            d="M44 46 Q80 22 116 46 Q118 32 80 18 Q42 32 44 46 Z"
            fill="url(#brideManGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />
          {/* Golden Floral Ornaments across the Mấn */}
          <path d="M47 41 Q80 24 113 41" stroke="#FDE047" strokeWidth="3" fill="none" />
          <path d="M52 34 Q80 20 108 34" stroke="#FBBF24" strokeWidth="2" fill="none" />
          
          {/* Lotus Flower Jewel at center of Mấn */}
          <circle cx="80" cy="27" r="4.5" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
          <circle cx="80" cy="27" r="2" fill="#EF4444" />
          <circle cx="73" cy="29" r="2.5" fill="#FDE047" />
          <circle cx="87" cy="29" r="2.5" fill="#FDE047" />

          {/* Cheeks: Sweet Pink Blushing */}
          <ellipse cx="58" cy="84" rx="7" ry="5" fill="#FB7185" opacity="0.7" />
          <ellipse cx="102" cy="84" rx="7" ry="5" fill="#FB7185" opacity="0.7" />

          {/* Big Sparkling Anime Eyes with Heart Reflection */}
          {/* Left Eye */}
          <g>
            <ellipse cx="64" cy="74" rx="7" ry="8.5" fill="#1C1917" />
            <circle cx="62" cy="71" r="3" fill="#FFFFFF" />
            <circle cx="66" cy="77" r="1.5" fill="#FFFFFF" />
            {/* Pretty Eyelashes */}
            <path d="M56 65 Q64 60 72 64" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M72 64 L74 61" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* Right Eye */}
          <g>
            <ellipse cx="96" cy="74" rx="7" ry="8.5" fill="#1C1917" />
            <circle cx="94" cy="71" r="3" fill="#FFFFFF" />
            <circle cx="98" cy="77" r="1.5" fill="#FFFFFF" />
            {/* Pretty Eyelashes */}
            <path d="M88 64 Q96 60 104 65" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M104 65 L106 62" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Sweet Smiling Lips */}
          <path
            d="M74 84 Q80 93 86 84"
            stroke="#BE123C"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#FB7185"
          />
          <ellipse cx="80" cy="87" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.6" />

          {/* Gradients */}
          <defs>
            <linearGradient id="brideAoDaiGrad" x1="50" y1="115" x2="110" y2="190" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E11D48" />
              <stop offset="0.6" stopColor="#BE123C" />
              <stop offset="1" stopColor="#9F1239" />
            </linearGradient>
            <linearGradient id="brideManGrad" x1="40" y1="18" x2="120" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E11D48" />
              <stop offset="0.5" stopColor="#BE123C" />
              <stop offset="1" stopColor="#881337" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Heart */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], y: [0, -5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
          className="absolute -top-1 -left-1 text-sm pointer-events-none"
        >
          💖
        </motion.div>
      </motion.div>

      {/* Name Label */}
      <div className={`rounded-full bg-rose-950/85 border border-pink-300/70 shadow-md backdrop-blur-xs whitespace-nowrap inline-flex items-center justify-center shrink-0 ${
        compact ? 'mt-1 px-2 py-0.5 max-w-[100px]' : 'mt-1.5 px-3 py-0.5'
      }`}>
        <span className={`font-bold text-pink-200 select-none ${
          compact ? 'text-[8.5px] tracking-tight' : 'text-[10px] sm:text-[11px] tracking-wider'
        }`}>
          Cô Dâu Thanh Nhi
        </span>
      </div>
    </div>
  );
};
