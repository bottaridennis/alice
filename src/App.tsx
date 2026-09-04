import React, { useState, useEffect } from 'react';
import { PageType, Project } from './types';
import { PROJECTS_DATA } from './data/portfolioData';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsGrid } from './components/ProjectsGrid';
import { AboutPreview } from './components/AboutPreview';
import { CurriculumView } from './components/CurriculumView';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('portfolio');
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Scroll to projects section smoothly
  const handleScrollToProjects = () => {
    if (currentPage !== 'portfolio') {
      setCurrentPage('portfolio');
      setTimeout(() => {
        const el = document.getElementById('progetti');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('progetti');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFeaturedProject = (projectId: string) => {
    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (proj) {
      setSelectedProject(proj);
    }
  };

  const handleNavigatePage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Next / Prev project navigation inside modal
  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    setSelectedProject(PROJECTS_DATA[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    setSelectedProject(PROJECTS_DATA[prevIndex]);
  };

  return (
    <>
            <div className="min-h-screen bg-[#FAF9FD] text-[#1A1721] flex flex-col font-sans selection:bg-[#E9D5FF] selection:text-[#581C87]">
      {/* Elegant Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#7C3AED] origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* Global Parallax Background Texture/Shapes */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-full h-[150vh] opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            y: useTransform(scrollY, [0, 2000], [0, -100])
          }}
        />
        <motion.div 
          className="absolute top-0 -left-[10vw] w-[40vw] h-[40vw] rounded-full bg-[#E9D5FF] opacity-30 blur-[120px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '150%']) }}
        />
        <motion.div 
          className="absolute top-[40vh] -right-[10vw] w-[45vw] h-[45vw] rounded-full bg-[#DDD6FE] opacity-20 blur-[120px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-100%']) }}
        />
      </div>
      
      {/* Navbar with Sticky blur and active page indicator */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handleNavigatePage}
      />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'portfolio' ? (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Hero Section */}
              <Hero
                onNavigateProjects={handleScrollToProjects}
                onNavigateCurriculum={() => handleNavigatePage('curriculum')}
                onSelectFeaturedProject={handleSelectFeaturedProject}
              />

              {/* Dynamic Editorial Projects Grid */}
              <ProjectsGrid
                projects={PROJECTS_DATA}
                onSelectProject={(project) => setSelectedProject(project)}
              />

              {/* Short About Section as specified */}
              <AboutPreview
                onNavigateCurriculum={() => handleNavigatePage('curriculum')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <CurriculumView
                onBackToPortfolio={() => handleNavigatePage('portfolio')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Dynamic Project Modal / Fullscreen Overlay */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />

      {/* Clean, Minimal Footer */}
      <Footer />
    </div>
    </>
  );
}
