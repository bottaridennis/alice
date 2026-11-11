import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import { Project } from '../types';
import { CropMarks } from './fx/CropMarks';
import { SplitReveal } from './fx/SplitReveal';

interface ProjectModalProps {
  project: Project;
  origin: { x: number; y: number };
  index: number;
  total: number;
  nextProject: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Scheda progetto a tutto schermo: si apre con una maschera circolare
 * che parte dal punto del click, come un'inchiostrazione che si allarga.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  origin,
  index,
  total,
  nextProject,
  onClose,
  onNext,
  onPrev,
}) => {
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [title, sub] = project.title.split(' – ');

  // Navigazione da tastiera (dipende dalle callback correnti)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  // Blocco scroll e gestione focus: solo all'apertura/chiusura
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  const at = `${origin.x}px ${origin.y}px`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      id="project-modal-dialog"
      className="fixed inset-0 z-[90] bg-paper text-ink"
      initial={{ clipPath: `circle(0% at ${at})` }}
      animate={{ clipPath: `circle(150% at ${at})` }}
      exit={{ clipPath: `circle(0% at ${at})` }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div ref={scroller} className="h-full overflow-y-auto overscroll-contain">
        {/* Barra superiore */}
        <div className="sticky top-0 z-20 bg-paper/90 backdrop-blur-md border-b border-ink/10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.14em] min-w-0">
              <span>
                Tav. <span className="text-mag">{pad(index + 1)}</span> / {pad(total)}
              </span>
              <span className="hidden sm:inline text-ink-soft truncate">{project.categories.join(' · ')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                id="modal-prev-btn"
                onClick={onPrev}
                title="Progetto precedente (←)"
                aria-label="Progetto precedente"
                className="w-11 h-11 rounded-full border border-ink/20 grid place-items-center hover:bg-ink hover:text-paper transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                id="modal-next-btn"
                onClick={onNext}
                title="Progetto successivo (→)"
                aria-label="Progetto successivo"
                className="w-11 h-11 rounded-full border border-ink/20 grid place-items-center hover:bg-ink hover:text-paper transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                ref={closeBtn}
                id="modal-close-btn"
                onClick={onClose}
                title="Chiudi (Esc)"
                aria-label="Chiudi"
                className="group ml-1 w-11 h-11 rounded-full bg-ink text-paper grid place-items-center hover:bg-mag transition-colors"
              >
                <X className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Tavola */}
              <div className="lg:col-span-7">
                <div className="lg:sticky lg:top-24">
                  <motion.div
                    className="relative bg-white p-3 sm:p-5 shadow-[0_40px_80px_-30px_rgba(20,19,18,0.35)]"
                    initial={{ y: 80, rotate: -2, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.25, ease: EASE }}
                  >
                    <CropMarks className="text-ink/60" offset={-2} />
                    {project.pdf ? (
                      <a
                        href={project.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="view"
                        data-cursor-label="PDF ↗"
                        className="group block relative overflow-hidden"
                        title="Apri il PDF completo in una nuova scheda"
                      >
                        <img
                          src={project.cover || project.coverImage}
                          alt={project.title}
                          className="w-full h-auto max-h-[78vh] object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </a>
                    ) : (
                      <img
                        src={project.cover || project.coverImage}
                        alt={project.title}
                        className="w-full h-auto max-h-[78vh] object-contain mx-auto"
                      />
                    )}
                  </motion.div>
                  <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                    <span>Fig. {pad(index + 1)} — Prima pagina</span>
                    <span>Clicca per il PDF</span>
                  </div>
                </div>
              </div>

              {/* Testi */}
              <div className="lg:col-span-5">
                <h2
                  id="project-modal-title"
                  className="font-serif font-light text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] tracking-[-0.03em]"
                >
                  <SplitReveal text={title} by="word" stagger={0.06} delay={0.35} />
                </h2>
                {sub && (
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.7, ease: EASE }}
                    className="mt-3 font-serif italic text-2xl sm:text-3xl text-mag"
                  >
                    {sub}
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
                >
                  {project.summary && (
                    <p className="mt-8 text-xl leading-snug text-ink">{project.summary}</p>
                  )}
                  <p className="mt-6 text-base leading-relaxed text-ink-2 whitespace-pre-line">{project.description}</p>

                  {/* Scheda tecnica */}
                  <dl className="mt-10 border-t border-ink">
                    {[
                      ['Disciplina', project.categories.join(', ')],
                      ['Ambito', project.category.split(' / ').join(' · ')],
                      ['Tag', (project.tags ?? []).join(', ')],
                    ].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 py-3 border-b border-ink/15">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft pt-0.5">{k}</dt>
                        <dd className="text-sm">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* Palette */}
                  {project.palette && project.palette.length > 0 && (
                    <div className="mt-8">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Palette</span>
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {project.palette.map((c, i) => (
                          <motion.div
                            key={c + i}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.9 + i * 0.07, duration: 0.6, ease: EASE }}
                            className="origin-bottom"
                          >
                            <div className="aspect-square border border-ink/10" style={{ background: c }} />
                            <span className="block mt-1.5 font-mono text-[10px] uppercase">{c}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.pdf && (
                    <a
                      href={project.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden mt-10 w-full inline-flex items-center justify-between gap-3 rounded-full bg-ink text-paper pl-7 pr-2 py-2 min-h-[60px]"
                    >
                      <span className="absolute inset-0 bg-mag -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      <span className="relative flex items-center gap-2.5 font-medium">
                        <FileText className="w-4 h-4" />
                        Apri progetto completo
                      </span>
                      <span className="relative w-11 h-11 rounded-full bg-paper text-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </a>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Prossimo progetto */}
            <button
              onClick={onNext}
              data-cursor="view"
              data-cursor-label="Avanti"
              className="group block w-full text-left border-t border-ink bg-ink text-paper overflow-hidden"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-16 grid grid-cols-[1fr_auto] items-center gap-6">
                <div className="min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-yel">Prossimo progetto →</span>
                  <span className="block mt-3 font-serif font-light text-[clamp(2.2rem,7vw,6rem)] leading-[0.95] tracking-tight truncate transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:italic">
                    {nextProject.title.split(' – ')[0]}
                  </span>
                </div>
                <div className="w-24 sm:w-40 aspect-[3/4] bg-white p-1.5 rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <img src={nextProject.cover || nextProject.coverImage} alt="" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
