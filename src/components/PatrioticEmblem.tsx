import React from 'react';

/**
 * Blooming Lotus (Hoa Sen Thanh Cao) - Luxury Gold & Rose Vector with Radiant Halo
 */
export const GoldenLotusIcon: React.FC<{
  size?: number;
  className?: string;
  showAura?: boolean;
}> = ({
  size = 28,
  className = '',
  showAura = false,
}) => {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Optional Radiant Sunburst Aura */}
      {showAura && (
        <svg
          width={size * 1.5}
          height={size * 1.5}
          viewBox="0 0 100 100"
          className="absolute -z-10 animate-lotus-aura pointer-events-none opacity-60"
        >
          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#lotusAuraGrad)" strokeWidth="1" strokeDasharray="3 3" />
          <defs>
            <radialGradient id="lotusAuraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block shrink-0 animate-lotus-glow"
      >
        <defs>
          <linearGradient id={`lotusGold-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id={`lotusPetalPink-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="45%" stopColor="#FDA4AF" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
          <filter id={`goldShine-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#FDE047" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Outer Base Lotus Leaves / Petals */}
        <path
          d="M50 86 C24 86 8 72 4 54 C18 50 36 60 50 86 Z"
          fill={`url(#lotusGold-${uniqueId})`}
          opacity="0.92"
        />
        <path
          d="M50 86 C76 86 92 72 96 54 C82 50 64 60 50 86 Z"
          fill={`url(#lotusGold-${uniqueId})`}
          opacity="0.92"
        />

        {/* Lateral intermediate petals */}
        <path
          d="M50 80 C18 70 10 38 20 22 C32 38 42 62 50 80 Z"
          fill={`url(#lotusPetalPink-${uniqueId})`}
          stroke={`url(#lotusGold-${uniqueId})`}
          strokeWidth="1.6"
        />
        <path
          d="M50 80 C82 70 90 38 80 22 C68 38 58 62 50 80 Z"
          fill={`url(#lotusPetalPink-${uniqueId})`}
          stroke={`url(#lotusGold-${uniqueId})`}
          strokeWidth="1.6"
        />

        {/* Inner high-blossom central petal */}
        <path
          d="M50 78 C32 58 28 26 50 6 C72 26 68 58 50 78 Z"
          fill={`url(#lotusPetalPink-${uniqueId})`}
          stroke={`url(#lotusGold-${uniqueId})`}
          strokeWidth="2"
        />

        {/* Lotus Sacred Central Stamen & Veins */}
        <path
          d="M50 16 Q50 48 50 72"
          stroke={`url(#lotusGold-${uniqueId})`}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="50" cy="74" r="4.5" fill={`url(#lotusGold-${uniqueId})`} filter={`url(#goldShine-${uniqueId})`} />
        <circle cx="50" cy="18" r="2" fill="#FEF08A" filter={`url(#goldShine-${uniqueId})`} />
      </svg>
    </div>
  );
};

/**
 * Waving Vietnamese Flag (Cờ Đỏ Sao Vàng Tung Bay)
 */
export const WavingVietnameseFlag: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  showPole?: boolean;
}> = ({ width = 48, height = 32, className = '', showPole = true }) => {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {showPole && (
        /* Golden Flagpole */
        <div className="flex flex-col items-center mr-0.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-200 to-amber-500 shadow-xs" />
          <div className="w-[3px] h-[38px] bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 rounded-b shadow-sm" />
        </div>
      )}

      {/* Animated Waving Silk Flag */}
      <div className="animate-wave-flag relative overflow-hidden rounded-xs shadow-md border border-amber-400/50">
        <svg
          width={width}
          height={height}
          viewBox="0 0 60 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`flagSilk-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="25%" stopColor="#DC2626" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="75%" stopColor="#B91C1C" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            <linearGradient id={`silkHighlight-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
            </linearGradient>
            <filter id={`goldGlow-${uniqueId}`} x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#FEF08A" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Crimson Red Silk Flag Body */}
          <rect width="60" height="40" fill={`url(#flagSilk-${uniqueId})`} />
          <rect width="60" height="40" fill={`url(#silkHighlight-${uniqueId})`} />

          {/* Gold Fringe / Viền Hoàng Gia */}
          <line x1="0" y1="0" x2="60" y2="0" stroke="#FDE047" strokeWidth="1" opacity="0.75" />
          <line x1="0" y1="40" x2="60" y2="40" stroke="#FDE047" strokeWidth="1" opacity="0.75" />
          <line x1="60" y1="0" x2="60" y2="40" stroke="#FDE047" strokeWidth="1" opacity="0.75" />

          {/* Golden 5-pointed Star */}
          <polygon
            points="30,8 33.6,19 45,19 35.7,26 39.3,37 30,30.2 20.7,37 24.3,26 15,19 26.4,19"
            fill="#FACC15"
            stroke="#FEF08A"
            strokeWidth="0.8"
            filter={`url(#goldGlow-${uniqueId})`}
          />
        </svg>
      </div>
    </div>
  );
};

/**
 * Stylized Flag Ribbon / Dải Lụa Sao Vàng Cờ Đỏ
 * Elegant curved ribbon drape with golden tassels and central star
 */
export const StylizedFlagRibbon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  flip?: boolean;
}> = ({ width = 64, height = 40, className = '', flip = false }) => {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div
      className={`relative inline-block animate-flag-gentle shrink-0 ${className} ${
        flip ? '-scale-x-100' : ''
      }`}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-md"
      >
        <defs>
          <linearGradient id={`ribbonRed-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="35%" stopColor="#DC2626" />
            <stop offset="70%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id={`ribbonGold-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>

        {/* Waving Ribbon Tail & Body */}
        <path
          d="M0 10 C30 5, 55 25, 80 15 C90 12, 98 18, 100 24 C85 30, 60 18, 35 34 C18 42, 6 32, 0 26 Z"
          fill={`url(#ribbonRed-${uniqueId})`}
          stroke={`url(#ribbonGold-${uniqueId})`}
          strokeWidth="1.2"
        />

        {/* Gold Trim Piping */}
        <path
          d="M0 10 C30 5, 55 25, 80 15 C90 12, 98 18, 100 24"
          stroke={`url(#ribbonGold-${uniqueId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Gold Star positioned gracefully on ribbon */}
        <polygon
          points="45,14 47,21 54,21 48,25 50,32 45,28 40,32 42,25 36,21 43,21"
          fill="#FACC15"
          stroke="#FEF08A"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
};

/**
 * Traditional Vietnamese Corner Ornament (Họa Tiết Góc Hoa Sen & Cờ Đỏ Hoàng Gia)
 * Gracefully frames section corners with golden flourishes, lotus blossom, and waving flag accents
 */
export const TraditionalCornerEmblem: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  variant?: 'lotus-only' | 'flag-and-lotus' | 'luxury-brass';
}> = ({ position, className = '', variant = 'flag-and-lotus' }) => {
  const posClasses = {
    'top-left': 'top-2 left-2 sm:top-4 sm:left-4',
    'top-right': 'top-2 right-2 sm:top-4 sm:right-4',
    'bottom-left': 'bottom-2 left-2 sm:bottom-4 sm:left-4',
    'bottom-right': 'bottom-2 right-2 sm:bottom-4 sm:right-4',
  }[position];

  const rotationClass = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  }[position];

  return (
    <div
      className={`absolute z-10 pointer-events-none ${posClasses} ${className}`}
      aria-hidden="true"
    >
      <div className={`flex items-center gap-1.5 ${rotationClass} transition-all duration-700`}>
        {/* Intricate Corner Gold Line Filigree */}
        <svg width="68" height="68" viewBox="0 0 80 80" fill="none" className="overflow-visible">
          <defs>
            <linearGradient id="cornerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          {/* Outer Corner Framing Lines */}
          <path
            d="M 2 45 L 2 12 Q 2 2 12 2 L 45 2"
            stroke="url(#cornerGoldGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Inner Parallel Filigree Line */}
          <path
            d="M 8 36 L 8 16 Q 8 8 16 8 L 36 8"
            stroke="url(#cornerGoldGrad)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Traditional Cloud Scroll (Vân) */}
          <path
            d="M 12 2 C 16 6, 20 6, 24 2 Q 28 6 32 2"
            stroke="url(#cornerGoldGrad)"
            strokeWidth="1"
            opacity="0.75"
          />
          <path
            d="M 2 12 C 6 16, 6 20, 2 24 Q 6 28 2 32"
            stroke="url(#cornerGoldGrad)"
            strokeWidth="1"
            opacity="0.75"
          />
          {/* Corner Vertex Point / Dot */}
          <circle cx="2" cy="2" r="3" fill="#FACC15" />
        </svg>

        {/* Floating Lotus and Stylized Flag inside the corner frame */}
        <div className="absolute top-2 left-2 flex items-center gap-1 -translate-x-1 -translate-y-1">
          <GoldenLotusIcon size={24} className="animate-lotus-glow" showAura={true} />
          {variant === 'flag-and-lotus' && (
            <div className="animate-flag-gentle -ml-1">
              <StylizedFlagRibbon width={36} height={22} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable Section Corner Decorations helper
 */
export const SectionCornerDecorations: React.FC<{
  corners?: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
  variant?: 'lotus-only' | 'flag-and-lotus' | 'luxury-brass';
  className?: string;
}> = () => {
  return null;
};

/**
 * Patriotic Couple Wedding Banner
 */
export const PatrioticWeddingBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950/85 via-red-900/90 to-red-950/85 border border-amber-400/60 shadow-lg backdrop-blur-md text-amber-200 text-xs font-semibold ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <WavingVietnameseFlag width={22} height={14} showPole={false} />
        <GoldenLotusIcon size={18} className="animate-lotus-glow" />
      </div>
      <span className="tracking-wide uppercase font-heading text-[11px] sm:text-xs text-amber-200">
        Tình Yêu Non Sông Việt Nam
      </span>
      <div className="flex items-center gap-1.5">
        <GoldenLotusIcon size={18} className="animate-lotus-glow" />
        <WavingVietnameseFlag width={22} height={14} showPole={false} />
      </div>
    </div>
  );
};
