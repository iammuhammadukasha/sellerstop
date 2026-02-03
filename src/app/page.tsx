'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HeroOrbit from './components/HeroOrbit';
import ParallaxScrollSections from './components/ParallaxScrollSections';

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

      <ParallaxScrollSections />

      <footer className="cb-footer">
        <div className="cb-container">
          <p>© We Buy Houses for Cash. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
