import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from 'motion/react';

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Nastro infinito che accelera e inverte direzione in base
 * alla velocità di scroll — come carta che scorre in rotativa.
 */
export const Marquee: React.FC<{
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}> = ({ children, baseVelocity = 2, className = '' }) => {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`}>
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex flex-nowrap shrink-0" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
