import confetti from 'canvas-confetti';

/**
 * Gentle, elegant wedding confetti burst - just the right amount of celebratory sparkle
 */
export function triggerWeddingFireworks() {
  // Moderate, refined burst of gold, soft pink and white sparkles
  confetti({
    particleCount: 35,
    spread: 55,
    origin: { y: 0.75 },
    startVelocity: 38,
    decay: 0.92,
    scalar: 0.9,
    colors: ['#f59e0b', '#fbbf24', '#fef08a', '#f43f5e', '#ffffff'],
    disableForReducedMotion: false,
    zIndex: 9999
  });

  // Soft secondary mini-shimmer after a short delay
  setTimeout(() => {
    confetti({
      particleCount: 20,
      angle: 60,
      spread: 45,
      origin: { x: 0.15, y: 0.8 },
      startVelocity: 28,
      decay: 0.93,
      colors: ['#ffd700', '#fb7185', '#ffffff'],
      zIndex: 9999
    });

    confetti({
      particleCount: 20,
      angle: 120,
      spread: 45,
      origin: { x: 0.85, y: 0.8 },
      startVelocity: 28,
      decay: 0.93,
      colors: ['#ffd700', '#fb7185', '#ffffff'],
      zIndex: 9999
    });
  }, 220);
}
