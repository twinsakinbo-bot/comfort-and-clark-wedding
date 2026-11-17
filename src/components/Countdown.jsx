import { useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData';
import { StaggerGroup, StaggerItem } from './MotionPrimitives';

function getTimeLeft(targetDate) {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft(weddingData.date));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft(weddingData.date));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section id="countdown" className="py-16 lg:py-24 px-6 border-b border-brand-border bg-white">
      <div className="max-w-[760px] mx-auto text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-gold-deep mb-3">The celebration begins in</p>
        <p className="font-serif italic text-2xl sm:text-3xl text-brand-navy mb-9">Every moment brings us closer</p>
        <StaggerGroup className="grid grid-cols-4 divide-x divide-brand-border" stagger={0.07}>
          {units.map((unit) => (
            <StaggerItem key={unit.label} className="px-2">
              <span className="font-serif tabular-nums text-4xl sm:text-6xl lg:text-7xl font-light text-brand-navy leading-none block">
                {String(unit.value).padStart(2, '0')}
              </span>
              <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-brand-gold-deep mt-2.5 font-medium">
                {unit.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
