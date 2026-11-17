import { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { APPLE_EASE } from '../constants/motion';

const SLIDE_INTERVAL_MS = 5500;

export default function Hero() {
  const heroRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = weddingData.gallery;
  const currentSlide = slides[activeIndex];

  // Reset timer whenever the user manually switches slides
  useEffect(() => {
    if (prefersReduced || slides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((idx) => (idx + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [prefersReduced, slides.length, activeIndex]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Subtle GPU-only depth parallax on scroll (disabled for reduced motion)
  const photoY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 56]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.78], prefersReduced ? [1, 1] : [1, 0.15]);
  const textY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 28]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={heroRef}
      id="welcome"
      className="relative min-h-[92vh] sm:min-h-screen pt-[72px] flex items-end overflow-hidden bg-brand-navy text-brand-cream"
    >
      {/* Crossfading Full-Bleed Couple Photographs anchored below the 72px header */}
      <m.div
        style={{ y: photoY }}
        className="absolute inset-x-0 bottom-0 top-[72px] will-change-transform overflow-hidden"
        aria-live="off"
      >
        <AnimatePresence initial={false} mode="sync">
          <m.div
            key={currentSlide.src}
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: APPLE_EASE },
              scale: { duration: 5.5, ease: APPLE_EASE },
            }}
            className="absolute inset-0 will-change-transform"
          >
            <img
              src={currentSlide.src}
              alt={currentSlide.alt}
              style={{ objectPosition: currentSlide.position || '50% 15%' }}
              className="w-full h-full object-cover"
            />
          </m.div>
        </AnimatePresence>
      </m.div>

      {/* Bottom-weighted scrim so all 4 photos stay vivid behind overlayed copy */}
      <div
        className="absolute inset-x-0 bottom-0 top-[72px] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(7, 18, 38, 0.98) 0%, rgba(7, 18, 38, 0.76) 28%, rgba(7, 18, 38, 0.16) 60%, rgba(7, 18, 38, 0.22) 100%)',
        }}
      />

      {/* Wedding Announcement Overlayed Over Changing Photos */}
      <m.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 max-w-[1040px] mx-auto px-5 sm:px-8 pb-8 sm:pb-12 pt-44 sm:pt-56 w-full text-center will-change-transform"
      >
        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: APPLE_EASE }}
          className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-brand-gold-light mb-1.5"
        >
          {weddingData.couple.families[0]} &amp; {weddingData.couple.families[1]}
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: APPLE_EASE }}
          className="font-script text-5xl sm:text-7xl lg:text-[5.25rem] text-brand-cream mb-2 leading-[1.05] drop-shadow-sm"
        >
          {weddingData.couple.partner1} &amp; {weddingData.couple.partner2}
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38, ease: APPLE_EASE }}
          className="font-serif italic text-base sm:text-xl text-brand-gold-light mb-2"
        >
          {weddingData.couple.ceremonyType} &bull; {weddingData.specialCelebration.milestone} of{' '}
          {weddingData.specialCelebration.honoree}
        </m.p>

        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.48, ease: APPLE_EASE }}
          className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-brand-cream/90 mb-5"
        >
          Saturday, 09 January 2027 &bull; {weddingData.timeDisplay} &bull;{' '}
          {weddingData.venue.name}, Magodo, Lagos
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.58, ease: APPLE_EASE }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6"
        >
          <m.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('rsvp')}
            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-brand-gold-light text-brand-navy text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase hover:brightness-105 transition-all cursor-pointer"
          >
            Kindly RSVP
          </m.button>
          <m.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('attire')}
            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-brand-cream/65 bg-brand-navy/55 backdrop-blur-sm text-brand-cream text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase hover:bg-brand-navy/80 transition-all cursor-pointer"
          >
            Aso Ebi &amp; Souvenir
          </m.button>
        </m.div>

        {/* Subtle Hero Photo Switcher Dots */}
        <div className="flex items-center justify-center gap-1" role="group" aria-label="Couple hero photos">
          {slides.map((slide, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show couple photo ${idx + 1} of ${slides.length}`}
                aria-pressed={isCurrent}
                className="p-2 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-light rounded-full"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    isCurrent ? 'w-6 bg-brand-gold-light' : 'w-1.5 bg-brand-cream/45 hover:bg-brand-cream/80'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </m.div>
    </section>
  );
}
