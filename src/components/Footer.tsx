import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUp, ArrowUpRight, Copy, Check } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { SplitReveal } from './fx/SplitReveal';
import { Magnetic } from './fx/Magnetic';
import { RollText } from './fx/RollText';
import { ColorBar } from './fx/CropMarks';
import type { NavTarget } from './Navbar';

export const Footer: React.FC<{ onNavigate: (t: NavTarget) => void }> = ({ onNavigate }) => {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const fill = useTransform(scrollYProgress, [0.35, 1], ['100%', '0%']);
  const wordY = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const fillClip = useTransform(fill, (f) => `inset(0 ${f} 0 0)`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard non disponibile */
    }
  };

  return (
    <footer ref={ref} id="contatti" className="relative z-10 bg-ink text-paper overflow-hidden">
      <ColorBar animate={false} className="h-2" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-20 sm:pt-28">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] mb-10">
          <span className="text-yel">03</span>
          <span className="w-8 h-px bg-paper" />
          <span>Contatti</span>
        </div>

        <h2 className="font-serif font-light text-[clamp(2.8rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.035em] max-w-6xl">
          <SplitReveal text="Parliamo del tuo" by="word" inView stagger={0.08} />{' '}
          <SplitReveal
            text="prossimo progetto?"
            by="word"
            inView
            stagger={0.08}
            delay={0.2}
            charClassName="italic text-mag"
          />
        </h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${RESUME_DATA.email}`}
                className="group relative overflow-hidden inline-flex items-center gap-4 rounded-full bg-paper text-ink pl-6 sm:pl-8 pr-2 py-2 min-h-[64px] max-w-full"
              >
                <span className="absolute inset-0 bg-yel translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <RollText text={RESUME_DATA.email} className="relative text-base sm:text-xl font-medium truncate" />
                <span className="relative shrink-0 w-12 h-12 rounded-full bg-ink text-paper grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </a>
            </Magnetic>
            <div className="flex gap-3">
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-5 min-h-[52px] font-mono text-[11px] uppercase tracking-[0.14em] hover:border-paper transition-colors"
                aria-live="polite"
              >
                {copied ? <Check className="w-4 h-4 text-yel" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiata' : 'Copia'}
              </button>
            </div>
          </div>

          <nav className="lg:col-span-4 grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]" aria-label="Footer">
            {(
              [
                ['progetti', 'Lavori'],
                ['about', 'Profilo'],
                ['curriculum', 'Curriculum'],
              ] as [NavTarget, string][]
            ).map(([id, label]) => (
              <button key={id} onClick={() => onNavigate(id)} className="group text-left w-fit py-1">
                <RollText text={label} />
              </button>
            ))}
            <a href="./CV_Mele.pdf" target="_blank" rel="noopener noreferrer" className="group w-fit py-1">
              <RollText text="CV in PDF ↗" />
            </a>
          </nav>
        </div>
      </div>

      {/* Wordmark gigante che si "inchiostra" con lo scroll */}
      <div className="relative mt-20 sm:mt-28 select-none" aria-hidden>
        <motion.div style={{ y: wordY }} className="relative px-2 sm:px-4">
          <div className="font-serif font-light leading-[0.78] tracking-[-0.05em] text-[26.5vw] whitespace-nowrap text-outline-paper opacity-40">
            Alice Mele
          </div>
          <motion.div
            className="absolute inset-0 px-2 sm:px-4 font-serif font-light leading-[0.78] tracking-[-0.05em] text-[26.5vw] whitespace-nowrap text-paper"
            style={{ clipPath: fillClip }}
          >
            Alice Mele
          </motion.div>
        </motion.div>
      </div>

      <div className="relative border-t border-paper/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60">
          <span>© {new Date().getFullYear()} Alice Mariarita Mele — Tutti i diritti riservati</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-paper min-h-[40px]"
            title="Torna all'inizio della pagina"
          >
            <RollText text="Torna su" />
            <span className="w-8 h-8 rounded-full border border-paper/30 grid place-items-center group-hover:bg-paper group-hover:text-ink transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
