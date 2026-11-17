import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import Lightbox from './Lightbox';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';
import { APPLE_EASE } from '../constants/motion';

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const imageSources = weddingData.gallery.map((item) => item.src);

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 px-6 bg-brand-sky-wash border-b border-brand-border"
      style={{ scrollMarginTop: '72px' }}
    >
      <div className="max-w-[1040px] mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">
            {weddingData.couple.partner1} &amp; {weddingData.couple.partner2}
          </h2>
          <p className="text-brand-muted text-sm sm:text-base">
            Engagement Photographs &bull; {weddingData.couple.hashtag}
          </p>
        </ScrollReveal>

        <StaggerGroup stagger={0.09} className="grid sm:grid-cols-2 gap-6">
          {weddingData.gallery.map((photo, i) => (
            <StaggerItem key={photo.src}>
              <m.button
                type="button"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.28, ease: APPLE_EASE }}
                onClick={() => {
                  setLightboxIndex(i);
                  setLightboxOpen(true);
                }}
                className="w-full rounded-2xl overflow-hidden cursor-pointer group aspect-[4/5] bg-brand-navy border border-brand-border shadow-[0_10px_28px_rgba(11,28,58,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
                aria-label={`Open couple photo ${i + 1}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </m.button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={imageSources}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onChangeIndex={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
