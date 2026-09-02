import React, { useState, useEffect } from 'react';
import { PageType, Project } from './types';
import { PROJECTS_DATA } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsGrid } from './components/ProjectsGrid';
import { AboutPreview } from './components/AboutPreview';
import { HomeFinale } from './components/HomeFinale';
import { CurriculumView } from './components/CurriculumView';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('portfolio');
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
      {/* Navbar with Sticky blur and active page indicator */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handleNavigatePage}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'portfolio' ? (
          <div>
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

            {/* Home Finale with visual identity and subtle CTA */}
            <HomeFinale
              onNavigateCurriculum={() => handleNavigatePage('curriculum')}
            />
          </div>
        ) : (
          /* Page 2: Interactive Editorial Curriculum */
          <CurriculumView
            onBackToPortfolio={() => handleNavigatePage('portfolio')}
          />
        )}
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
