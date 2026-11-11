import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'motion/react';

/** Numero che conta fino al valore quando entra in viewport. */
export const Counter: React.FC<{ to: number; pad?: number; className?: string }> = ({ to, pad = 2, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = String(Math.round(v)).padStart(pad, '0');
      },
    });
    return () => controls.stop();
  }, [inView, to, pad]);

  return (
    <span ref={ref} className={className}>
      {'0'.padStart(pad, '0')}
    </span>
  );
};
