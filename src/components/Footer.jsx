import { weddingData } from '../data/weddingData';
import { ScrollReveal } from './MotionPrimitives';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-cream py-16 px-6 border-t border-brand-gold/20">
      <ScrollReveal className="max-w-[780px] mx-auto text-center">
        <p className="font-serif text-xl text-brand-gold-light mb-2">
          {weddingData.couple.monogram}
        </p>

        <h2 className="font-script text-5xl sm:text-6xl text-brand-cream mb-4">
          {weddingData.couple.partner1} &amp; {weddingData.couple.partner2}
        </h2>

        <p className="text-xs sm:text-sm text-brand-cream/80 mb-2">
          {weddingData.couple.families[0]} &bull; {weddingData.couple.families[1]} &bull; 60th
          Birthday of {weddingData.specialCelebration.honoree}
        </p>

        <p className="text-xs tracking-[0.16em] uppercase text-brand-cream/60 mb-8">
          Saturday, 09 January 2027 &bull; {weddingData.timeDisplay} &bull;{' '}
          {weddingData.venue.name}, Lagos
        </p>

        <div className="border-t border-white/10 pt-6 text-xs text-brand-cream/65">
          Built by {weddingData.credits.builtBy}
        </div>
      </ScrollReveal>
    </footer>
  );
}
