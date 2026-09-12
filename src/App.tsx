import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { RSVPSection } from './components/RSVPSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingPetals } from './components/FloatingPetals';
import { InvitationGate } from './components/InvitationGate';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { SectionTransition } from './components/SectionTransition';
import { weddingAudio } from './components/AudioEngine';
import { WEDDING_CONFIG, GALLERY_PHOTOS, STORY_MILESTONES } from './data/weddingData';
import { loadPrimaryBackground, queueProgressivePreload } from './utils/imageOptimizer';

export default function App() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isInvitationGateActive, setIsInvitationGateActive] = useState(true);
  const [isBgLoaded, setIsBgLoaded] = useState(false);

  // Staged Image Loading Pipeline:
  // Phase 1 (Top Priority): Preload primary background image first.
  // Phase 2 (Progressive Queue): Once background image finishes loading, trickle-load remaining images smoothly.
  useEffect(() => {
    let cancelProgressiveQueue: (() => void) | null = null;
    let delayTimer: ReturnType<typeof setTimeout> | null = null;

    const bgUrl = WEDDING_CONFIG.bgImage || WEDDING_CONFIG.heroImage;

    // Phase 1: High-priority background loading
    loadPrimaryBackground(bgUrl, 2500).then(() => {
      setIsBgLoaded(true);

      // Phase 2: Gentle delayed start for remaining images
      delayTimer = setTimeout(() => {
        // Tier 1: Avatars & QR codes
        const tier1Images = [
          WEDDING_CONFIG.groom.avatar,
          WEDDING_CONFIG.bride.avatar,
          WEDDING_CONFIG.groom.bank.qrCodeUrl,
          WEDDING_CONFIG.bride.bank.qrCodeUrl,
          WEDDING_CONFIG.coupleCoverImage,
        ].filter(Boolean) as string[];

        // Tier 2: Story milestones & Gallery photos
        const tier2Images = [
          ...STORY_MILESTONES.map((s) => s.image),
          ...GALLERY_PHOTOS.map((p) => p.imageUrl),
        ].filter(Boolean) as string[];

        const allRemainingImages = [...tier1Images, ...tier2Images];

        // Controlled progressive background load: 2 images per batch during idle frames
        const queue = queueProgressivePreload(allRemainingImages, {
          batchSize: 2,
          batchDelayMs: 180,
        });

        cancelProgressiveQueue = queue.cancel;
      }, 150);
    });

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (cancelProgressiveQueue) cancelProgressiveQueue();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setIsPlayingMusic(state.isPlaying);
    });

    // Auto-start music on first user interaction if not playing
    const handleFirstUserInteraction = () => {
      if (!weddingAudio.getStatus()) {
        weddingAudio.play();
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      unsubscribe();
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, []);

  const toggleMusic = () => {
    weddingAudio.toggle();
  };

  const handleOpenInvitationGate = () => {
    setIsInvitationGateActive(true);
  };

  const handleCloseInvitationGate = () => {
    setIsInvitationGateActive(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#FEFCF7]/95 text-stone-800 flex flex-col relative selection:bg-amber-300 selection:text-stone-900 pb-16 sm:pb-0">
      {/* Fixed Fullscreen Background with Elegant Royal Champagne Gradient and Optional Couple Photo */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-gradient-to-br from-[#FAF6EE] via-[#F4EDE0] to-[#EAE0D0]">
        <img
          src={WEDDING_CONFIG.bgImage || WEDDING_CONFIG.heroImage}
          onError={(e) => {
            const fallback = "/assets/aistudio/hero_bg_clean_1920.webp";
            if (e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          onLoad={() => setIsBgLoaded(true)}
          alt="Hình Nền Đám Cưới Minh Cảnh & Thanh Nhi"
          className={`w-full h-full object-cover object-center brightness-105 contrast-[1.02] filter blur-[0.5px] transition-opacity duration-700 ease-out ${
            isBgLoaded ? 'opacity-80' : 'opacity-0'
          }`}
        />
        {/* Subtle luminous warm scrim for perfect legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-transparent to-stone-950/40" />
      </div>

      {/* 1. Interactive Royal Wedding Invitation Gate (Thiệp Mời Trực Quan Đầu Tiên) */}
      {isInvitationGateActive && (
        <InvitationGate onOpen={handleCloseInvitationGate} />
      )}

      {/* Gentle Floating Rose Petals Animation */}
      <FloatingPetals />

      {/* Luxury Navigation Bar */}
      <Navbar
        isPlaying={isPlayingMusic}
        toggleMusic={toggleMusic}
        onOpenInvitation={handleOpenInvitationGate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section: Romantic Welcome */}
        <HeroSection 
          onOpenInvitation={handleOpenInvitationGate}
        />

        {/* Transition 1: Lotus Glow */}
        <SectionTransition variant="lotus-glow" className="bg-gradient-to-b from-stone-950/80 via-[#FEFDF9] to-[#FEFDF9]" />

        {/* 2. Wedding Countdown Section */}
        <CountdownSection />

        {/* Transition 2: Gold Crest Ribbon */}
        <SectionTransition variant="gold-crest" className="bg-[#FEFDF9]" />

        {/* 3. The Wedding Events: Lễ Thành Hôn & Tiệc Cưới */}
        <EventsSection />

        {/* Transition 3: Double Hairline */}
        <SectionTransition variant="double-hairline" className="bg-gradient-to-b from-[#FEFDF9] to-[#FEFCF7]" />

        {/* 4. Photo Gallery with Lightbox */}
        <GallerySection />

        {/* Transition 4: Lotus Glow */}
        <SectionTransition variant="lotus-glow" className="bg-gradient-to-b from-[#FEFCF7] to-[#FEFCF6]" />

        {/* 5. RSVP Form & Digital Guestbook */}
        <RSVPSection />

        {/* Transition 5: Gold Crest Ribbon */}
        <SectionTransition variant="gold-crest" className="bg-[#FEFCF6]" />

        {/* 6. FAQs: Dresscode palette, parking, queries */}
        <FAQSection />

        {/* Transition 6: Double Hairline */}
        <SectionTransition variant="double-hairline" className="bg-gradient-to-b from-[#FEFCF6] to-stone-900" />
      </main>

      {/* Footer: Sincere Gratitude & Hotlines */}
      <Footer />

      {/* Floating Bottom Quick Action Bar for Mobile Phones */}
      <FloatingMobileBar
        isPlaying={isPlayingMusic}
        toggleMusic={toggleMusic}
        onOpenInvitation={handleOpenInvitationGate}
      />

      {/* Floating Background Music Badge & Quick Controls for Desktop/Tablet */}
      <FloatingMusicPlayer />
    </div>
  );
}
