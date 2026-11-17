import { useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { APPLE_EASE } from '../constants/motion';

export default function Lightbox({ images, currentIndex, onClose, onChangeIndex }) {
  const goPrev = useCallback(() => {
    onChangeIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onChangeIndex]);

  const goNext = useCallback(() => {
    onChangeIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onChangeIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goPrev, goNext]);

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: APPLE_EASE }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-brand-navy/92 backdrop-blur-md" onClick={onClose} />

      <m.button
        whileTap={{ scale: 0.92 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-brand-navy-mid border border-brand-gold/40 text-brand-cream flex items-center justify-center hover:bg-brand-navy transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-light"
        aria-label="Close"
      >
        <X size={20} />
      </m.button>

      {images.length > 1 && (
        <>
          <m.button
            whileTap={{ scale: 0.92 }}
            onClick={goPrev}
            className="absolute left-4 lg:left-8 z-10 w-11 h-11 rounded-full bg-brand-navy-mid border border-brand-gold/40 text-brand-cream flex items-center justify-center hover:bg-brand-navy transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-light"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </m.button>
          <m.button
            whileTap={{ scale: 0.92 }}
            onClick={goNext}
            className="absolute right-4 lg:right-8 z-10 w-11 h-11 rounded-full bg-brand-navy-mid border border-brand-gold/40 text-brand-cream flex items-center justify-center hover:bg-brand-navy transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-light"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </m.button>
        </>
      )}

      <AnimatePresence mode="wait">
        <m.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt=""
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease: APPLE_EASE }}
          className="relative z-10 max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
      </AnimatePresence>
    </m.div>
  );
}
