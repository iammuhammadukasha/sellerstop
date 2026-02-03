'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const ORBIT_RADIUS_X = 160;
const ORBIT_RADIUS_Y = 120;
const PAUSE_AT_CENTER_MS = 1600;
const DEG = Math.PI / 180;
/* Push-style motion: softer spring so card change feels like a gentle push */
const STEP_SPRING = { type: 'spring' as const, stiffness: 180, damping: 26 };

/* Cash image for money cards – use your stacked bills image in public/cash-stack.png */
const CASH_IMAGE_URL = '/cash-stack.png';

/* Left: money/cash amount cards. Right: house images only. */
const LEFT_CARDS = [
  { id: 1, angleOffset: 0, amount: 5000 },
  { id: 2, angleOffset: 90, amount: 10000 },
  { id: 3, angleOffset: 180, amount: 15000 },
  { id: 4, angleOffset: 270, amount: 20000 },
];
const RIGHT_HOUSES = [
  { id: 5, angleOffset: 0, image: '/house-1.png' },
  { id: 6, angleOffset: 90, image: '/house-2.png' },
  { id: 7, angleOffset: 180, image: '/house-3.png' },
  { id: 8, angleOffset: 270, image: '/house-4.png' },
];

function DollarCashIcon() {
  return (
    <svg className="hero-orbit-dollar-icon" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stack of bills - back */}
      <rect x="8" y="8" width="18" height="14" rx="1" fill="#0d5c2e" />
      {/* Stack - middle */}
      <rect x="6" y="5" width="18" height="14" rx="1" fill="#156b38" />
      {/* Stack - front (bills) */}
      <rect x="4" y="2" width="18" height="14" rx="1" fill="#1a7a42" stroke="#0d4d2a" strokeWidth="0.6" />
      {/* Bank strap / band */}
      <rect x="4" y="5" width="18" height="6" fill="#c9a227" stroke="#a8861f" strokeWidth="0.5" />
    </svg>
  );
}

function OrbitCard({
  item,
  orbitTime,
  radiusX,
  radiusY,
  side,
}: {
  item: { id: number; angleOffset: number } & (
    | { amount: number }
    | { image: string }
  );
  orbitTime: ReturnType<typeof useMotionValue<number>>;
  radiusX: number;
  radiusY: number;
  side: 'left' | 'right';
}) {
  const angle = useTransform(orbitTime, (t) => (t + item.angleOffset) * DEG);
  const x = useTransform(angle, (a) => Math.cos(a) * radiusX);
  const y = useTransform(angle, (a) => Math.sin(a) * radiusY);
  const focus = useTransform(
    angle,
    (a) => (side === 'left' ? (Math.cos(a) + 1) / 2 : (-Math.cos(a) + 1) / 2)
  );
  const scale = useTransform(focus, (f) => 0.88 + 0.22 * f);
  const opacity = useTransform(focus, (f) => 0.55 + 0.45 * f);
  const isMoney = 'amount' in item;
  const isHouse = 'image' in item;

  return (
    <div className="hero-orbit-card-wrap">
      <motion.div
        className={`hero-orbit-card ${isHouse ? 'hero-orbit-card--house' : ''}`}
        style={{ x, y, scale, opacity }}
      >
        <div className="hero-orbit-card-inner hero-orbit-float">
          {isMoney ? (
            <>
              <div className="hero-orbit-money-icon-wrap">
                <img src={CASH_IMAGE_URL} alt="" className="hero-orbit-cash-img" />
              </div>
              <div className="hero-orbit-amount">
                <span className="hero-orbit-dollar">$</span>
                {(item as { amount: number }).amount.toLocaleString()}
              </div>
            </>
          ) : isHouse ? (
            <div className="hero-orbit-house-wrap">
              <img src={(item as { image: string }).image} alt="" className="hero-orbit-house-img" />
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroOrbit() {
  const [mounted, setMounted] = useState(false);
  const orbitTime = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    const steps = [0, 90, 180, 270];
    let stepIndex = 0;

    const runStep = async () => {
      if (cancelled) return;
      const target = steps[stepIndex];
      await new Promise<void>((resolve) => {
        animate(orbitTime, target, {
          ...STEP_SPRING,
          onComplete: () => resolve(),
        });
      });
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, PAUSE_AT_CENTER_MS));
      if (cancelled) return;
      stepIndex = (stepIndex + 1) % steps.length;
      runStep();
    };

    runStep();
    return () => {
      cancelled = true;
    };
  }, [mounted, orbitTime]);

  if (!mounted) return null;

  return (
    <>
      <div className="hero-orbit-half hero-orbit-half--left">
        {LEFT_CARDS.map((p) => (
          <OrbitCard
            key={p.id}
            item={p}
            orbitTime={orbitTime}
            radiusX={ORBIT_RADIUS_X}
            radiusY={ORBIT_RADIUS_Y}
            side="left"
          />
        ))}
      </div>
      <div className="hero-orbit-half hero-orbit-half--right">
        {RIGHT_HOUSES.map((p) => (
          <OrbitCard
            key={p.id}
            item={p}
            orbitTime={orbitTime}
            radiusX={ORBIT_RADIUS_X}
            radiusY={ORBIT_RADIUS_Y}
            side="right"
          />
        ))}
      </div>
    </>
  );
}
