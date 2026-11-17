import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import Lightbox from './Lightbox';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';
import { APPLE_EASE } from '../constants/motion';

export default function AttireAndSouvenir() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = [
    ...weddingData.asoEbi.map((i) => i.image),
    ...weddingData.souvenirs.map((s) => s.image),
  ];

  const openImage = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <section
      id="attire"
      className="py-20 lg:py-28 px-6 bg-white border-b border-brand-border"
      style={{ scrollMarginTop: '72px' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-gold-deep mb-3">02 / A day in colour</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">
            Colours of the Day, Aso Ebi &amp; Souvenirs
          </h2>
          <p className="text-brand-muted text-sm sm:text-base">
            Sky Blue, Gold, and Navy Blue
          </p>
        </ScrollReveal>

        {/* Colour of the Day Swatches */}
        <StaggerGroup
          stagger={0.08}
          className="grid grid-cols-3 gap-4 sm:gap-6 mb-16 max-w-[780px] mx-auto"
        >
          {weddingData.colours.map((colour) => (
            <StaggerItem key={colour.name}>
              <m.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: APPLE_EASE }}
                className="rounded-xl h-[100px] sm:h-[120px] flex items-center justify-center border border-black/10 px-3 text-center shadow-[0_6px_20px_rgba(11,28,58,0.06)]"
                style={{ backgroundColor: colour.swatch, color: colour.textColor }}
              >
                <span className="font-serif text-xl sm:text-2xl font-semibold">{colour.name}</span>
              </m.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Official Aso Ebi Clothes */}
        <div className="mb-16">
          <ScrollReveal>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6 text-center">
              Aso Ebi Attire
            </h3>
          </ScrollReveal>

          <StaggerGroup stagger={0.07} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingData.asoEbi.map((item, idx) => (
              <StaggerItem key={item.label}>
                <m.button
                  type="button"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.28, ease: APPLE_EASE }}
                  onClick={() => openImage(idx)}
                  className="w-full text-left group bg-brand-sky-wash border border-brand-border rounded-2xl overflow-hidden hover:border-brand-gold transition-colors cursor-pointer shadow-[0_6px_20px_rgba(11,28,58,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-white">
                    <img
                      src={item.image}
                      alt={`${item.label} — ${item.subtitle}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-serif text-xl text-brand-navy">{item.label}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{item.subtitle}</p>
                  </div>
                </m.button>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* Wedding Souvenirs (Women, Men, Aso Ebi Bag & General Guests) */}
        <div>
          <ScrollReveal>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6 text-center">
              Wedding Souvenirs
            </h3>
          </ScrollReveal>

          <StaggerGroup stagger={0.07} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingData.souvenirs.map((souvenir, idx) => (
              <StaggerItem key={souvenir.label}>
                <m.button
                  type="button"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.28, ease: APPLE_EASE }}
                  onClick={() => openImage(weddingData.asoEbi.length + idx)}
                  className="w-full text-left group bg-brand-sky-wash border border-brand-border rounded-2xl overflow-hidden hover:border-brand-gold transition-colors cursor-pointer shadow-[0_6px_20px_rgba(11,28,58,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy h-full flex flex-col"
                >
                  <div className="aspect-square overflow-hidden bg-white">
                    <img
                      src={souvenir.image}
                      alt={`${souvenir.label} — ${souvenir.subtitle}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex-1">
                    <p className="font-serif text-xl text-brand-navy">{souvenir.label}</p>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                      {souvenir.subtitle}
                    </p>
                  </div>
                </m.button>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={allImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onChangeIndex={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
