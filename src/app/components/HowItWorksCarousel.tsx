'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const STEPS = [
  { num: 1, title: 'Tell us about your property', desc: 'Fill out a short form or call us. We\'ll ask a few questions about your house and situation.' },
  { num: 2, title: 'Get your cash offer', desc: 'We\'ll review your property and send you a fair cash offer—usually within 24 hours.' },
  { num: 3, title: 'Close on your timeline', desc: 'Accept the offer and close when it works for you. We handle the rest. Cash at closing.' },
];

const CARD_WIDTH = 320;
const CARD_GAP = 24;
const STEP_PX = CARD_WIDTH + CARD_GAP;
const DURATION = 0.6;
const PAUSE_MS = 2800;

export default function HowItWorksCarousel() {
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const positionRef = useRef(0);
  const cancelledRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    cancelledRef.current = false;

    const run = () => {
      if (cancelledRef.current) return;
      const pos = positionRef.current;
      if (pos < 3) {
        const targetX = -(pos + 1) * STEP_PX;
        animate(x, targetX, {
          duration: DURATION,
          ease: 'easeInOut',
          onComplete: () => {
            if (cancelledRef.current) return;
            positionRef.current = pos + 1;
            timeoutRef.current = setTimeout(run, PAUSE_MS);
          },
        });
      } else {
        positionRef.current = 0;
        x.set(0);
        timeoutRef.current = setTimeout(run, PAUSE_MS);
      }
    };

    timeoutRef.current = setTimeout(run, PAUSE_MS);
    return () => {
      cancelledRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mounted, x]);

  if (!mounted) return null;

  return (
    <div className="cb-how-carousel">
      <div className="cb-how-carousel__viewport">
        <motion.div
          className="cb-how-carousel__track"
          style={{ x }}
        >
          {[...STEPS, ...STEPS].map((step, i) => (
            <div key={`${step.num}-${i}`} className="cb-how-carousel__card cb-step">
              <div className="cb-step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
