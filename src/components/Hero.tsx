import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'motion/react';
import { ArrowDownRight, FileText } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { SplitReveal } from './fx/SplitReveal';
import { Misregister } from './fx/Misregister';
import { Magnetic } from './fx/Magnetic';
import { ColorBar, CropMarks, RegMark } from './fx/CropMarks';

interface HeroProps {
  ready: boolean;
  onNavigateProjects: () => void;
  onNavigateCurriculum: () => void;
  onSelectProject: (project: Project, origin?: { x: number; y: number }) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Un foglio stampato della pila: reagisce a mouse e scroll. */
const Sheet: React.FC<{
  project: Project;
  i: number;
  ready: boolean;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  scroll: MotionValue<number>;
  onOpen: HeroProps['onSelectProject'];
}> = ({ project, i, ready, mx, my, scroll, onOpen }) => {
  const base = [
    { rot: -9, x: '-30%', y: '6%' },
    { rot: 7, x: '28%', y: '-4%' },
    { rot: -1.5, x: '0%', y: '0%' },
  ][i];
  const depth = [0.6, 0.9, 1.3][i];
  const tx = useTransform(mx, (v: number) => v * 18 * depth);
  const ty = useTransform(my, (v: number) => v * 14 * depth);
  const spread = useTransform(scroll, [0, 1], [0, [-120, 140, 0][i]]) as MotionValue<number>;
  const lift = useTransform(scroll, [0, 1], [0, [-60, 40, -180][i]]) as MotionValue<number>;
  const rotS = useTransform(scroll, [0, 1], [base.rot, base.rot * 3.2]);
  const x = useTransform(() => tx.get() + spread.get());
  const y = useTransform(() => ty.get() + lift.get());

  return (
    <motion.div
      className="absolute inset-0 m-auto w-[62%] aspect-[3/4]"
      style={{ left: base.x, top: base.y, zIndex: i + 1 }}
      initial={{ y: 400, opacity: 0, rotate: base.rot * 4 }}
      animate={ready ? { y: 0, opacity: 1, rotate: 0 } : undefined}
      transition={{ duration: 1.3, delay: 0.5 + i * 0.12, ease: EASE }}
    >
      <motion.button
        type="button"
        data-cursor="view"
        data-cursor-label="Apri"
        onClick={(e) => onOpen(project, { x: e.clientX, y: e.clientY })}
        className="group relative block w-full h-full bg-white p-[5%] shadow-[0_30px_60px_-20px_rgba(20,19,18,0.35)] text-left"
        style={{ x, y, rotate: rotS }}
        whileHover={{ scale: 1.04, rotate: 0, zIndex: 10, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
        aria-label={`Apri progetto: ${project.title}`}
      >
        <div className="relative w-full h-[86%] overflow-hidden bg-paper-2">
          <img
            src={project.cover || project.coverImage}
            alt=""
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            loading="eager"
          />
          <span className="halftone absolute inset-0 text-mag opacity-0 group-hover:opacity-40 mix-blend-multiply transition-opacity duration-500" />
        </div>
        <div className="flex items-end justify-between pt-[4%] font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-ink-soft">
          <span className="truncate pr-2">{project.categories[0]}</span>
        </div>
      </motion.button>
    </motion.div>
  );
};

export const Hero: React.FC<HeroProps> = ({ ready, onNavigateProjects, onNavigateCurriculum, onSelectProject }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });
  const stackRX = useTransform(my, (v) => v * -8);
  const stackRY = useTransform(mx, (v) => v * 10);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [rawX, rawY]);

  const featured = [
    ...PROJECTS_DATA.filter((p) => p.featured),
    ...PROJECTS_DATA.filter((p) => !p.featured),
  ].slice(0, 3).reverse();

  const meta = [
    ['Edizione', String(new Date().getFullYear())],
    ['Base', 'Verona, IT'],
    ['Disciplina', 'Print · Editorial · Identity'],
  ];

