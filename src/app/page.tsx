'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HeroOrbit from './components/HeroOrbit';
import HowItWorksCarousel from './components/HowItWorksCarousel';
import { TestimonialCarousel } from '@/components/ui/testimonial';
import BenefitIcon from './components/BenefitIcon';

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: 'Maria L., Phoenix',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
    description: 'I needed to sell quickly after a family situation changed everything. Seller Stop gave me a fair offer the next day, and we closed in 10 days flat. I didn\'t have to clean a thing. Genuinely stress-free.',
  },
  {
    id: 2,
    name: 'James K., Dallas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
    description: 'I was relocating for a new job and had maybe three weeks to figure out my house. These guys were transparent from day one — no games, no sudden price changes. Exactly what I needed.',
  },
  {
    id: 3,
    name: 'Sandra T., Atlanta',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
    description: 'After sitting on an inherited property for months, I finally called Seller Stop. No staging, no showings, no fees. They made the whole process feel easy when I expected it to be a nightmare.',
  },
];

const scrollViewport = { once: true, amount: 0.12 };
const scrollTransition = { duration: 0.55, ease: 'easeOut' };

function getPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

function isUSPhoneValid(phone: string): boolean {
  const d = getPhoneDigits(phone);
  return d.length === 10 || (d.length === 11 && d.startsWith('1'));
}

function getPhoneForStorage(phone: string): string {
  const d = getPhoneDigits(phone);
  return d.length === 11 && d.startsWith('1') ? d.slice(1) : d;
}

