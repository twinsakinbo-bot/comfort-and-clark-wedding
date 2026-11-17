import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Comfort & Clark Wedding Site', () => {
  it('renders the couple, families, 60th birthday honoree, venue, attire, souvenir, RSVP contacts, and builder credit', () => {
    render(<App />);

    expect(screen.getAllByText(/Comfort & Clark/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Mr & Mrs Akinbo/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Mr & Mrs Monks/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Mrs\. Idowu Akinbo/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Funplex Event Center/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/No\. 39 CMD Road, Magodo, Ikosi, Lagos, Nigeria 100248/i)).toBeTruthy();

    // Colours of the Day
    expect(screen.getByText('Sky Blue')).toBeTruthy();
    expect(screen.getByText('Gold')).toBeTruthy();
    expect(screen.getByText('Navy Blue')).toBeTruthy();

    // Aso Ebi Clothes & Souvenir
    expect(screen.getByText("Women's Cloth")).toBeTruthy();
    expect(screen.getByText("Women's Gele")).toBeTruthy();
    expect(screen.getByText("Men's Cloth")).toBeTruthy();
    expect(screen.getByText("Men's Fila (Cap)")).toBeTruthy();
    expect(screen.getByText('Wedding Souvenir')).toBeTruthy();

    // RSVP Contacts
    expect(screen.getByText('Mr Sunday Ibtoye')).toBeTruthy();
    expect(screen.getByText('Mr Dayo Akinrelure')).toBeTruthy();
    expect(screen.getByText('Mr Segun Ajala')).toBeTruthy();

    // Built by Akinbo Adetayo
    expect(screen.getByText(/Built by Akinbo Adetayo/i)).toBeTruthy();

    // Hero slide switcher dots represent all 4 couple photos
    expect(screen.getByRole('button', { name: 'Show couple photo 1 of 4' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Show couple photo 4 of 4' })).toBeTruthy();
  });

  it('submits the RSVP form cleanly', async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('First name'), {
      target: { value: 'Tunde' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last name'), {
      target: { value: 'Akinbo' },
    });
    fireEvent.change(screen.getByPlaceholderText('guest@example.com'), {
      target: { value: 'tunde@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: "Yes, I'll be there" }));
    fireEvent.click(screen.getByRole('button', { name: /Send RSVP/i }));

    expect(await screen.findByRole('heading', { name: 'Thank You' })).toBeTruthy();
    expect(screen.getByText(/Tunde Akinbo/i)).toBeTruthy();
  });
});
