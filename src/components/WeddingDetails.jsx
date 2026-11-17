import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { CalendarPlus, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';
import { APPLE_EASE } from '../constants/motion';

function fireConfetti() {
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.6 },
    colors: ['#0B1C3A', '#5CB5EE', '#D4AF37', '#FAFBFD'],
  });
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function toUtcStamp(d) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
    d.getUTCHours()
  )}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function generateGoogleCalUrl() {
  const startDate = new Date(weddingData.date);
  const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000);
  const fullLocation = `${weddingData.venue.name}, ${weddingData.venue.address}`;
  const details = `${weddingData.couple.ceremonyType} of ${weddingData.couple.partner1} & ${weddingData.couple.partner2}, and 60th Birthday of ${weddingData.specialCelebration.honoree}. ${weddingData.couple.hashtag}`;

  return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(
    `${weddingData.couple.partner1} & ${weddingData.couple.partner2}'s Traditional Wedding`
  )}&dates=${toUtcStamp(startDate)}/${toUtcStamp(
    endDate
  )}&location=${encodeURIComponent(fullLocation)}&details=${encodeURIComponent(details)}`;
}

function generateOutlookIcs() {
  const startDate = new Date(weddingData.date);
  const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000);
  const title = `${weddingData.couple.partner1} & ${weddingData.couple.partner2}'s Traditional Wedding`;
  const fullLocation = `${weddingData.venue.name}, ${weddingData.venue.address}`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CC Lovestory 2027//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@cclovestory2027`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(startDate)}`,
    `DTEND:${toUtcStamp(endDate)}`,
    `SUMMARY:${title}`,
    `LOCATION:${fullLocation}`,
    `DESCRIPTION:${weddingData.couple.crestTitle} (${weddingData.couple.hashtag})`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'comfort-and-clark-wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function WeddingDetails() {
  const [calendarMenu, setCalendarMenu] = useState(false);

  const weddingDate = new Date(weddingData.date);
  const dateStr = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: weddingData.timeZone,
  });

  const handleCalendar = (type) => {
    fireConfetti();
    if (type === 'google') {
      window.open(generateGoogleCalUrl(), '_blank', 'noopener,noreferrer');
    } else {
      generateOutlookIcs();
    }
    setCalendarMenu(false);
  };

  return (
    <section
      id="details"
      className="py-16 lg:py-20 px-6 bg-brand-sky-wash border-b border-brand-border"
      style={{ scrollMarginTop: '72px' }}
    >
      <div className="max-w-[1040px] mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-gold-deep mb-3">01 / The celebration</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">
            Wedding Details
          </h2>
          <p className="text-brand-muted text-sm sm:text-base">
            {weddingData.couple.crestTitle} &bull; {weddingData.couple.hashtag}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Date, Venue & Special Celebration */}
          <ScrollReveal delay={0.05} className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 shadow-[0_6px_28px_rgba(11,28,58,0.04)]">
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6 pb-4 border-b border-brand-border">
              When &amp; Where
            </h3>

            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-xs font-semibold tracking-wider uppercase text-brand-gold-deep mb-1">
                  Date &amp; Time
                </dt>
                <dd className="text-brand-navy font-medium text-base">
                  {dateStr} &bull; {weddingData.timeDisplay}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold tracking-wider uppercase text-brand-gold-deep mb-1">
                  Venue
                </dt>
                <dd className="text-brand-navy font-semibold text-base">
                  {weddingData.venue.name}
                </dd>
                <dd className="text-brand-muted mt-0.5">{weddingData.venue.address}</dd>
              </div>

              <div>
                <dt className="text-xs font-semibold tracking-wider uppercase text-brand-gold-deep mb-1">
                  Host Families
                </dt>
                <dd className="text-brand-navy font-medium">
                  {weddingData.couple.families[0]} &amp; {weddingData.couple.families[1]}
                </dd>
              </div>

              <div className="pt-2 border-t border-brand-border">
                <dt className="text-xs font-semibold tracking-wider uppercase text-brand-gold-deep mb-1">
                  {weddingData.specialCelebration.label}&rsquo;s Milestone
                </dt>
                <dd className="text-brand-navy font-semibold text-base">
                  {weddingData.specialCelebration.milestone} —{' '}
                  {weddingData.specialCelebration.honoree}
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-brand-border">
              <m.a
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                href={weddingData.venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-navy text-brand-cream text-xs font-semibold tracking-wider uppercase hover:bg-brand-navy-mid transition-colors"
              >
                Directions
                <ExternalLink size={13} />
              </m.a>

              <div className="relative">
                <m.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setCalendarMenu((open) => !open)}
                  aria-expanded={calendarMenu}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-navy/25 text-brand-navy text-xs font-semibold tracking-wider uppercase hover:bg-brand-sky-wash transition-colors cursor-pointer"
                >
                  <CalendarPlus size={14} />
                  Add to Calendar
                </m.button>

                <AnimatePresence>
                  {calendarMenu && (
                    <m.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: APPLE_EASE }}
                      className="absolute left-0 top-full mt-2 bg-white border border-brand-border rounded-xl shadow-lg z-20 min-w-[205px] overflow-hidden origin-top-left"
                    >
                      <button
                        type="button"
                        onClick={() => handleCalendar('google')}
                        className="w-full px-4 py-2.5 text-left text-sm text-brand-navy hover:bg-brand-sky-wash transition-colors"
                      >
                        Google Calendar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCalendar('outlook')}
                        className="w-full px-4 py-2.5 text-left text-sm text-brand-navy hover:bg-brand-sky-wash border-t border-brand-border transition-colors"
                      >
                        Outlook / Apple (.ics)
                      </button>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>

          {/* Order of Events */}
          <ScrollReveal delay={0.12} className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 shadow-[0_6px_28px_rgba(11,28,58,0.04)]">
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6 pb-4 border-b border-brand-border">
              Order of the Day
            </h3>

            <StaggerGroup stagger={0.1} className="space-y-7">
              {weddingData.programme.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="pl-5 border-l-2 border-brand-gold">
                    <p className="text-xs font-semibold tracking-wider uppercase text-brand-gold-deep">
                      {item.time}
                    </p>
                    <h4 className="font-serif text-2xl text-brand-navy mt-1">{item.title}</h4>
                    <p className="text-sm text-brand-muted mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
