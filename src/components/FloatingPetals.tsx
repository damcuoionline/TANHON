import React, { useState, useEffect } from 'react';
import { Sparkles, Flag } from 'lucide-react';

interface FloatingElement {
  id: number;
  type: 'sparkle' | 'flag';
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export const FloatingPetals: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate 8 subtle floating elements: Soft gold sparkles & rare mini VN flag
    const newItems: FloatingElement[] = Array.from({ length: 8 }).map((_, i) => {
      const type: 'sparkle' | 'flag' = i === 0 ? 'flag' : 'sparkle';
      return {
        id: i,
        type,
        left: Math.random() * 90 + 5, // 5% to 95%
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 14, // 14s to 22s (very slow and gentle)
        size: type === 'flag' ? 18 : Math.random() * 4 + 8,
        rotation: Math.random() * 360,
      };
    });
    setElements(newItems);
  }, []);

  if (!enabled) {
    return (
      <button
        onClick={() => setEnabled(true)}
        className="fixed bottom-4 left-4 z-30 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-amber-200 text-stone-700 hover:text-red-700 transition-all text-xs flex items-center gap-1.5 cursor-pointer hover:scale-105"
        title="Bật hiệu ứng ánh sáng lung linh"
      >
        <span className="text-xs">✨</span>
        <span className="text-[11px] font-semibold text-red-900 hidden sm:inline">Hiệu Ứng Lung Linh</span>
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
        {elements.map((item) => (
          <div
            key={item.id}
            className="absolute top-[-50px] pointer-events-none transition-all"
            style={{
              left: `${item.left}%`,
              animation: `floatPetal ${item.duration}s linear infinite`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.type === 'flag' && (
              /* Miniature Fluttering Vietnamese National Flag */
              <div 
                className="animate-wave-flag drop-shadow-xs opacity-50 hover:opacity-85"
                style={{ transform: `rotate(${item.rotation % 25 - 12}deg)` }}
              >
                <svg width={item.size} height={item.size * 0.67} viewBox="0 0 30 20" fill="none">
                  {/* Flag red background with subtle fabric shading */}
                  <rect width="30" height="20" rx="1.5" fill="#DA251D" />
                  <rect width="30" height="20" rx="1.5" fill="url(#flag-gradient)" fillOpacity="0.15" />
                  {/* Gold 5-point star */}
                  <polygon
                    points="15,4 16.8,9.5 22.5,9.5 17.8,13 19.6,18.5 15,15.1 10.4,18.5 12.2,13 7.5,9.5 13.2,9.5"
                    fill="#FFEB3B"
                    stroke="#FBC02D"
                    strokeWidth="0.3"
                  />
                  <defs>
                    <linearGradient id="flag-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#000000" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}

            {item.type === 'sparkle' && (
              /* Golden Star Sparkle */
              <div 
                className="opacity-45 animate-pulse"
                style={{ transform: `scale(${item.size / 15})` }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                    fill="#FBBF24"
                    stroke="#F59E0B"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating control to toggle petals */}
      <button
        onClick={() => setEnabled(false)}
        className="fixed bottom-4 left-4 z-30 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-xs border border-amber-200/80 text-stone-600 hover:text-stone-900 transition-all text-xs flex items-center gap-1.5 opacity-65 hover:opacity-100 cursor-pointer"
        title="Tắt hiệu ứng sen & cờ bay"
      >
        <span className="text-xs">🌸</span>
        <span className="text-[10px] font-medium hidden sm:inline">Ẩn Hiệu Ứng</span>
      </button>
    </>
  );
};
