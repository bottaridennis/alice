import React from 'react';
import { motion } from 'motion/react';

interface SplitRevealProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  by?: 'char' | 'word';
  /** se true l'animazione parte quando entra in viewport */
  inView?: boolean;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
  /** con inView=false: avvia l'animazione solo quando true */
  play?: boolean;
}

/**
 * Testo che "sale" dalla linea di base, lettera per lettera o parola per parola,
 * mascherato come una riga di composizione che entra in pagina.
 */
export const SplitReveal: React.FC<SplitRevealProps> = ({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.03,
  by = 'char',
  inView = false,
  as = 'span',
  play = true,
}) => {
  const Tag = motion[as];
  const words = text.split(' ');
  let index = 0;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item = {
    hidden: { y: '115%', rotate: 8 },
    show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  const trigger = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
    : { initial: 'hidden', animate: play ? 'show' : 'hidden' };

  return (
    <Tag className={className} aria-label={text} variants={container} {...(trigger as object)}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {by === 'word' ? (
            <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
              <motion.span className={`inline-block origin-bottom-left ${charClassName}`} variants={item}>
                {word}
              </motion.span>
            </span>
          ) : (
            word.split('').map((ch) => {
              index++;
              return (
                <span key={index} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
                  <motion.span className={`inline-block origin-bottom-left ${charClassName}`} variants={item}>
                    {ch}
                  </motion.span>
                </span>
              );
            })
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};
