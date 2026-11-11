import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { RESUME_DATA, PROJECTS_DATA } from '../data/portfolioData';
import { ScrollWords } from './fx/ScrollWords';
import { Counter } from './fx/Counter';
import { CircleText } from './fx/CircleText';
import { CropMarks } from './fx/CropMarks';
import { Magnetic } from './fx/Magnetic';

interface AboutPreviewProps {
  onNavigateCurriculum: () => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ onNavigateCurriculum }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const circleY = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);
  const circleScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  const disciplines = new Set(PROJECTS_DATA.flatMap((p) => p.categories)).size;
  const stats = [
    { n: PROJECTS_DATA.length, label: 'Progetti in portfolio' },
    { n: disciplines, label: 'Discipline' },
    { n: RESUME_DATA.experiences.length, label: 'Esperienze professionali' },
    { n: RESUME_DATA.softwareTools.length, label: 'Software' },
  ];

  return (
    <section ref={ref} id="about-preview-section" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] mb-12 sm:mb-16">
          <span className="text-mag">02</span>
          <span className="w-8 h-px bg-ink" />
          <span>Profilo · Approccio progettuale</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Ritratto */}
          <div className="lg:col-span-5 relative max-w-md mx-auto w-full lg:max-w-none">
            <motion.div
              aria-hidden
              style={{ y: circleY, scale: circleScale }}
              className="absolute -top-8 -left-8 w-2/3 aspect-square rounded-full bg-yel"
            />
            <motion.div
              aria-hidden
              style={{ y: portraitY }}
              className="halftone absolute -bottom-6 -right-6 w-1/2 h-1/2 text-cy opacity-70"
            />
            <motion.div
              className="relative aspect-[4/5] bg-paper-2 overflow-visible"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#fff_0%,transparent_60%)]" />
                <motion.img
                  style={{ y: portraitY }}
                  src="./Alice_photo.png"
                  alt="Alice Mariarita Mele — Graphic Designer"
                  className="relative w-full h-[96%] mt-[4%] object-contain object-bottom grayscale-[0.15] contrast-[1.05]"
                />
              </div>
              <div className="absolute left-0 bottom-0 bg-ink text-paper px-4 py-3">
                <span className="block font-serif italic text-lg leading-none">Alice Mariarita Mele</span>
                <span className="block mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
                  Verona · Graphic & Print
                </span>
              </div>
            </motion.div>
            <div className="absolute inset-0 pointer-events-none">
              <CropMarks className="text-ink/60" offset={14} />
            </div>
            <div className="absolute -top-10 -right-4 sm:-right-10 text-ink bg-paper rounded-full">
              <CircleText text="Graphic Designer • Print & Editorial • " size={128} />
              <span className="absolute inset-0 grid place-items-center font-serif italic text-2xl text-mag">✶</span>
            </div>
          </div>

          {/* Testo */}
          <div className="lg:col-span-7">
            <blockquote className="font-serif font-light text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.08] tracking-[-0.02em]">
              <span className="text-mag font-normal">“</span>
              <ScrollWords
                className="inline"
                text="Mi piace costruire progetti grafici in cui estetica e funzionalità lavorano insieme."
              />
            </blockquote>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2"
            >
              Dalla prima idea alla composizione finale, curo ogni dettaglio cercando di creare soluzioni visive
              semplici, riconoscibili e coerenti. Credo nella forza tattile della stampa, nel rigore della gabbia
              grafica e nel valore della tipografia come voce visiva.
            </motion.p>

            {/* Numeri */}
            <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 border-t border-ink">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`py-5 pr-4 ${i % 2 ? 'pl-4 border-l' : ''} sm:pl-4 sm:first:pl-0 ${i > 0 ? 'sm:border-l' : ''} border-ink/15 ${i > 1 ? 'border-t sm:border-t-0' : ''}`}
                >
                  <dd className="font-serif font-light text-5xl sm:text-6xl tracking-tight">
                    <Counter to={s.n} />
                  </dd>
                  <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{s.label}</dt>
                </motion.div>
              ))}
            </dl>

            <div className="mt-10">
              <Magnetic>
                <button
                  id="about-cta-curriculum"
                  onClick={onNavigateCurriculum}
                  className="group relative overflow-hidden inline-flex items-center gap-4 rounded-full border border-ink pl-7 pr-2 py-2 min-h-[56px] font-medium"
                >
                  <span className="absolute inset-0 bg-ink scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                  <span className="relative group-hover:text-paper transition-colors duration-500">Scopri il mio percorso</span>
                  <span className="relative w-10 h-10 rounded-full bg-mag text-paper grid place-items-center">
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
