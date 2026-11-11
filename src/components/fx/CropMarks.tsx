import React from 'react';
import { motion } from 'motion/react';

/** Crocini di taglio agli angoli di un elemento (position: relative richiesto). */
export const CropMarks: React.FC<{ className?: string; offset?: number; size?: number }> = ({
  className = 'text-ink',
  offset = 10,
  size = 16,
}) => {
  const corners = [
    { top: -offset, left: -offset, r: 0 },
    { top: -offset, right: -offset, r: 90 },
    { bottom: -offset, right: -offset, r: 180 },
    { bottom: -offset, left: -offset, r: 270 },
  ];
  return (
    <>
      {corners.map(({ r, ...pos }, i) => (
        <motion.svg
          key={i}
          aria-hidden
          width={size}
          height={size}
          viewBox="0 0 16 16"
          className={`absolute pointer-events-none ${className}`}
          style={{ ...pos, rotate: r }}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <path d="M0 6 H10 M6 0 V10" stroke="currentColor" strokeWidth="1" fill="none" />
        </motion.svg>
      ))}
    </>
  );
};

/** Segno di registro (cerchio + mirino). */
export const RegMark: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg aria-hidden width={size} height={size} viewBox="0 0 20 20" className={className} fill="none">
    <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1" />
    <circle cx="10" cy="10" r="2" fill="currentColor" />
    <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
  </svg>
);

/** Barra di controllo colore come sui fogli di stampa. */
export const ColorBar: React.FC<{ className?: string; animate?: boolean }> = ({ className = '', animate = true }) => {
  const swatches = [
    '#00A0E3', '#E6007E', '#FFD400', '#141312',
    '#66C6EE', '#F066B2', '#FFE566', '#5B5A57',
    '#B3E3F7', '#F7B3D8', '#FFF2B3', '#A9A7A2',
  ];
  return (
    <div className={`flex h-3 ${className}`} aria-hidden>
      {swatches.map((c, i) => (
        <motion.span
          key={i}
          className="flex-1 origin-bottom"
          style={{ backgroundColor: c }}
          initial={animate ? { scaleY: 0 } : false}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
};
