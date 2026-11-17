import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { Phone, Copy, Check, CircleCheck } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';
import { APPLE_EASE } from '../constants/motion';

export default function RSVP() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    attendance: null,
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (form.attendance === null) errs.attendance = 'Please select your attendance';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
  };

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const copyPhone = async (phone, index) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(index);
      setTimeout(() => setCopiedPhone(null), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  const inputClasses = (field) =>
    `w-full px-4 py-3 bg-white border ${
      errors[field] ? 'border-red-500' : 'border-brand-border'
    } rounded-xl text-sm text-brand-navy placeholder:text-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/30 focus-visible:border-brand-navy transition-colors`;

  return (
    <section id="rsvp" className="py-20 lg:py-28 px-6 bg-white" style={{ scrollMarginTop: '72px' }}>
      <div className="max-w-[920px] mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">RSVP</h2>
          <p className="text-brand-muted text-sm sm:text-base">
            Please confirm attendance with any of our family coordinators below
          </p>
        </ScrollReveal>

        {/* Official RSVP Contacts from the Invitation */}
        <StaggerGroup stagger={0.08} className="grid md:grid-cols-3 gap-4 mb-12">
          {weddingData.rsvpContacts.map((contact, idx) => (
            <StaggerItem key={contact.name}>
              <m.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: APPLE_EASE }}
                className="border border-brand-border rounded-2xl p-6 text-center bg-brand-sky-wash shadow-[0_6px_20px_rgba(11,28,58,0.04)] h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-2xl text-brand-navy mb-1">{contact.name}</h3>
                  <p className="text-sm text-brand-muted font-medium mb-5">{contact.phone}</p>
                </div>
                <div className="flex gap-2 justify-center">
                  <m.a
                    whileTap={{ scale: 0.96 }}
                    href={`tel:${contact.tel}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-brand-navy text-brand-cream text-xs font-medium hover:bg-brand-navy-mid transition-colors flex-1"
                  >
                    <Phone size={12} />
                    Call
                  </m.a>
                  <m.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => copyPhone(contact.phone, idx)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-brand-border bg-white text-brand-navy text-xs font-medium hover:bg-brand-cream transition-colors cursor-pointer"
                    aria-label={`Copy phone number for ${contact.name}`}
                  >
                    {copiedPhone === idx ? (
                      <>
                        <Check size={12} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copy
                      </>
                    )}
                  </m.button>
                </div>
              </m.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Simple Online RSVP Form */}
        <ScrollReveal delay={0.1} className="max-w-[620px] mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <m.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: APPLE_EASE }}
                className="border border-brand-border rounded-2xl p-8 sm:p-10 text-center bg-brand-sky-wash shadow-[0_8px_28px_rgba(11,28,58,0.05)]"
              >
                <CircleCheck size={32} className="mx-auto text-brand-navy mb-4" />
                <h3 className="font-serif text-3xl text-brand-navy mb-2">Thank You</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">
                  Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your RSVP response
                  has been noted. Please reach out to any of the coordinators above for Aso Ebi or
                  seating inquiries.
                </p>
                <m.button
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-brand-border bg-white text-xs font-semibold tracking-wider uppercase text-brand-navy hover:bg-brand-cream transition-colors cursor-pointer"
                >
                  Edit Response
                </m.button>
              </m.div>
            ) : (
              <m.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: APPLE_EASE }}
                onSubmit={handleSubmit}
                noValidate
                className="border border-brand-border rounded-2xl p-7 sm:p-10 bg-brand-sky-wash shadow-[0_8px_28px_rgba(11,28,58,0.05)]"
              >
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="rsvp-first-name"
                      className="block text-xs font-semibold text-brand-navy mb-1.5"
                    >
                      First Name *
                    </label>
                    <input
                      id="rsvp-first-name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) => update('firstName', e.target.value)}
                      aria-invalid={Boolean(errors.firstName)}
                      aria-describedby={errors.firstName ? 'rsvp-first-name-error' : undefined}
                      className={inputClasses('firstName')}
                    />
                    {errors.firstName && (
                      <p id="rsvp-first-name-error" className="text-red-600 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="rsvp-last-name"
                      className="block text-xs font-semibold text-brand-navy mb-1.5"
                    >
                      Last Name *
                    </label>
                    <input
                      id="rsvp-last-name"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) => update('lastName', e.target.value)}
                      aria-invalid={Boolean(errors.lastName)}
                      aria-describedby={errors.lastName ? 'rsvp-last-name-error' : undefined}
                      className={inputClasses('lastName')}
                    />
                    {errors.lastName && (
                      <p id="rsvp-last-name-error" className="text-red-600 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="rsvp-email"
                    className="block text-xs font-semibold text-brand-navy mb-1.5"
                  >
                    Email *
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    autoComplete="email"
                    placeholder="guest@example.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'rsvp-email-error' : undefined}
                    className={inputClasses('email')}
                  />
                  {errors.email && (
                    <p id="rsvp-email-error" className="text-red-600 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <span className="block text-xs font-semibold text-brand-navy mb-2">
                    Will you attend? *
                  </span>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { value: true, label: "Yes, I'll be there" },
                      { value: false, label: "No, I can't make it" },
                    ].map((option) => (
                      <m.button
                        key={String(option.value)}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => update('attendance', option.value)}
                        aria-pressed={form.attendance === option.value}
                        className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-colors cursor-pointer ${
                          form.attendance === option.value
                            ? 'border-brand-navy bg-brand-navy text-brand-cream'
                            : 'border-brand-border bg-white text-brand-navy hover:border-brand-navy/40'
                        }`}
                      >
                        {option.label}
                      </m.button>
                    ))}
                  </div>
                  {errors.attendance && (
                    <p className="text-red-600 text-xs mt-1">{errors.attendance}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="rsvp-message"
                    className="block text-xs font-semibold text-brand-navy mb-1.5"
                  >
                    Goodwill Message (optional)
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    placeholder="Wishes for Comfort, Clark & Mrs. Idowu Akinbo..."
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className={`${inputClasses('message')} resize-none`}
                  />
                </div>

                <m.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 bg-brand-navy text-brand-cream rounded-full text-xs font-semibold tracking-[0.15em] uppercase hover:bg-brand-navy-mid transition-colors cursor-pointer"
                >
                  Send RSVP
                </m.button>
              </m.form>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
