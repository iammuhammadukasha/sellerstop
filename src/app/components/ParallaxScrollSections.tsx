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

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw']);

  return (
    <div ref={containerRef} className="cb-parallax-wrap" style={{ height: `${CARD_COUNT * 100}vh` }}>
      <div className="cb-parallax-viewport">
        <motion.div className="cb-parallax-track" style={{ x }}>
          {/* Card 1: How It Works */}
          <div className="cb-parallax-card">
            <div className="cb-parallax-card-inner cb-section-card cb-how-card">
              <div className="cb-container">
                <h2 className="cb-section-title cb-section-title--jost">How It Works</h2>
                <p className="cb-section-subtitle">
                  Sell your house in three simple steps. No fees, no obligation.
                </p>
                <HowItWorksCarousel />
              </div>
            </div>
          </div>

          {/* Card 2: Why Choose Us */}
          <div className="cb-parallax-card">
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

          {/* Card 3: Benefits */}
          <div className="cb-parallax-card">
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
          </div>

          {/* Card 4: CTA */}
          <div className="cb-parallax-card">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
