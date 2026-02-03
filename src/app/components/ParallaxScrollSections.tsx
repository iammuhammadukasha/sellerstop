'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HowItWorksCarousel from './HowItWorksCarousel';

export default function ParallaxScrollSections() {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Only the overlay block (sections 3 & 4) uses scroll-driven motion. Progress 0–1 over 200vh.
  const { scrollYProgress: overlayProgress } = useScroll({
    target: overlayRef,
    offset: ['start start', 'end end'],
  });

  // Section 3: slides in from right (over section 2) in first half, then off to left in second half
  const x3 = useTransform(overlayProgress, [0, 0.5, 1], ['100%', '0%', '-100%']);
  // Section 4: off right until second half, then slides in over section 3
  const x4 = useTransform(overlayProgress, [0, 0.5, 1], ['100%', '100%', '0%']);

  return (
    <>
      {/* Section 1: normal scroll, no overlay */}
      <section className="cb-parallax-section cb-parallax-section--normal" id="how">
        <div className="cb-parallax-card-inner cb-section-card cb-how-card">
          <div className="cb-container">
            <h2 className="cb-section-title cb-section-title--jost">How It Works</h2>
            <p className="cb-section-subtitle">
              Sell your house in three simple steps. No fees, no obligation.
            </p>
            <HowItWorksCarousel />
          </div>
        </div>
      </section>

      {/* Section 2: normal scroll, no overlay */}
      <section className="cb-parallax-section cb-parallax-section--normal" id="why">
        <div className="cb-parallax-card-inner cb-section-card">
          <div className="cb-container">
            <h2 className="cb-section-title cb-section-title--jost">Why Choose Seller Stop?</h2>
            <p className="cb-section-subtitle">
              We make selling your house simple, fast, and stress-free.
            </p>
            <ul className="cb-parallax-list">
              <li>No listing, no open houses, no waiting for buyers</li>
              <li>One conversation, one offer, one closing</li>
              <li>We buy in any condition—as-is, no repairs</li>
              <li>Close in as little as 7 days or on your schedule</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sections 3 & 4: overlay each other (3 overlays 2, 4 overlays 3) */}
      <div ref={overlayRef} className="cb-parallax-overlay-wrap" style={{ height: '200vh' }}>
        <div className="cb-parallax-viewport">
          <div className="cb-parallax-stack">
            {/* Base: section 2 content stays visible underneath (same as section 2) */}
            <div className="cb-parallax-card cb-parallax-card--base" style={{ zIndex: 1 }}>
              <div className="cb-parallax-card-inner cb-section-card">
                <div className="cb-container">
                  <h2 className="cb-section-title cb-section-title--jost">Why Choose Seller Stop?</h2>
                  <p className="cb-section-subtitle">
                    We make selling your house simple, fast, and stress-free.
                  </p>
                  <ul className="cb-parallax-list">
                    <li>No listing, no open houses, no waiting for buyers</li>
                    <li>One conversation, one offer, one closing</li>
                    <li>We buy in any condition—as-is, no repairs</li>
                    <li>Close in as little as 7 days or on your schedule</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: slides in from right over section 2, then section 4 slides over this */}
            <motion.div className="cb-parallax-card cb-parallax-card--overlay" style={{ x: x3, zIndex: 2 }}>
              <div className="cb-parallax-card-inner cb-section-card">
                <div className="cb-container">
                  <h2 className="cb-section-title">Why Sell to Us for Cash?</h2>
                  <div className="cb-benefits-grid">
                    <div className="cb-benefit-card">
                      <div className="cb-benefit-icon">💰</div>
                      <h3>Fair cash offer</h3>
                      <p>We buy as-is. No lowballing—we make offers based on real market value.</p>
                    </div>
                    <div className="cb-benefit-card">
                      <div className="cb-benefit-icon">⚡</div>
                      <h3>Close in days</h3>
                      <p>Skip months of listing and showings. Close in as little as 7 days if you need to.</p>
                    </div>
                    <div className="cb-benefit-card">
                      <div className="cb-benefit-icon">🔧</div>
                      <h3>No repairs needed</h3>
                      <p>We buy houses in any condition. No need to fix, clean, or stage.</p>
                    </div>
                    <div className="cb-benefit-card">
                      <div className="cb-benefit-icon">📋</div>
                      <h3>No agent fees</h3>
                      <p>No commissions or hidden costs. The offer you see is what you get at closing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 4: slides in from right over section 3 */}
            <motion.div className="cb-parallax-card cb-parallax-card--overlay" style={{ x: x4, zIndex: 3 }}>
              <div className="cb-parallax-card-inner cb-section-card cb-cta-card">
                <div className="cb-container">
                  <h2 className="cb-section-title">Ready to Get Your Cash Offer?</h2>
                  <p className="cb-section-subtitle">
                    Tell us about your property. We’ll get back to you with a no-obligation offer within 24 hours.
                  </p>
                  <form className="cb-cta-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Your name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="tel" placeholder="Phone" />
                    <input type="text" placeholder="Property address (city/state)" />
                    <button type="submit" className="cb-btn cb-btn-primary cb-btn-lg">
                      Get My Cash Offer
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
