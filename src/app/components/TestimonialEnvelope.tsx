'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, PanInfo } from 'framer-motion';

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

export default function TestimonialEnvelope() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex((index + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    if (offset < -threshold || velocity < -200) goTo(activeIndex + 1);
    else if (offset > threshold || velocity > 200) goTo(activeIndex - 1);
  };

  return (
    <section className="cb-section cb-section-card-wrap cb-testimonial-envelope" id="testimonials" ref={sectionRef}>
      <div className="cb-section-card">
        <div className="cb-container">
          <h2 className="cb-section-title">What Our Client Says</h2>

          <div className="cb-envelope-wrap">
            {/* Open envelope SVG */}
            <div className="cb-envelope-svg-wrap" aria-hidden>
              <svg
                className="cb-envelope-svg"
                viewBox="0 0 200 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Envelope back / body */}
                <path
                  d="M20 50 L100 95 L180 50 L100 5 Z"
                  fill="#e8e0d0"
                  stroke="#c9a227"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Open flap (folded back) */}
                <path
                  d="M100 5 L20 50 L100 95 L180 50 Z"
                  fill="#f0ebe0"
                  stroke="#c9a227"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  opacity="0.95"
                />
                {/* Inner pocket visible when open */}
                <path
                  d="M30 55 L100 100 L170 55 L100 10 Z"
                  fill="#f5f0e6"
                  stroke="rgba(201, 162, 39, 0.4)"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Card that comes out on scroll */}
            <motion.div
              className="cb-envelope-card"
              initial={{ y: 60, opacity: 0, scale: 0.92 }}
              animate={
                isInView
                  ? { y: 0, opacity: 1, scale: 1 }
                  : { y: 60, opacity: 0, scale: 0.92 }
              }
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onPanEnd={handlePanEnd}
              style={{ touchAction: 'pan-x' }}
            >
              <div className="cb-envelope-card-inner">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                    className="cb-envelope-card-content"
                  >
                    <p className="cb-testimonial-quote">"{TESTIMONIALS[activeIndex].quote}"</p>
                    <p className="cb-testimonial-author">— {TESTIMONIALS[activeIndex].author}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide controls */}
              <div className="cb-envelope-card-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`cb-envelope-dot ${i === activeIndex ? 'cb-envelope-dot--active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="cb-envelope-card-arrows">
                <button
                  type="button"
                  className="cb-envelope-arrow"
                  onClick={() => goTo(activeIndex - 1)}
                  aria-label="Previous testimonial"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="cb-envelope-arrow"
                  onClick={() => goTo(activeIndex + 1)}
                  aria-label="Next testimonial"
                >
                  ›
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
