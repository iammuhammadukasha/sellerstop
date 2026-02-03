'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

/* Smaller radius so cards stay inside the section card (no overlay) */
const RADIUS_X = 200;
const RADIUS_Y = 55;
const DEG = Math.PI / 180;
const PAUSE_AT_CENTER_MS = 2200;
const STEP_SPRING = { type: 'spring' as const, stiffness: 120, damping: 24 };

/* Stops: 0 = card 0 center, 120 = card 2 center, 240 = card 1 center; then 360 (same as 0) and reset */
const CENTER_STEPS = [0, 120, 240];

const STEPS = [
  { num: 1, title: 'Tell us about your property', desc: 'Fill out a short form or call us. We\'ll ask a few questions about your house and situation.', angleOffset: 270 },
  { num: 2, title: 'Get your cash offer', desc: 'We\'ll review your property and send you a fair cash offer—usually within 24 hours.', angleOffset: 30 },
  { num: 3, title: 'Close on your timeline', desc: 'Accept the offer and close when it works for you. We handle the rest. Cash at closing.', angleOffset: 150 },
];

function StepCard({
  step,
  orbitTime,
}: {
  step: (typeof STEPS)[number];
  orbitTime: ReturnType<typeof useMotionValue<number>>;
}) {
  const angle = useTransform(orbitTime, (t) => ((t + step.angleOffset) % 360) * DEG);
  const x = useTransform(angle, (a) => Math.cos(a) * RADIUS_X);
  const y = useTransform(angle, (a) => Math.sin(a) * RADIUS_Y);
  /* Card at top of arc (center) = slightly larger */
  const scale = useTransform(angle, (a) => {
    const top = (Math.sin(a) + 1) / 2;
    return 0.9 + 0.15 * top;
  });
  const opacity = useTransform(angle, (a) => {
    const top = (Math.sin(a) + 1) / 2;
    return 0.75 + 0.25 * top;
  });

  return (
    <div className="cb-how-rainbow-card-wrap">
      <motion.div
        className="cb-step cb-step-rainbow"
        style={{ x, y, scale, opacity }}
      >
        <div className="cb-step-num">{step.num}</div>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </motion.div>
    </div>
  );
}

export default function HowItWorksRainbow() {
  const [mounted, setMounted] = useState(false);
  const orbitTime = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    let stepIndex = 0;

    const runStep = async () => {
      if (cancelled) return;
      /* After 240 we go to 360 then reset to 0 for smooth loop */
      const target = stepIndex === 2 ? 360 : CENTER_STEPS[stepIndex];
      await new Promise<void>((resolve) => {
        animate(orbitTime, target, {
          ...STEP_SPRING,
          onComplete: () => {
            if (stepIndex === 2) orbitTime.set(0);
            resolve();
          },
        });
      });
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, PAUSE_AT_CENTER_MS));
      if (cancelled) return;
      stepIndex = (stepIndex + 1) % CENTER_STEPS.length;
      runStep();
    };

    runStep();
    return () => {
      cancelled = true;
    };
  }, [mounted, orbitTime]);

  if (!mounted) return null;

  return (
    <div className="cb-how-rainbow">
      <div className="cb-how-rainbow__track">
        {STEPS.map((step) => (
          <StepCard key={step.num} step={step} orbitTime={orbitTime} />
        ))}
      </div>
    </div>
  );
}