  return (
    <section
      ref={ref}
      id="hero-section"
      className="relative min-h-[100svh] pt-24 sm:pt-28 pb-10 flex flex-col overflow-hidden"
    >
      {/* Griglia di impaginazione */}
      <div aria-hidden className="layout-grid absolute inset-0 pointer-events-none" />

      <div className="relative max-w-[1440px] w-full mx-auto px-4 sm:px-8 flex-1 flex flex-col">
        {/* Riga meta in stile colophon */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 border-t border-ink pt-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em]"
        >
          {meta.map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <span className="text-ink-soft">{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div className="hidden sm:flex justify-end items-start">
            <RegMark size={22} className="text-ink animate-spin-slow" />
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center pt-8 sm:pt-12">
          {/* Nome */}
          <motion.div className="lg:col-span-7 relative z-10" style={{ y: nameY, opacity: nameOpacity }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : undefined}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-4 font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              <span className="w-8 h-px bg-mag" />
              <span>Graphic Designer</span>
            </motion.div>

            <h1 className="font-serif font-light leading-[0.86] tracking-[-0.035em] text-[clamp(3.6rem,12.5vw,11.5rem)] lg:text-[clamp(4rem,9.6vw,11.5rem)]">
              <span className="sr-only">Alice Mariarita Mele</span>
              <motion.span
                aria-hidden
                className="block"
                initial={{ clipPath: 'inset(100% -20% -20% -20%)', y: '30%' }}
                animate={ready ? { clipPath: 'inset(-30% -20% -20% -20%)', y: '0%' } : undefined}
                transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
              >
                <Misregister intensity={1.2}>Alice</Misregister>
              </motion.span>
              <span aria-hidden className="block italic pl-[8%] text-ink">
                <SplitReveal text="Mariarita" play={ready} delay={0.35} stagger={0.035} />
              </span>
              <span aria-hidden className="block">
                <SplitReveal text="Mele" play={ready} delay={0.55} stagger={0.05} charClassName="font-normal" />
                <motion.span
                  className="inline-block w-[0.18em] h-[0.18em] rounded-full bg-mag align-baseline ml-[0.06em]"
                  initial={{ scale: 0 }}
                  animate={ready ? { scale: 1 } : undefined}
                  transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 1.1 }}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
              className="mt-8 max-w-[34rem] text-lg sm:text-xl leading-snug text-ink-2"
            >
              Progetto identità visive e materiali grafici capaci di trasformare idee, informazioni e contenuti in{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 font-serif italic">esperienze visive chiare</span>
                <motion.span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-[0.08em] h-[0.45em] bg-yel -z-0 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={ready ? { scaleX: 1 } : undefined}
                  transition={{ duration: 0.8, delay: 1.5, ease: [0.76, 0, 0.24, 1] }}
                />
              </span>
              , riconoscibili e coinvolgenti.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Magnetic>
                <button
                  id="hero-cta-projects"
                  onClick={onNavigateProjects}
                  className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-ink text-paper pl-7 pr-2 py-2 min-h-[56px] text-base font-medium"
                >
                  <span className="absolute inset-0 bg-mag translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                  <span className="relative">Scopri i miei progetti</span>
                  <span className="relative w-10 h-10 rounded-full bg-paper text-ink grid place-items-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                    <ArrowDownRight className="w-4 h-4" />
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  id="hero-cta-curriculum"
                  onClick={onNavigateCurriculum}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-ink px-7 min-h-[56px] text-base font-medium hover:bg-ink hover:text-paper transition-colors duration-300"
                >
                  <FileText className="w-4 h-4" />
                  <span>Curriculum</span>
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Pila di fogli stampati */}
          <div className="lg:col-span-5 relative h-[440px] sm:h-[560px] lg:h-[620px] [perspective:1400px]">
            <motion.div
              className="relative w-full h-full [transform-style:preserve-3d]"
              style={{ rotateX: stackRX, rotateY: stackRY }}
            >
              {featured.map((p, i) => (
                <Sheet
                  key={p.id}
                  project={p}
                  i={i}
                  ready={ready}
                  mx={mx}
                  my={my}
                  scroll={scrollYProgress}
                  onOpen={onSelectProject}
                />
              ))}
            </motion.div>
            <div className="absolute inset-[6%] pointer-events-none">
              <CropMarks className="text-ink/50" offset={0} size={22} />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : undefined}
              transition={{ delay: 1.6 }}
              className="absolute bottom-0 right-0 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft"
            >
              Fig. 01 — Lavori in evidenza
            </motion.span>
          </div>
        </div>

        {/* Piede: barra colore + scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: 1.2 }}
          className="mt-10 flex items-end gap-6"
        >
          <ColorBar className="flex-1 max-w-md" />
          <button
            onClick={onNavigateProjects}
            className="ml-auto flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]"
          >
            <span>Scorri</span>
            <span className="relative w-px h-10 bg-ink/20 overflow-hidden">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-ink"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
              />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
