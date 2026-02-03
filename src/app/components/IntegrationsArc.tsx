'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const INTEGRATIONS = [
  { id: 1, name: 'Slack', subtitle: 'Team messaging', rotation: -14 },
  { id: 2, name: 'Notion', subtitle: 'Docs & wiki', rotation: -7 },
  { id: 3, name: 'Loom', subtitle: 'Video feedback & communication', rotation: 0, active: true },
  { id: 4, name: 'Figma', subtitle: 'Design collaboration', rotation: 7 },
  { id: 5, name: 'Linear', subtitle: 'Issue tracking', rotation: 14 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  }),
};

export default function IntegrationsArc() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="cb-integrations-arc">
      <div className="cb-integrations-arc__inner">
        <motion.div
          className="cb-integrations-arc__row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {INTEGRATIONS.map((item, index) => (
            <motion.div
              key={item.id}
              className="cb-integrations-card-wrap"
              variants={cardVariants}
              custom={index}
            >
              <motion.div
                className={`cb-integrations-card ${item.active ? 'cb-integrations-card--active' : ''}`}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="cb-integrations-card__icon">
                  {item.active ? (
                    <span className="cb-integrations-card__icon-text">▶</span>
                  ) : (
                    <span className="cb-integrations-card__icon-text">{item.name.charAt(0)}</span>
                  )}
                </div>
                <span className="cb-integrations-card__name">{item.name}</span>
                {item.active && (
                  <div className="cb-integrations-card__active-label">
                    <span className="cb-integrations-card__active-title">{item.name}</span>
                    <span className="cb-integrations-card__active-subtitle">{item.subtitle}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
