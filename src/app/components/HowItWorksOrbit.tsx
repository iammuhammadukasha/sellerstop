'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const RADIUS_X = 200;
const RADIUS_Y = 140;
const DEG = Math.PI / 180;
const ORBIT_DURATION = 24; /* seconds for one full loop */

const STEPS = [
  { id: 1, angleOffset: 0, num: 1, title: 'Tell us about your property', desc: 'Fill out a short form or call us. We\'ll ask a few questions about your house and situation.' },
  { id: 2, angleOffset: 120, num: 2, title: 'Get your cash offer', desc: 'We\'ll review your property and send you a fair cash offer—usually within 24 hours.' },
  { id: 3, angleOffset: 240, num: 3, title: 'Close on your timeline', desc: 'Accept the offer and close when it works for you. We handle the rest. Cash at closing.' },
];

function StepOrbitCard({
  step,
  orbitTime,
}: {
  step: (typeof STEPS)[number];
  orbitTime: ReturnType<typeof useMotionValue<number>>;
}) {
  const angle = useTransform(orbitTime, (t) => (t + step.angleOffset) * DEG);
  const x = useTransform(angle, (a) => Math.cos(a) * RADIUS_X);
  const y = useTransform(angle, (a) => Math.sin(a) * RADIUS_Y);
  /* Front card (bottom) = larger and fuller opacity */
  const scale = useTransform(angle, (a) => {
    const front = (Math.sin(a) + 1) / 2;
    return 0.85 + 0.2 * front;
  });
  const opacity = useTransform(angle, (a) => {
    const front = (Math.sin(a) + 1) / 2;
    return 0.6 + 0.45 * front;
  });

  return (
    <div className="cb-how-orbit-card-wrap">
      <motion.div
        className="cb-step cb-step-orbit"
        style={{ x, y, scale, opacity }}
      >
        <div className="cb-step-num">{step.num}</div>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </motion.div>
    </div>
  );
}

export default function HowItWorksOrbit() {
  const [mounted, setMounted] = useState(false);
  const orbitTime = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const controls = animate(orbitTime, 360, {
      duration: ORBIT_DURATION,
      repeat: Infinity,
      ease: 'linear',
    });
    return () => controls.stop();
  }, [mounted, orbitTime]);

  if (!mounted) return null;

  return (
    <div className="cb-how-orbit">
      <div className="cb-how-orbit-track">
        {STEPS.map((step) => (
          <StepOrbitCard key={step.id} step={step} orbitTime={orbitTime} />
        ))}
      </div>
    </div>
  );
}
