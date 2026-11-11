import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, Check, Copy, Download, Mail, Globe } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { SplitReveal } from './fx/SplitReveal';
import { Misregister } from './fx/Misregister';
import { CropMarks, ColorBar } from './fx/CropMarks';
import { Magnetic } from './fx/Magnetic';

interface CurriculumViewProps {
  onBackToPortfolio: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: EASE },
};

/** Sezione editoriale: etichetta numerata a sinistra (sticky), contenuto a destra. */
const Section: React.FC<{ id: string; n: string; title: string; note?: string; children: React.ReactNode }> = ({
  id,
  n,
  title,
  note,
  children,
}) => (
  <section id={id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-14 sm:py-20 border-t border-ink">
    <div className="lg:col-span-4">
      <div className="lg:sticky lg:top-28">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mag">{n}</span>
        <h3 className="mt-2 font-serif font-light text-4xl sm:text-5xl tracking-[-0.02em] leading-none">
          <SplitReveal text={title} by="word" inView stagger={0.06} />
        </h3>
        {note && <p className="mt-3 text-sm text-ink-soft max-w-xs">{note}</p>}
      </div>
    </div>
    <div className="lg:col-span-8">{children}</div>
  </section>
);

const Timeline: React.FC = () => {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <ol ref={ref} className="relative pl-8 sm:pl-12">
      <span aria-hidden className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-ink/15" />
      <motion.span
        aria-hidden
        className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-mag origin-top"
        style={{ scaleY }}
      />
      {RESUME_DATA.experiences.map((exp, i) => (
        <motion.li key={exp.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }} className="group relative pb-12 last:pb-0">
          <span
            aria-hidden
            className="absolute -left-8 sm:-left-12 top-1.5 w-[15px] h-[15px] sm:w-[23px] sm:h-[23px] rounded-full border border-ink bg-paper grid place-items-center transition-colors duration-300 group-hover:bg-mag group-hover:border-mag"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ink group-hover:bg-paper transition-colors" />
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
            <h4 className="font-serif text-3xl sm:text-4xl tracking-tight transition-[font-style] group-hover:italic">{exp.role}</h4>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft shrink-0">{exp.period}</span>
          </div>
          <div className="mt-1 text-base font-medium text-ink-2">{exp.company}</div>
          <ul className="mt-4 space-y-2.5">
            {exp.keyActivities.map((a, k) => (
              <li key={k} className="grid grid-cols-[1.5rem_1fr] text-[15px] leading-relaxed text-ink-2">
                <span className="font-mono text-[10px] text-mag pt-1">{String(k + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span key={t} className="font-mono text-[10px] uppercase tracking-[0.12em] border border-ink/20 rounded-full px-3 py-1">
                {t}
              </span>
            ))}
          </div>
        </motion.li>
      ))}
    </ol>
  );
};

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onBackToPortfolio }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard non disponibile */
    }
  };

  return (
    <div id="curriculum-page" className="relative pt-24 sm:pt-28 pb-10">
      <div aria-hidden className="layout-grid absolute inset-0 pointer-events-none" />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Barra azioni */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink pt-3">
          <button
            onClick={onBackToPortfolio}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Portfolio
          </button>
          <div className="flex gap-2">
            <button
              id="cv-copy-email-btn"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 min-h-[44px] font-mono text-[11px] uppercase tracking-[0.12em] hover:border-ink transition-colors"
              aria-live="polite"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-mag" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiata' : 'Copia email'}
            </button>
            <a
              id="cv-print-btn"
              href="./CV_Mele.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 min-h-[44px] font-mono text-[11px] uppercase tracking-[0.12em]"
            >
              <span className="absolute inset-0 bg-mag translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              <Download className="relative w-3.5 h-3.5" />
              <span className="relative">CV in PDF</span>
            </a>
          </div>
        </div>

        {/* Testata */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-14 sm:pt-20 pb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] mb-6">
              <span className="w-8 h-px bg-mag" />
              Curriculum Vitae
            </div>
            <h1 className="font-serif font-light text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.04em]">
              <span className="sr-only">Alice Mariarita Mele</span>
              <span aria-hidden className="block">
                <Misregister>Alice</Misregister>
              </span>
              <span aria-hidden className="block italic">
                <SplitReveal text="Mariarita Mele" stagger={0.03} delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
              className="mt-8 max-w-2xl text-lg sm:text-xl leading-snug text-ink-2"
            >
              <span className="font-serif italic text-mag">Graphic Designer</span> — specializzata nella progettazione per la
              stampa, grafica editoriale d’arte e costruzione di identità visive coerenti. Coniugo rigore metodologico,
              sensibilità materica per i supporti cartacei e precisione tipografica in ogni fase del lavoro.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${RESUME_DATA.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink px-5 min-h-[48px] text-sm hover:bg-ink hover:text-paper transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate max-w-[230px] sm:max-w-none">{RESUME_DATA.email}</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="https://amale.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink px-5 min-h-[48px] text-sm hover:bg-ink hover:text-paper transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  amale.eu
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-4 relative w-full max-w-xs mx-auto lg:ml-auto lg:mr-0"
            initial={{ opacity: 0, rotate: 6, y: 60 }}
            animate={{ opacity: 1, rotate: -2, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          >
            <div className="relative bg-white p-3 shadow-[0_30px_60px_-25px_rgba(20,19,18,0.4)]">
              <div className="relative aspect-[4/5] bg-paper-2 overflow-hidden">
                <span aria-hidden className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-yel" />
                <span aria-hidden className="halftone absolute bottom-0 left-0 w-2/3 h-1/2 text-mag opacity-50" />
                <img
                  src="./Alice_photo.png"
                  alt="Alice Mariarita Mele — Graphic Designer"
                  className="relative w-full h-full object-contain object-bottom"
                />
              </div>
              <div className="flex justify-between pt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
                <span>A. M. Mele</span>
                <span>Verona</span>
              </div>
              <CropMarks className="text-ink/50" offset={10} />
            </div>
          </motion.div>
        </header>

        <ColorBar className="h-2 mb-0" />

        <Section id="cv-profile" n="01" title="Profilo">
          <motion.div {...fadeUp} className="space-y-6">
            <p className="font-serif font-light text-2xl sm:text-3xl leading-[1.25] tracking-[-0.01em]">
              Mi piace costruire progetti grafici in cui estetica e funzionalità lavorano insieme in perfetta armonia.
              Credo che la grafica destinata alla stampa conservi un valore sensoriale insostituibile: il peso e la grana
              di una carta speciale, la brillantezza di un inchiostro calibrato, la griglia invisibile che guida l’occhio
              nella lettura di un testo articolato.
            </p>
            <p className="text-lg leading-relaxed text-ink-2 max-w-2xl">
              Il mio percorso unisce sensibilità visiva contemporanea, rigore tecnico nella gestione della prestampa
              (abbondanze, profili colore) e una costante attenzione alle esigenze dei clienti e delle istituzioni culturali.
            </p>
          </motion.div>
        </Section>

        <Section id="cv-experiences" n="02" title="Esperienze" note="Percorso professionale e progetti svolti in agenzie e tipografie.">
          <Timeline />
        </Section>

        <Section id="cv-education" n="03" title="Formazione" note="Percorso di studi in grafica e comunicazione.">
          <div className="border-t border-ink/15">
            {RESUME_DATA.education.map((edu, i) => (
              <motion.div
                key={edu.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="group grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6 py-6 border-b border-ink/15"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mag pt-1">{edu.period}</span>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl tracking-tight leading-tight transition-transform duration-500 group-hover:translate-x-2">
                    {edu.degree}
                  </h4>
                  <p className="mt-1 text-ink-2">{edu.school}</p>
                  {edu.specialization && <p className="mt-2 text-sm text-ink-soft">{edu.specialization}</p>}
                  {edu.details && <p className="mt-2 text-sm italic text-ink-soft">{edu.details}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="cv-skills" n="04" title="Competenze" note="Aree di specializzazione e metodologie progettuali.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {RESUME_DATA.skillCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="group relative bg-paper p-6 overflow-hidden"
              >
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
                    ['bg-cy', 'bg-mag', 'bg-yel'][i % 3]
                  }`}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-2 font-serif text-2xl tracking-tight leading-tight">{cat.title}</h4>
                <p className="mt-2 text-sm text-ink-soft">{cat.description}</p>
                <ul className="mt-5 space-y-2">
                  {cat.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm leading-snug">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mag shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="cv-software" n="05" title="Software" note="Applicazioni e tool di lavoro per layout, vettori, video e prestampa.">
          <ul className="border-t border-ink">
            {RESUME_DATA.softwareTools.map((tool, i) => {
              const lvl = tool.level === 'Avanzato' ? 3 : tool.level === 'Intermedio' ? 2 : 1;
              return (
                <motion.li
                  key={tool.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
                  className="group grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_8rem_9rem] items-center gap-4 py-4 border-b border-ink/15"
                >
                  <span className="font-serif text-xl sm:text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {tool.name}
                  </span>
                  <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                    {tool.category}
                  </span>
                  <span className="flex items-center gap-3 justify-end">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft hidden sm:inline">
                      {tool.level}
                    </span>
                    <span className="flex gap-1" aria-label={`Livello: ${tool.level}`}>
                      {[1, 2, 3].map((d) => (
                        <motion.span
                          key={d}
                          className={`w-2.5 h-2.5 rounded-full ${d <= lvl ? 'bg-ink group-hover:bg-mag' : 'border border-ink/30'} transition-colors`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.04 + d * 0.06, type: 'spring', stiffness: 400, damping: 15 }}
                        />
                      ))}
                    </span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </Section>

        <Section id="cv-languages" n="06" title="Lingue">
          <div className="space-y-8">
            {RESUME_DATA.languages.map((lang, i) => (
              <div key={lang.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-3xl tracking-tight">{lang.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">{lang.level}</span>
                </div>
                <div className="mt-3 h-3 bg-paper-2 overflow-hidden">
                  <motion.div
                    className={`h-full ${i % 2 ? 'bg-cy' : 'bg-mag'}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};
