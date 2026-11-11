import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useScroll, useSpring, useTransform } from 'motion/react';
import { PageType, Project } from './types';
import { PROJECTS_DATA } from './data/portfolioData';
import { Navbar, NavTarget } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsGrid } from './components/ProjectsGrid';
import { AboutPreview } from './components/AboutPreview';
import { CurriculumView } from './components/CurriculumView';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { DisciplinesBand } from './components/DisciplinesBand';
import { Cursor } from './components/fx/Cursor';
import { Preloader } from './components/fx/Preloader';

type CurtainPhase = 'idle' | 'cover' | 'reveal';

const CURTAIN = ['bg-cy', 'bg-mag', 'bg-yel', 'bg-ink'];

const scrollToId = (id: string, smooth = true) => {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'instant' });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'instant' });
  }
};

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('portfolio');
  const [phase, setPhase] = useState<CurtainPhase>('idle');
  const [selected, setSelected] = useState<{ project: Project; origin: { x: number; y: number } } | null>(null);
  const pending = useRef<{ page: PageType; section: string } | null>(null);

  // Barra di avanzamento lettura in quadricromia
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const seg0 = useTransform(progress, [0, 0.25], [0, 1]);
  const seg1 = useTransform(progress, [0.25, 0.5], [0, 1]);
  const seg2 = useTransform(progress, [0.5, 0.75], [0, 1]);
  const seg3 = useTransform(progress, [0.75, 1], [0, 1]);
  const segs = [seg0, seg1, seg2, seg3];

  // Navigazione tra pagine con "sipario" di lastre CMYK
  const navigate = useCallback(
    (target: NavTarget) => {
      if (phase !== 'idle') return;
      const destPage: PageType = target === 'curriculum' ? 'curriculum' : 'portfolio';
      const section = target === 'curriculum' ? 'top' : target;
      if (destPage === currentPage) {
        scrollToId(section);
        return;
      }
      pending.current = { page: destPage, section };
      setPhase('cover');
    },
    [phase, currentPage]
  );

  const onCurtainDone = () => {
    if (phase === 'cover' && pending.current) {
      setCurrentPage(pending.current.page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setPhase('reveal');
    } else if (phase === 'reveal') {
      setPhase('idle');
      const section = pending.current?.section;
      pending.current = null;
      if (section && section !== 'top') setTimeout(() => scrollToId(section), 50);
    }
  };

  const openProject = (project: Project, origin?: { x: number; y: number }) => {
    setSelected({ project, origin: origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 } });
  };

  const step = (dir: 1 | -1) => {
    if (!selected) return;
    const i = PROJECTS_DATA.findIndex((p) => p.id === selected.project.id);
    const next = PROJECTS_DATA[(i + dir + PROJECTS_DATA.length) % PROJECTS_DATA.length];
    setSelected({ project: next, origin: selected.origin });
  };

  useEffect(() => {
    document.body.style.overflow = !loaded ? 'hidden' : '';
  }, [loaded]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-paper text-ink flex flex-col overflow-x-clip w-full">
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
        <Cursor />

        {/* Grana della carta */}
        <div aria-hidden className="paper-grain fixed inset-0 z-[150] pointer-events-none opacity-[0.07] mix-blend-multiply" />

        {/* Barra di lettura CMYK */}
        <div aria-hidden className="fixed top-0 inset-x-0 h-[3px] z-[60] flex">
          {segs.map((s, i) => (
            <motion.div key={i} className={`h-full flex-1 origin-left ${CURTAIN[i]}`} style={{ scaleX: s }} />
          ))}
        </div>

        <Navbar currentPage={currentPage} onNavigate={navigate} />

        <main className="flex-grow relative z-10 w-full">
          {currentPage === 'portfolio' ? (
            <div key="portfolio">
              <Hero
                ready={loaded}
                onNavigateProjects={() => navigate('progetti')}
                onNavigateCurriculum={() => navigate('curriculum')}
                onSelectProject={openProject}
              />
              <DisciplinesBand />
              <ProjectsGrid projects={PROJECTS_DATA} onSelectProject={openProject} />
              <AboutPreview onNavigateCurriculum={() => navigate('curriculum')} />
            </div>
          ) : (
            <div key="curriculum">
              <CurriculumView onBackToPortfolio={() => navigate('top')} />
            </div>
          )}
        </main>

        <Footer onNavigate={navigate} />

        <AnimatePresence>
          {selected && (
            <ProjectModal
              key="modal"
              project={selected.project}
              origin={selected.origin}
              index={PROJECTS_DATA.findIndex((p) => p.id === selected.project.id)}
              total={PROJECTS_DATA.length}
              nextProject={
                PROJECTS_DATA[(PROJECTS_DATA.findIndex((p) => p.id === selected.project.id) + 1) % PROJECTS_DATA.length]
              }
              onClose={() => setSelected(null)}
              onNext={() => step(1)}
              onPrev={() => step(-1)}
            />
          )}
        </AnimatePresence>

        {/* Sipario di transizione tra pagine */}
        <div aria-hidden className={`fixed inset-0 z-[120] flex ${phase === 'idle' ? 'pointer-events-none' : ''}`}>
          {CURTAIN.map((c, i) => (
            <motion.div
              key={c}
              className={`h-full flex-1 ${c}`}
              initial={false}
              style={{ originY: phase === 'reveal' ? 0 : 1 }}
              animate={{ scaleY: phase === 'cover' ? 1 : 0 }}
              transition={{
                duration: 0.55,
                delay: (phase === 'reveal' ? 3 - i : i) * 0.07,
                ease: [0.76, 0, 0.24, 1],
              }}
              onAnimationComplete={i === (phase === 'reveal' ? 0 : 3) ? onCurtainDone : undefined}
            />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
