import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

/**
 * Cursore "segno di registro": un mirino da tipografia che segue il puntatore.
 * Su elementi con data-cursor="view" si espande e mostra un'etichetta
 * (data-cursor-label). Attivo solo su dispositivi con puntatore preciso.
 */
export const Cursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const lx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.6 });
  const ly = useSpring(y, { stiffness: 140, damping: 20, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor], a, button');
      if (target?.dataset.cursor === 'view') {
        setLabel(target.dataset.cursorLabel || 'Apri');
        setHovering(false);
      } else if (target) {
        setLabel(null);
        setHovering(true);
      } else {
        setLabel(null);
        setHovering(false);
      }
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => { x.set(-100); y.set(-100); };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Mirino di registro */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 relative"
          animate={{
            scale: label ? 0 : pressed ? 0.7 : hovering ? 1.8 : 1,
            rotate: hovering ? 45 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-white">
            <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1.2" />
            <line x1="14" y1="0" x2="14" y2="28" stroke="currentColor" strokeWidth="1.2" />
            <line x1="0" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Bolla etichetta su progetti */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[199]"
        style={{ x: lx, y: ly }}
      >
        <AnimatePresence>
          {label && (
            <motion.div
              key="bubble"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="-translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-mag text-paper flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.15em] shadow-[0_10px_40px_rgba(230,0,126,0.35)]"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
