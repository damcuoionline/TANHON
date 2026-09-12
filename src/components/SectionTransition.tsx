import React from 'react';
import { motion } from 'motion/react';
import { GoldenLotusIcon } from './PatrioticEmblem';
import { Heart, Sparkles } from 'lucide-react';

interface SectionTransitionProps {
  variant?: 'gold-crest' | 'lotus-glow' | 'curved-wave' | 'double-hairline';
  className?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  variant = 'gold-crest',
  className = '',
}) => {
  if (variant === 'curved-wave') {
    return (
      <div className={`relative w-full overflow-hidden leading-none py-2 pointer-events-none select-none ${className}`}>
        <div className="w-full flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
        </div>
      </div>
    );
  }

  if (variant === 'lotus-glow') {
    return (
      <div className={`relative w-full py-6 sm:py-8 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
        {/* Left Gradient Gold Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-300/60 to-amber-400" />
        
        {/* Center Lotus Emblem with Subtle Pulse */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-4 sm:mx-6 relative flex items-center justify-center"
        >
          <div className="absolute w-10 h-10 rounded-full bg-amber-400/15 blur-md animate-pulse" />
          <div className="p-2 rounded-full bg-stone-900/40 border border-amber-300/50 backdrop-blur-xs shadow-md">
            <GoldenLotusIcon size={24} className="animate-lotus-glow" />
          </div>
        </motion.div>

        {/* Right Gradient Gold Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-amber-300/60 to-amber-400" />
      </div>
    );
  }

  if (variant === 'double-hairline') {
    return (
      <div className={`relative w-full py-4 sm:py-6 flex flex-col items-center justify-center gap-1.5 pointer-events-none select-none ${className}`}>
        <div className="w-48 sm:w-72 h-[1px] bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
        <div className="flex items-center gap-2 text-amber-500">
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
          <div className="w-2 h-2 rotate-45 border border-amber-400 bg-amber-200/50" />
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
        </div>
        <div className="w-32 sm:w-48 h-[1px] bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
      </div>
    );
  }

  // Default: gold-crest (Romantic Double Ribbon with Heart & Lotus)
  return (
    <div className={`relative w-full py-6 sm:py-8 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Ambient Glow Aura */}
      <div className="absolute w-40 sm:w-64 h-8 bg-amber-400/10 blur-xl rounded-full" />
      
      {/* Left Hairline */}
      <div className="flex-1 min-w-2 sm:min-w-8 max-w-xs sm:max-w-md h-[1px] bg-gradient-to-r from-transparent via-amber-300/60 to-amber-400/90" />
      
      {/* Center Crest */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-1.5 sm:mx-4 flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-full bg-stone-900/40 border border-amber-300/50 backdrop-blur-xs shadow-xs max-w-[92vw] shrink-0 text-center"
      >
        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 hidden sm:block shrink-0" />
        <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400 fill-rose-400 animate-pulse shrink-0" />
        <span className="text-[9.5px] sm:text-xs font-heading uppercase tracking-normal sm:tracking-widest text-amber-200/95 font-medium whitespace-nowrap">
          <span className="sm:hidden">Minh Cảnh & Thanh Nhi</span>
          <span className="hidden sm:inline">Trương Minh Cảnh & Nguyễn Đàm Thanh Nhi</span>
        </span>
        <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400 fill-rose-400 animate-pulse shrink-0" />
        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 hidden sm:block shrink-0" />
      </motion.div>

      {/* Right Hairline */}
      <div className="flex-1 min-w-2 sm:min-w-8 max-w-xs sm:max-w-md h-[1px] bg-gradient-to-l from-transparent via-amber-300/60 to-amber-400/90" />
    </div>
  );
};
