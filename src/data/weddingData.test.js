import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { weddingData } from './weddingData';

const publicDir = resolve(process.cwd(), 'public');

describe('weddingData', () => {
  it('sets the couple, families, crest, and builder credit accurately', () => {
    expect(weddingData.couple.partner1).toBe('Comfort');
    expect(weddingData.couple.partner2).toBe('Clark');
    expect(weddingData.couple.crestTitle).toBe('CC LOVESTORY 2027');
    expect(weddingData.couple.families).toEqual(['Mr & Mrs Akinbo', 'Mr & Mrs Monks']);
    expect(weddingData.specialCelebration.honoree).toBe('Mrs. Idowu Akinbo');
    expect(weddingData.specialCelebration.milestone).toBe('60th Birthday');
    expect(weddingData.credits.builtBy).toBe('Akinbo Adetayo');
  });

  it('sets the event date, time, and Funplex Event Center venue details', () => {
    expect(weddingData.date).toBe('2027-01-09T10:00:00+01:00');
    expect(weddingData.timeDisplay).toBe('10:00 AM');
    expect(weddingData.venue.name).toBe('Funplex Event Center');
    expect(weddingData.venue.address).toBe(
      'No. 39 CMD Road, Magodo, Ikosi, Lagos, Nigeria 100248'
    );
  });

  it('includes Sky Blue, Gold, and Navy Blue as the Colours of the Day', () => {
    expect(weddingData.colours.map((c) => c.name)).toEqual([
      'Sky Blue',
      'Gold',
      'Navy Blue',
    ]);
  });

  it('references existing local image files for all Aso Ebi clothes, souvenir, and couple gallery', () => {
    expect(weddingData.asoEbi).toHaveLength(4);
    expect(weddingData.gallery).toHaveLength(4);

    const imagePaths = [
      ...weddingData.asoEbi.map((item) => item.image),
      weddingData.souvenir.image,
      ...weddingData.gallery.map((item) => item.src),
    ];

    for (const rel of imagePaths) {
      const fullPath = resolve(publicDir, rel.replace(/^\//, ''));
      expect(existsSync(fullPath), `Missing image asset: ${fullPath}`).toBe(true);
    }
  });

  it('includes all three official RSVP coordinators from the invitation', () => {
    expect(weddingData.rsvpContacts).toHaveLength(3);
    expect(weddingData.rsvpContacts.map((c) => c.name)).toEqual([
      'Mr Sunday Ibtoye',
      'Mr Dayo Akinrelure',
      'Mr Segun Ajala',
    ]);
  });
});
