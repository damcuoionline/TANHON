import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

export type RevealDirection = 
  | 'up' 
  | 'down' 
  | 'left' 
  | 'right' 
  | 'zoom' 
  | 'fly-left' 
  | 'fly-right' 
  | 'fly-up' 
  | 'fly-down' 
  | 'zoom-blur'
  | 'rotate-in'
  | 'none';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  blurAmount?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 24,
  className = '',
  once = true,
  ...rest
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, scale: 0.99 };
      case 'down':
        return { opacity: 0, y: -distance, scale: 0.99 };
      case 'left':
        return { opacity: 0, x: distance, scale: 0.99 };
      case 'right':
        return { opacity: 0, x: -distance, scale: 0.99 };
      case 'zoom':
        return { opacity: 0, scale: 0.93 };
      case 'fly-left':
        return { opacity: 0, x: distance * 1.2, y: 10, scale: 0.97 };
      case 'fly-right':
        return { opacity: 0, x: -distance * 1.2, y: 10, scale: 0.97 };
      case 'fly-up':
        return { opacity: 0, y: distance * 1.3, scale: 0.97 };
      case 'fly-down':
        return { opacity: 0, y: -distance * 1.3, scale: 0.97 };
      case 'zoom-blur':
        return { opacity: 0, scale: 0.92 };
      case 'rotate-in':
        return { opacity: 0, y: distance, rotate: -1.8, scale: 0.97 };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'up':
      case 'down':
      case 'fly-up':
      case 'fly-down':
        return { opacity: 1, y: 0, scale: 1 };
      case 'left':
      case 'right':
      case 'fly-left':
      case 'fly-right':
        return { opacity: 1, x: 0, y: 0, scale: 1 };
      case 'zoom':
      case 'zoom-blur':
        return { opacity: 1, scale: 1, y: 0 };
      case 'rotate-in':
        return { opacity: 1, y: 0, rotate: 0, scale: 1 };
      case 'none':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ 
        once, 
        amount: 0.08,
        margin: "0px 0px -30px 0px",
      }}
      transition={{
        duration: Math.max(duration, 0.55),
        delay: Math.min(delay, 0.25),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-[transform,opacity] ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
