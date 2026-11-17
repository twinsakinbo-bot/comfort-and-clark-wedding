import { ArrowUpRight, CalendarDays, Clock3, MapPin } from 'lucide-react';
import { weddingData } from '../data/weddingData';

const eventDate = new Date(weddingData.date).toLocaleDateString('en-GB', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: weddingData.timeZone,
});

export default function EventQuickInfo() {
  return (
    <section id="quick-info" aria-label="Event at a glance" className="border-b border-brand-border bg-brand-sky-wash px-5 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-gold-deep lg:text-left">Your invitation, at a glance</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_1.4fr_auto] lg:items-center lg:gap-0">
          <div className="flex items-start gap-3 lg:border-r lg:border-brand-border lg:pr-6">
            <CalendarDays size={19} className="mt-0.5 shrink-0 text-brand-gold-deep" aria-hidden="true" />
            <div><p className="text-[10px] uppercase tracking-[0.15em] text-brand-muted">Date</p><p className="mt-1 text-sm font-semibold text-brand-navy">{eventDate}</p></div>
          </div>
          <div className="flex items-start gap-3 lg:border-r lg:border-brand-border lg:px-6">
            <Clock3 size={19} className="mt-0.5 shrink-0 text-brand-gold-deep" aria-hidden="true" />
            <div><p className="text-[10px] uppercase tracking-[0.15em] text-brand-muted">Time</p><p className="mt-1 text-sm font-semibold text-brand-navy">{weddingData.timeDisplay} WAT</p></div>
          </div>
          <div className="flex items-start gap-3 lg:px-6">
            <MapPin size={19} className="mt-0.5 shrink-0 text-brand-gold-deep" aria-hidden="true" />
            <div><p className="text-[10px] uppercase tracking-[0.15em] text-brand-muted">Venue</p><p className="mt-1 text-sm font-semibold text-brand-navy">{weddingData.venue.name}, Magodo</p></div>
          </div>
          <a href={weddingData.venue.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-navy/25 px-4 py-2.5 text-xs font-semibold text-brand-navy transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy">
            Directions <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
