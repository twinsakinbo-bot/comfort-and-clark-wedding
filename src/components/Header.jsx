import { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { APPLE_EASE } from '../constants/motion';

const navItems = [
  { id: 'welcome', label: 'Home' },
  { id: 'details', label: 'Details' },
  { id: 'attire', label: 'Attire & Souvenir' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('welcome');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const threshold = Math.max(180, window.innerHeight * 0.4);
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

      if (nearBottom) {
        setActiveSection('rsvp');
        return;
      }

      const sections = navItems.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: el.getBoundingClientRect().top };
      });

      const current = sections.reduce(
        (closest, section) => {
          if (section.top <= threshold && section.top > closest.top) return section;
          return closest;
        },
        { id: 'welcome', top: -Infinity }
      );

      if (current.id) setActiveSection(current.id);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b ${
        scrolled
          ? 'bg-brand-navy/88 backdrop-blur-xl saturate-150 border-white/10 shadow-[0_8px_32px_rgba(11,28,58,0.18)]'
          : 'bg-brand-navy/95 backdrop-blur-md border-brand-gold/20'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between h-[72px]">
        <button
          onClick={() => scrollTo('welcome')}
          className="font-serif text-xl sm:text-2xl text-brand-cream tracking-wide flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-light rounded-md px-1"
        >
          <span className="text-brand-gold-light font-semibold">{weddingData.couple.monogram}</span>
          <span className="text-brand-cream/30 text-base font-light">|</span>
          <span className="text-sm sm:text-base text-brand-cream/90">
            {weddingData.couple.partner1} &amp; {weddingData.couple.partner2}
          </span>
        </button>

        {/* Desktop Nav with Apple-style sliding indicator */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative text-xs tracking-[0.14em] uppercase transition-colors py-1.5 px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-light rounded ${
                  isActive ? 'text-brand-gold-light' : 'text-brand-cream/75 hover:text-brand-cream'
                }`}
              >
                {item.label}
                {isActive && (
                  <m.span
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-brand-gold-light rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Quick RSVP + Menu */}
        <div className="md:hidden flex items-center gap-3">
          <m.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('rsvp')}
            className="px-4 py-1.5 rounded-full bg-brand-gold-light text-brand-navy text-[11px] font-semibold tracking-wider uppercase"
          >
            RSVP
          </m.button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-light"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-brand-cream transition-transform duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-brand-cream transition-opacity duration-200 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-brand-cream transition-transform duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: APPLE_EASE }}
            className="md:hidden bg-brand-navy/95 backdrop-blur-xl border-t border-brand-gold/15 px-6 py-4"
          >
            <nav className="flex flex-col items-center gap-3" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-xs tracking-[0.16em] uppercase py-1.5 ${
                    activeSection === item.id
                      ? 'text-brand-gold-light font-semibold'
                      : 'text-brand-cream/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
