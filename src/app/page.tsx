'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroOrbit from './components/HeroOrbit';
import IntegrationsArc from './components/IntegrationsArc';
import HowItWorksCarousel from './components/HowItWorksCarousel';

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

export default function CashBuyerPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="cash-buyer-page">
      <div className="cb-hero-card">
        <nav className="cb-nav cb-nav-hero cb-nav-coreshift">
          <div className="cb-container cb-nav-inner">
            <a href="#" className="cb-logo-hero cb-logo-img-wrap" aria-label="Seller Stop Choice">
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
              <a href="#product">Product</a>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#resources">Resources</a>
              <button type="button" className="cb-btn cb-btn-ghost">Sign in</button>
              <button type="button" className="cb-btn cb-btn-hero-primary">Request a Demo</button>
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
          {/* Center hero content — glass container */}
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
              <h1 className="cb-hero-saas-headline">Seller Stop Choice</h1>
              <p className="cb-hero-saas-subtitle">
                We buy your house as-is. No repairs, no cleaning, no hassle—just a fair cash offer and a quick close.
              </p>
              <button type="button" className="cb-hero-saas-cta">Get Your Cash Offer</button>
            </div>
          </motion.div>
        </div>
      </header>
      </div>

      <Section className="cb-section cb-how" id="how">
        <div className="cb-section-card cb-how-card">
          <div className="cb-container">
            <h2 className="cb-section-title cb-section-title--jost">How It Works</h2>
            <p className="cb-section-subtitle">Sell your house in three simple steps. No fees, no obligation.</p>
            <HowItWorksCarousel />
          </div>
        </div>
      </Section>

      <Section className="cb-section cb-integrations" id="integrations">
        <div className="cb-section-card cb-integrations-card-wrap">
          <div className="cb-container">
            <div className="cb-integrations-header">
              <div className="cb-integrations-icon" aria-hidden>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h2 className="cb-section-title cb-section-title--jost">Integrate with your existing tools in seconds</h2>
            </div>
            <IntegrationsArc />
          </div>
        </div>
      </Section>

      <Section className="cb-section cb-benefits" id="benefits">
        <div className="cb-container">
          <h2 className="cb-section-title">Why Sell to Us for Cash?</h2>
          <div className="cb-benefits-grid">
            <motion.div
              className="cb-benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="cb-benefit-icon">💰</div>
              <h3>Fair cash offer</h3>
              <p>We buy as-is. No lowballing—we make offers based on real market value.</p>
            </motion.div>
            <motion.div
              className="cb-benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="cb-benefit-icon">⚡</div>
              <h3>Close in days</h3>
              <p>Skip months of listing and showings. Close in as little as 7 days if you need to.</p>
            </motion.div>
            <motion.div
              className="cb-benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="cb-benefit-icon">🔧</div>
              <h3>No repairs needed</h3>
              <p>We buy houses in any condition. No need to fix, clean, or stage.</p>
            </motion.div>
            <motion.div
              className="cb-benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="cb-benefit-icon">📋</div>
              <h3>No agent fees</h3>
              <p>No commissions or hidden costs. The offer you see is what you get at closing.</p>
            </motion.div>
          </div>
        </div>
      </Section>

      <Section className="cb-section cb-cta" id="contact">
        <div className="cb-container">
          <motion.div
            className="cb-cta-card"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Get Your Cash Offer?</h2>
            <p>Tell us about your property. We’ll get back to you with a no-obligation offer within 24 hours.</p>
            <form className="cb-cta-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone" />
              <input type="text" placeholder="Property address (city/state)" />
              <button type="submit" className="cb-btn cb-btn-primary cb-btn-lg">Get My Cash Offer</button>
            </form>
          </motion.div>
        </div>
      </Section>

      <footer className="cb-footer">
        <div className="cb-container">
          <p>© We Buy Houses for Cash. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
