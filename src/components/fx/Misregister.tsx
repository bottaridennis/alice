import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'motion/react';

/**
 * Effetto "fuori registro": il testo è stampato in tre lastre (C, M, Y)
 * più il nero. Più veloce si muove il mouse, più le lastre si separano;
 * da fermo tutto torna perfettamente a registro.
 */
export const Misregister: React.FC<{ children: string; className?: string; intensity?: number }> = ({
  children,
  className = '',
  intensity = 1,
}) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const vx = useVelocity(mx);
  const vy = useVelocity(my);
  const svx = useSpring(vx, { stiffness: 120, damping: 30 });
  const svy = useSpring(vy, { stiffness: 120, damping: 30 });

  const clamp = (v: number) => Math.max(-18, Math.min(18, (v / 120) * intensity));
  const cx = useTransform(svx, (v) => clamp(v));
  const cy = useTransform(svy, (v) => clamp(v));
  const mxN = useTransform(svx, (v) => -clamp(v) * 0.8);
  const myN = useTransform(svy, (v) => -clamp(v) * 0.8);
  const yx = useTransform(svy, (v) => clamp(v) * 0.6);
  const yy = useTransform(svx, (v) => -clamp(v) * 0.6);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span aria-hidden className="absolute inset-0 text-cy mix-blend-multiply" style={{ x: cx, y: cy }}>
        {children}
      </motion.span>
      <motion.span aria-hidden className="absolute inset-0 text-mag mix-blend-multiply" style={{ x: mxN, y: myN }}>
        {children}
      </motion.span>
      <motion.span aria-hidden className="absolute inset-0 text-yel mix-blend-multiply" style={{ x: yx, y: yy }}>
        {children}
      </motion.span>
      <span className="relative mix-blend-multiply">{children}</span>
    </span>
  );
};
