'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HeroOrbit from './components/HeroOrbit';
import HowItWorksCarousel from './components/HowItWorksCarousel';
import TestimonialCarousel from './components/TestimonialCarousel';
import BenefitIcon from './components/BenefitIcon';

const scrollViewport = { once: true, amount: 0.12 };
const scrollTransition = { duration: 0.55, ease: 'easeOut' };

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
              <h1 className="cb-hero-saas-headline">Seller Stop Choice</h1>
              <p className="cb-hero-saas-subtitle">
                We buy your house as-is. No repairs, no cleaning, no hassle—just a fair cash offer and a quick close.
              </p>
              <a href="#contact" className="cb-hero-saas-cta">Get Your Cash Offer</a>
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
            <h2 className="cb-section-title cb-section-title--jost">How It Works</h2>
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
            <h2 className="cb-section-title">Why Sell to Us for Cash?</h2>
            <div className="cb-benefits-grid cb-benefits-grid--row">
              <div className="cb-benefit-card">
                <BenefitIcon name="cash" />
                <h3>Fair cash offer</h3>
                <p>We buy as-is. No lowballing—we make offers based on real market value.</p>
              </div>
              <div className="cb-benefit-card">
                <BenefitIcon name="lightning" />
                <h3>Close in days</h3>
                <p>Skip months of listing and showings. Close in as little as 7 days if you need to.</p>
              </div>
              <div className="cb-benefit-card">
                <BenefitIcon name="wrench" />
                <h3>No repairs needed</h3>
                <p>We buy houses in any condition. No need to fix, clean, or stage.</p>
              </div>
              <div className="cb-benefit-card">
                <BenefitIcon name="file" />
                <h3>No agent fees</h3>
                <p>No commissions or hidden costs. The offer you see is what you get at closing.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, x: 72 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={scrollViewport}
        transition={scrollTransition}
      >
        <TestimonialCarousel />
      </motion.div>

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
              <h2 className="cb-cta-heading">Get Your Cash Offer</h2>
              <p className="cb-cta-desc">Tell us about your property. We&apos;ll get back to you with a no-obligation offer within 24 hours.</p>
              <div className="cb-cta-contact">
                <p><strong>CALL US</strong><br /><a href="tel:+18669174001">866 917 4001</a></p>
                <p><strong>EMAIL US</strong><br /><a href="mailto:nick@nrprobate.com">nick@nrprobate.com</a></p>
                <p><strong>OFFICE LOCATION</strong><br />440 E. Huntington Dr. #300<br />Arcadia, CA 91006</p>
              </div>
            </div>
            <div className="cb-cta-col cb-cta-form-wrap">
              <form className="cb-cta-form" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Full name" required />
                <input type="email" placeholder="Email" required />
                <input type="tel" placeholder="Phone number" />
                <input type="text" placeholder="Address" />
                <button type="submit" className="cb-btn cb-btn-primary cb-btn-lg">Get My Cash Offer</button>
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
          <p>Seller Stop Choice © 2026 All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
