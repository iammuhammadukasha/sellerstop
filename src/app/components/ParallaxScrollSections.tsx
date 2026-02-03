'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HowItWorksCarousel from './HowItWorksCarousel';

const CARD_COUNT = 4;

export default function ParallaxScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Each card overlays the previous; scroll drives each card's x independently.
  // Card 1: centered [0, 0.25], then off left
  const x1 = useTransform(scrollYProgress, [0, 0.25, 1], ['0%', '-100%', '-100%']);
  // Card 2: off right, then centered [0.25, 0.5], then off left
  const x2 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ['100%', '100%', '0%', '-100%', '-100%']);
  // Card 3: off right until 0.5, centered [0.5, 0.75], then off left
  const x3 = useTransform(scrollYProgress, [0, 0.5, 0.75, 1], ['100%', '100%', '0%', '-100%']);
  // Card 4: off right until 0.75, then centered
  const x4 = useTransform(scrollYProgress, [0, 0.75, 1], ['100%', '100%', '0%']);

  return (
    <div ref={containerRef} className="cb-parallax-wrap" style={{ height: `${CARD_COUNT * 100}vh` }}>
      <div className="cb-parallax-viewport">
        <div className="cb-parallax-stack">
          {/* Card 1: How It Works */}
          <motion.div className="cb-parallax-card cb-parallax-card--overlay" style={{ x: x1, zIndex: 1 }}>
            <div className="cb-parallax-card-inner cb-section-card cb-how-card">
              <div className="cb-container">
                <h2 className="cb-section-title cb-section-title--jost">How It Works</h2>
                <p className="cb-section-subtitle">
                  Sell your house in three simple steps. No fees, no obligation.
                </p>
                <HowItWorksCarousel />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Why Choose Us */}
          <motion.div className="cb-parallax-card cb-parallax-card--overlay" style={{ x: x2, zIndex: 2 }}>
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
          </motion.div>

          {/* Card 3: Benefits */}
          <motion.div className="cb-parallax-card cb-parallax-card--overlay" style={{ x: x3, zIndex: 3 }}>
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

          {/* Card 4: CTA */}
          <motion.div className="cb-parallax-card cb-parallax-card--overlay" style={{ x: x4, zIndex: 4 }}>
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
  );
}
