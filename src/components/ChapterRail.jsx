import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const chapters = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'details', label: 'The day' },
  { id: 'attire', label: 'Attire' },
  { id: 'gallery', label: 'Our story' },
  { id: 'rsvp', label: 'RSVP' },
];

export default function ChapterRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.42;
        let current = 0;
        chapters.forEach((chapter, index) => {
          const top = document.getElementById(chapter.id)?.getBoundingClientRect().top;
          if (top !== undefined && top <= threshold) current = index;
        });
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <nav
      aria-label="Page chapters"
      className="chapter-rail fixed right-3 2xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2 rounded-full border border-white/20 bg-brand-navy/90 px-2.5 py-4 text-brand-cream shadow-[0_15px_40px_rgba(11,28,58,0.22)] backdrop-blur-xl"
    >
      <span className="text-[10px] tracking-[0.08em] text-brand-gold-light tabular-nums" aria-hidden="true">
        {String(active + 1).padStart(2, '0')}
      </span>
      <div className="h-9 w-px bg-gradient-to-b from-brand-gold-light/80 to-white/15" aria-hidden="true" />
      {chapters.map((chapter, index) => (
        <button
          key={chapter.id}
          type="button"
          onClick={() => document.getElementById(chapter.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
          aria-label={`Go to ${chapter.label}`}
          aria-current={active === index ? 'location' : undefined}
          title={chapter.label}
          className="group relative grid h-8 w-8 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-light"
        >
          <span className={`rounded-full transition-all duration-300 ${active === index ? 'h-2.5 w-2.5 bg-brand-gold-light shadow-[0_0_0_5px_rgba(226,192,107,0.18)]' : 'h-1.5 w-1.5 bg-white/50 group-hover:bg-white'}`} />
          <span className="pointer-events-none absolute right-full mr-4 flex items-center gap-1 whitespace-nowrap rounded-full bg-brand-navy px-3 py-1.5 text-[11px] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {chapter.label}<ArrowUpRight size={11} aria-hidden="true" />
          </span>
        </button>
      ))}
      <span className="text-[10px] tracking-[0.08em] text-white/55 tabular-nums" aria-hidden="true">05</span>
    </nav>
  );
}
