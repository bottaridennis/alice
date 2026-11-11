import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

const Word: React.FC<{ children: string; progress: MotionValue<number>; range: [number, number] }> = ({
  children,
  progress,
  range,
}) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};

/** Paragrafo che si "inchiostra" parola per parola mentre si scorre. */
export const ScrollWords: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
};
