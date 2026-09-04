import React, { useState, useEffect } from 'react';
import { PageType, Project } from './types';
import { PROJECTS_DATA } from './data/portfolioData';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsGrid } from './components/ProjectsGrid';
import { AboutPreview } from './components/AboutPreview';
import { CurriculumView } from './components/CurriculumView';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('portfolio');
  const { scrollYProgress } = useScroll();
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
    <div className="min-h-screen bg-[#FAF9FD] text-[#1A1721] flex flex-col font-sans selection:bg-[#E9D5FF] selection:text-[#581C87]">
      {/* Elegant Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#7C3AED] origin-left z-[100]"
        style={{ scaleX }}
      />
      {/* Navbar with Sticky blur and active page indicator */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handleNavigatePage}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
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
  );
}
