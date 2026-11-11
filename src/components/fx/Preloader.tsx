import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from 'motion/react';

/**
 * Preloader "messa a registro": le tre lastre C/M/Y del monogramma arrivano
 * fuori registro e si sovrappongono fino a formare il nero. Poi il foglio
 * si apre in due come una pagina tagliata.
 */
export const Preloader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [visible, setVisible] = useState(true);
  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (v) => String(Math.round(v)).padStart(3, '0'));
  const seg0 = useTransform(progress, [0, 25], [0, 1]);
  const seg1 = useTransform(progress, [25, 50], [0, 1]);
  const seg2 = useTransform(progress, [50, 75], [0, 1]);
  const seg3 = useTransform(progress, [75, 100], [0, 1]);
  const segs = [seg0, seg1, seg2, seg3];

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const controls = animate(progress, 100, {
      duration: reduced ? 0.2 : 2,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setTimeout(() => setVisible(false), reduced ? 0 : 250);
      },
    });
    return () => controls.stop();
  }, [progress]);

  const plates = [
    { color: '#00A0E3', from: { x: -70, y: -40, rotate: -8 } },
    { color: '#E6007E', from: { x: 60, y: 30, rotate: 6 } },
    { color: '#FFD400', from: { x: 10, y: 70, rotate: -3 } },
  ];

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] pointer-events-auto"
          aria-label="Caricamento"
          role="progressbar"
        >
          {/* Metà superiore e inferiore del foglio */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-paper"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-paper"
            exit={{ y: '100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative w-[220px] h-[160px] sm:w-[300px] sm:h-[200px] flex items-center justify-center">
              {plates.map((p, i) => (
                <motion.span
                  key={p.color}
                  className="absolute font-serif italic font-light text-[120px] sm:text-[170px] leading-none mix-blend-multiply select-none"
                  style={{ color: p.color }}
                  initial={{ ...p.from, opacity: 0 }}
                  animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  transition={{ duration: 1.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  AM
                </motion.span>
              ))}
              {/* Crocini di registro agli angoli */}
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                <motion.svg
                  key={pos}
                  className={`absolute ${pos} w-5 h-5 text-ink`}
                  viewBox="0 0 20 20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: 90 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
                  <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
                </motion.svg>
              ))}
            </div>

            <div className="mt-10 w-[220px] sm:w-[300px] font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
              <div className="flex justify-between mb-2">
                <span>Messa a registro</span>
                <motion.span>{rounded}</motion.span>
              </div>
              <div className="h-[3px] w-full flex">
                {['bg-cy', 'bg-mag', 'bg-yel', 'bg-ink'].map((c, i) => (
                  <motion.div
                    key={c}
                    className={`h-full flex-1 origin-left ${c}`}
                    style={{ scaleX: segs[i] }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