export default function CashBuyerPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [logoError, setLogoError] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', address: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ type: 'idle' });

  async function handleCashOfferSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus({ type: 'idle' });

    const name = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const address = formData.address.trim();

    if (!name) {
      setFormStatus({ type: 'error', message: 'Full name is required.' });
      return;
    }
    if (!email) {
      setFormStatus({ type: 'error', message: 'Email is required.' });
      return;
    }
    if (!phone) {
      setFormStatus({ type: 'error', message: 'Phone number is required.' });
      return;
    }
    const digits = getPhoneDigits(phone);
    if (digits.length === 0 || digits.length > 11) {
      setFormStatus({ type: 'error', message: 'Phone must contain only numbers.' });
      return;
    }
    if (!/^\d+$/.test(digits)) {
      setFormStatus({ type: 'error', message: 'Phone must contain only numbers.' });
      return;
    }
    if (!isUSPhoneValid(phone)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid 10-digit US phone number.' });
      return;
    }
    if (!address) {
      setFormStatus({ type: 'error', message: 'Address is required.' });
      return;
    }

    setFormStatus({ type: 'loading' });
    try {
      const res = await fetch('/api/cash-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name,
          email,
          phone: getPhoneForStorage(phone),
          address,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormStatus({ type: 'error', message: data.error || 'Something went wrong.' });
        return;
      }
      setFormStatus({ type: 'success', message: 'Thanks! We\'ll get back to you with your cash offer within 24 hours.' });
      setFormData({ fullName: '', email: '', phone: '', address: '' });
    } catch {
      setFormStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) setFormData((p) => ({ ...p, phone: value }));
  }

  return (
    <div className="cash-buyer-page">
      <div className="cb-hero-card">
        <nav className="cb-nav cb-nav-hero cb-nav-coreshift">
          <div className="cb-container cb-nav-inner">
            <a href="#home" className="cb-logo-hero cb-logo-img-wrap" aria-label="Seller Stop Choice">
              {logoError ? (
                <span className="cb-logo-text">Seller Stop Choice</span>
              ) : (
                <img
                  src="/logo.png"
                  alt="Seller Stop Choice"
                  className="cb-logo-img"
                  onError={() => setLogoError(true)}
                />
              )}
            </a>
            <div className="cb-nav-links-hero">
              <a href="#how">How It Works</a>
              <a href="#benefits">Why Choose Us</a>
              <a href="#testimonials">Success Stories</a>
              <a href="#contact" className="cb-btn cb-btn-hero-primary">Get My Free Offer</a>
            </div>
          </div>
        </nav>

        <header ref={heroRef} className="cb-hero cb-hero-saas" id="home">
        <div className="cb-hero-bg cb-hero-saas-bg" />
        {/* Orbit profile cards around center */}
        <div className="cb-hero-orbit-wrap">
          <HeroOrbit />
        </div>
        <div className="cb-hero-saas-main">
          {/* Center hero content - glass container */}
          <motion.div
            className="cb-hero-saas-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="cb-hero-saas-glass">
              <div className="cb-hero-saas-icon-wrap cb-hero-saas-icon-wrap--dollar">
                <span className="cb-hero-saas-icon cb-hero-saas-icon--dollar" aria-hidden>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </span>
              </div>
              <h1 className="cb-hero-saas-headline">Your House. Your Timeline. Your Cash.</h1>
              <p className="cb-hero-saas-subtitle">
                Whether you're facing a life change, an inherited property, or just want to skip the traditional selling process — we make it easy. Get a fair cash offer with zero fees, zero repairs, and zero stress.
              </p>
              <a href="#contact" className="cb-hero-saas-cta">Get My Free Cash Offer</a>
            </div>
          </motion.div>
        </div>
      </header>
      </div>

      <section className="cb-section cb-section-card-wrap" id="how">
        <motion.div
          className="cb-section-card"
          initial={{ opacity: 0, x: 72 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={scrollViewport}
          transition={scrollTransition}
        >
          <div className="cb-container">
            <h2 className="cb-section-title cb-section-title--jost">Three Steps to Sold</h2>
            <p className="cb-section-subtitle">Sell your house in three simple steps. No fees, no obligation.</p>
            <HowItWorksCarousel />
          </div>
        </motion.div>
      </section>

      <section className="cb-section cb-section-card-wrap" id="benefits">
        <motion.div
          className="cb-section-card"
          initial={{ opacity: 0, x: -72 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={scrollViewport}
          transition={scrollTransition}
        >
          <div className="cb-container">
            <h2 className="cb-section-title">Why Homeowners Choose Seller Stop</h2>
            <div className="cb-benefits-grid cb-benefits-grid--row">
              <div className="cb-benefit-card">
                <BenefitIcon name="cash" />
                <h3>Fair Cash Offer</h3>
                <p>We don't make lowball offers. Every offer is backed by local market research so you know you're getting a number you can trust.</p>
              </div>
              <div className="cb-benefit-card">
                <BenefitIcon name="lightning" />
                <h3>Close in as Little as 7 Days</h3>
                <p>No listings, no open houses, no waiting for mortgage approvals. When you're ready to move on, we're ready to close.</p>
              </div>
              <div className="cb-benefit-card">
                <BenefitIcon name="wrench" />
                <h3>Sell It Exactly As-Is</h3>
                <p>Cracked foundation? Outdated kitchen? Tenants still inside? It doesn't matter. We buy houses in any condition — you don't lift a finger.</p>
              </div>
              <div className="cb-benefit-card">
                <BenefitIcon name="file" />
                <h3>Zero Fees. Zero Commissions.</h3>
                <p>What we offer is what you receive. No agent commissions, no surprise closing costs, no hidden deductions. Just a clean transaction.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="cb-section cb-section-card-wrap cb-testimonial-carousel"
        id="testimonials"
        initial={{ opacity: 0, x: 72 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={scrollViewport}
        transition={scrollTransition}
      >
        <div className="cb-section-card">
          <div className="cb-container">
            <h2 className="cb-section-title">Real Homeowners. Real Results.</h2>
            <TestimonialCarousel
              testimonials={TESTIMONIAL_DATA}
              showArrows
              showDots
              className="max-w-2xl mx-auto min-h-[320px]"
            />
          </div>
        </div>
      </motion.section>

      <section className="cb-section cb-section-card-wrap cb-cta-section" id="contact">
        <motion.div
          className="cb-section-card cb-cta-two-col"
          initial={{ opacity: 0, x: -72 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={scrollViewport}
          transition={scrollTransition}
        >
          <div className="cb-container cb-cta-grid">
            <div className="cb-cta-col cb-cta-info">
              <h2 className="cb-cta-heading">You're One Step Away From a Fresh Start</h2>
              <p className="cb-cta-desc">Tell us a little about your property and we&apos;ll get back to you with a no-obligation cash offer within 24 hours. There&apos;s no pressure, no commitment, and absolutely no cost to find out what your home is worth.</p>
              <div className="cb-cta-contact">
                <p><strong>CALL US</strong><br /><a href="tel:+18669174001">866 917 4001</a></p>
                <p><strong>EMAIL US</strong><br /><a href="mailto:nick@nrprobate.com">nick@nrprobate.com</a></p>
                <p><strong>OFFICE LOCATION</strong><br />440 E. Huntington Dr. #300<br />Arcadia, CA 91006</p>
              </div>
            </div>
            <div className="cb-cta-col cb-cta-form-wrap">
              <form className="cb-cta-form" onSubmit={handleCashOfferSubmit}>
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                  disabled={formStatus.type === 'loading'}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  disabled={formStatus.type === 'loading'}
                />
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="US phone (10 digits, numbers only)"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disabled={formStatus.type === 'loading'}
                  maxLength={11}
                  title="10-digit US phone number, numbers only"
                  aria-describedby="phone-hint"
                />
                <span id="phone-hint" className="cb-cta-form-hint">Numbers only. 10 digits (US).</span>
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                  disabled={formStatus.type === 'loading'}
                />
                {formStatus.type === 'success' && formStatus.message && (
                  <p className="cb-cta-form-message cb-cta-form-message--success" role="status">{formStatus.message}</p>
                )}
                {formStatus.type === 'error' && formStatus.message && (
                  <p className="cb-cta-form-message cb-cta-form-message--error" role="alert">{formStatus.message}</p>
                )}
                <button type="submit" className="cb-btn cb-btn-primary cb-btn-lg" disabled={formStatus.type === 'loading'}>
                  {formStatus.type === 'loading' ? 'Sending…' : 'Get My Cash Offer'}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.footer
        className="cb-footer"
        initial={{ opacity: 0, x: 72 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={scrollViewport}
        transition={scrollTransition}
      >
        <div className="cb-container">
          <p><strong>Seller Stop Choice</strong> — Helping homeowners move forward since 2016.</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Fair offers. Fast closes. No fees. Ever.</p>
          <p style={{ marginTop: '8px' }}>© 2026 Seller Stop Choice. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
