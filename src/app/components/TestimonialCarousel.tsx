'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: 'They gave me a fair offer and we closed in 10 days. No repairs, no showings—exactly what I needed.',
    author: 'Maria L., Phoenix',
  },
  {
    quote: 'I was relocating for work and needed to sell fast. Seller Stop made it hassle-free and transparent.',
    author: 'James K., Dallas',
  },
  {
    quote: 'No agent fees, no staging, no waiting. The offer was clear and the process was straightforward.',
    author: 'Sandra T., Atlanta',
  },
];

const DURATION_MS = 2000;

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, DURATION_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="cb-section cb-section-card-wrap cb-testimonial-carousel" id="testimonials">
      <div className="cb-section-card">
        <div className="cb-container">
          <h2 className="cb-section-title">What Our Client Says</h2>

          <div className="cb-testimonial-carousel-viewport">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                className="cb-testimonial-carousel-card"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="cb-testimonial-quote">"{TESTIMONIALS[activeIndex].quote}"</p>
                <p className="cb-testimonial-author">— {TESTIMONIALS[activeIndex].author}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="cb-testimonial-carousel-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`cb-testimonial-dot ${i === activeIndex ? 'cb-testimonial-dot--active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
