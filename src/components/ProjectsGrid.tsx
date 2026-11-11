import React, { useMemo, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { ArrowUpRight, LayoutGrid, List } from 'lucide-react';
import { Project, FilterCategory } from '../types';
import { SplitReveal } from './fx/SplitReveal';

interface ProjectsGridProps {
  projects: Project[];
  onSelectProject: (project: Project, origin?: { x: number; y: number }) => void;
}

type Filter = 'Tutti' | FilterCategory;
const FILTERS: { id: Filter; short: string }[] = [
  { id: 'Tutti', short: 'Tutti' },
  { id: 'Editorial Design', short: 'Editorial' },
  { id: 'Poster Design', short: 'Poster' },
  { id: 'Brand & Visual Identity', short: 'Brand' },
  { id: 'Typography & Lettering', short: 'Type' },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');
const cleanTitle = (t: string) => t.split(' – ')[0];
const subTitle = (t: string) => t.split(' – ')[1] ?? '';

/* ─────────────────────────── RITMO DELLA GRIGLIA ───────────────────────────
   Ogni riga somma sempre 12 colonne: l'impaginato resta pieno con qualsiasi
   filtro, alternando moduli larghi e stretti come in una rivista. */

type Slot = { span: number; offset: boolean };
const ROWS = [[7, 5], [4, 8], [4, 4, 4], [5, 7], [8, 4], [6, 6]];
const SPAN_CLASS: Record<number, string> = {
  4: 'md:col-span-4', 5: 'md:col-span-5', 6: 'md:col-span-6',
  7: 'md:col-span-7', 8: 'md:col-span-8', 12: 'md:col-span-12',
};
const ASPECT: Record<number, string> = {
  4: 'aspect-[3/4]', 5: 'aspect-[4/5]', 6: 'aspect-[4/3]',
  7: 'aspect-[4/3]', 8: 'aspect-[16/10]', 12: 'aspect-[21/9]',
};

function layoutSlots(count: number): Slot[] {
  const slots: Slot[] = [];
  let r = 0;
  while (slots.length < count) {
    const left = count - slots.length;
    let row = ROWS[r % ROWS.length];
    if (left < row.length) row = left === 1 ? [8] : left === 2 ? [6, 6] : [4, 4, 4];
    row.forEach((span, i) => slots.push({ span, offset: row.length > 1 && i % 2 === 1 }));
    r++;
  }
  return slots;
}

/* ─────────────────────────── CARD (vista griglia) ─────────────────────────── */

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  slot: Slot;
  onOpen: ProjectsGridProps['onSelectProject'];
}> = ({ project, index, slot, onOpen }) => {
  const span = SPAN_CLASS[slot.span];
  const aspect = ASPECT[slot.span];
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const glareX = useTransform(sry, [-8, 8], ['0%', '100%']);
  const glare = useTransform(
    glareX,
    (g) => `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) ${g}, transparent 70%)`
  );

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{ duration: 0.8, ease: EASE, layout: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className={`${span} col-span-1 ${slot.offset ? 'md:mt-24' : ''}`}
      id={`project-card-${project.id}`}
    >
      <motion.button
        ref={ref}
        type="button"
        data-cursor="view"
        data-cursor-label="Apri"
        onClick={(e) => onOpen(project, { x: e.clientX, y: e.clientY })}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="group block w-full text-left [perspective:1200px]"
        aria-label={`Apri progetto: ${project.title}`}
      >
        <motion.div
          className={`relative ${aspect} overflow-hidden bg-paper-2`}
          style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src={project.cover || project.coverImage}
            alt={project.title}
            loading="lazy"
            style={{ y: imgY }}
            className="absolute inset-[-10%] w-[120%] max-w-none h-[120%] object-cover object-top transition-[transform,filter] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          {/* Retino magenta che si espande dal centro in hover */}
          <span
            aria-hidden
            className="halftone-lg absolute inset-0 text-mag mix-blend-multiply opacity-0 group-hover:opacity-30 transition-[opacity,clip-path] duration-700 [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(75%_at_50%_50%)]"
          />
          {/* Riflesso */}
          <motion.span
            aria-hidden
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: glare }}
          />
          {/* Numero di tavola */}
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.16em] bg-paper/90 backdrop-blur px-2 py-1">
            Tav. {pad(index + 1)}
          </span>
          {/* Strip palette con i colori reali del progetto */}
          {project.palette && (
            <div className="absolute bottom-0 inset-x-0 flex translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
              {project.palette.map((c, i) => (
                <span
                  key={c + i}
                  className="flex-1 h-9 flex items-end px-2 pb-1 font-mono text-[9px] uppercase"
                  style={{ background: c, color: isLight(c) ? '#141312' : '#F2EFE7', transitionDelay: `${i * 40}ms` }}
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        <div className="mt-4 grid grid-cols-[1fr_auto] gap-x-4 items-start border-t border-ink/15 pt-3">
          <div className="min-w-0">
            <h3 className="font-serif text-2xl sm:text-[1.75rem] leading-[1.05] tracking-tight transition-[font-variation-settings] duration-500 [font-variation-settings:'wght'_380] group-hover:[font-variation-settings:'wght'_620]">
              {cleanTitle(project.title)}
            </h3>
            <p className="mt-1 font-serif italic text-ink-soft">{subTitle(project.title)}</p>
          </div>
          <span className="mt-1 w-10 h-10 rounded-full border border-ink/20 grid place-items-center overflow-hidden relative group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-colors duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6" />
            <ArrowUpRight className="w-4 h-4 absolute -translate-x-6 translate-y-6 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
          </span>
          <div className="col-span-2 mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            {project.categories.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </motion.button>
    </motion.article>
  );
};

function isLight(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

/* ─────────────────────────── VISTA INDICE ─────────────────────────── */

const IndexView: React.FC<{ projects: Project[]; onOpen: ProjectsGridProps['onSelectProject'] }> = ({
  projects,
  onOpen,
}) => {
  const [active, setActive] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 18, mass: 0.5 });
  const vx = useVelocity(sx);
  const rotate = useTransform(vx, [-2000, 2000], [-18, 18], { clamp: true });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-ink">
        {projects.map((p, i) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: i * 0.03, ease: EASE }}
            className="border-b border-ink/20"
          >
            <button
              type="button"
              data-cursor="view"
              data-cursor-label="Apri"
              onPointerEnter={() => setActive(p)}
              onFocus={() => setActive(p)}
              onClick={(e) => onOpen(p, { x: e.clientX, y: e.clientY })}
              className="group relative w-full grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_16rem_3rem] items-center gap-4 py-5 sm:py-6 text-left overflow-hidden"
            >
              <span className="absolute inset-0 bg-ink origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              <span className="relative font-mono text-xs text-ink-soft group-hover:text-yel transition-colors">
                {pad(i + 1)}
              </span>
              <span className="relative min-w-0">
                <span className="block font-serif text-3xl sm:text-5xl tracking-tight leading-none truncate transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:text-paper group-hover:italic">
                  {cleanTitle(p.title)}
                </span>
                <span className="md:hidden block mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft group-hover:text-paper/60">
                  {p.categories[0]}
                </span>
              </span>
              <span className="relative hidden md:block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft group-hover:text-paper/70 transition-colors">
                {p.categories.join(' / ')}
              </span>
              <ArrowUpRight className="relative w-6 h-6 justify-self-end transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-mag" />
            </button>
          </motion.li>
        ))}
      </ul>

      {/* Anteprima che segue il cursore */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
        style={{ x: sx, y: sy, rotate }}
      >
        <AnimatePresence mode="popLayout">
          {active && (
            <motion.div
              key={active.id}
              initial={{ scale: 0.5, opacity: 0, clipPath: 'inset(50% 50% 50% 50%)' }}
              animate={{ scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="-translate-x-1/2 -translate-y-1/2 w-[300px] aspect-[4/5] bg-white p-2.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
            >
              <img src={active.cover || active.coverImage} alt="" className="w-full h-full object-cover object-top" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────── SEZIONE ─────────────────────────── */

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onSelectProject }) => {
  const [filter, setFilter] = useState<Filter>('Tutti');
  const [view, setView] = useState<'grid' | 'index'>('grid');

  const counts = useMemo(() => {
    const m: Record<string, number> = { Tutti: projects.length };
    projects.forEach((p) => p.categories.forEach((c) => (m[c] = (m[c] ?? 0) + 1)));
    return m;
  }, [projects]);

  const visible = useMemo(
    () => (filter === 'Tutti' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter, projects]
  );
  const slots = useMemo(() => layoutSlots(visible.length), [visible.length]);

  return (
    <section id="progetti" className="relative py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Intestazione */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] mb-4">
              <span className="text-mag">01</span>
              <span className="w-8 h-px bg-ink" />
              <span>Selezione lavori</span>
            </div>
            <h2 className="font-serif font-light text-[clamp(3.2rem,10vw,9rem)] leading-[0.88] tracking-[-0.04em]">
              <SplitReveal text="Progetti" inView stagger={0.04} />
              <sup className="font-mono text-base sm:text-xl align-top ml-2 tracking-normal text-mag">
                ({pad(projects.length)})
              </sup>
            </h2>
          </div>
          <p className="lg:col-span-4 text-ink-2 text-base sm:text-lg leading-snug">
            Dalla locandina all'impaginato editoriale, dal lettering all'identità visiva: ogni progetto è
            consultabile in anteprima e nel PDF originale.
          </p>
        </div>

        {/* Barra filtri + vista */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between gap-4">
            <LayoutGroup id="filters">
              <div role="tablist" aria-label="Filtra per categoria" className="flex gap-1 overflow-x-auto -mx-1 px-1 [scrollbar-width:none]">
                {FILTERS.map((f) => {
                  const on = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      role="tab"
                      aria-selected={on}
                      onClick={() => setFilter(f.id)}
                      className={`relative shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                        on ? 'text-paper' : 'text-ink hover:text-mag'
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="filter-pill"
                          className="absolute inset-0 rounded-full bg-ink"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative">
                        <span className="sm:hidden">{f.short}</span>
                        <span className="hidden sm:inline">{f.id}</span>
                        <sup className={`ml-1 font-mono text-[9px] ${on ? 'text-yel' : 'text-ink-soft'}`}>
                          {counts[f.id] ?? 0}
                        </sup>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            <div className="hidden sm:flex shrink-0 border border-ink rounded-full p-1" role="group" aria-label="Vista">
              {(
                [
                  ['grid', LayoutGrid, 'Griglia'],
                  ['index', List, 'Indice'],
                ] as const
              ).map(([id, Icon, label]) => (
                <button
                  key={id}
                  onClick={() => setView(id)}
                  aria-pressed={view === id}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                    view === id ? 'text-paper' : ''
                  }`}
                >
                  {view === id && (
                    <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-mag" />
                  )}
                  <Icon className="relative w-3.5 h-3.5" />
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenuto */}
        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-x-6 lg:gap-x-10 gap-y-14 sm:gap-y-16">
                <AnimatePresence mode="popLayout">
                  {visible.map((p, i) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      slot={slots[i]}
                      index={projects.indexOf(p)}
                      onOpen={onSelectProject}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                <IndexView key={filter} projects={visible} onOpen={onSelectProject} />
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
