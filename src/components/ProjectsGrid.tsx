import React from 'react';
import { Project, FilterCategory } from '../types';
import { Eye, ArrowUpRight, Filter, Printer, X, FileText, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  onSelectProject
}) => {
  const handleDirectPdfOpen = (e: React.MouseEvent, pdfUrl: string) => {
    e.stopPropagation();
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="progetti" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border border-[#E9D5FF] text-[#7C3AED] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider sm:tracking-widest mb-3 shadow-sm">
              <Printer className="w-3.5 h-3.5" />
              <span>Selezione Lavori di Stampa</span>
            </div>
            <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#1A1A1A] tracking-tight">
              Progetti & Artefatti
            </h2>
            <p className="text-[#645E6E] mt-2 sm:mt-3 text-base sm:text-lg leading-relaxed font-medium">
              Dalla locandina serigrafica al catalogo d’arte cucito a filo refe, dai pieghevoli promozionali alle identità visive materiche.
            </p>
          </div>
        </div>

        {/* Dynamic Editorial Grid with smooth animated transitions */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10"
        >
          <AnimatePresence>
            {projects.map((project) => {
              let colSpan = 'md:col-span-6 lg:col-span-6';
              let aspectClass = 'aspect-[16/11]';

              if (project.sizeSpan === 'large') {
                colSpan = 'md:col-span-12 lg:col-span-8';
                aspectClass = 'aspect-[16/10] sm:aspect-[16/9]';
              } else if (project.sizeSpan === 'tall') {
                colSpan = 'md:col-span-6 lg:col-span-4';
                aspectClass = 'aspect-[3/4]';
              } else if (project.sizeSpan === 'wide') {
                colSpan = 'md:col-span-12 lg:col-span-7';
                aspectClass = 'aspect-[16/10]';
              } else {
                colSpan = 'md:col-span-6 lg:col-span-5';
                aspectClass = 'aspect-[4/3]';
              }

              return (
                <motion.div
                  layout
                  key={project.id}
                  id={`project-card-${project.id}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onSelectProject(project)}
                  className={`${colSpan} group cursor-pointer flex flex-col`}
                >
                  {/* Visual Card Container */}
                  <div className={`relative ${aspectClass} rounded-[24px] sm:rounded-[32px] overflow-hidden bg-white border border-[#E9D5FF] shadow-[0_6px_30px_rgba(124,58,237,0.06)] group-hover:shadow-[0_20px_50px_rgba(124,58,237,0.16)] transition-all duration-400 ease-out group-hover:-translate-y-1.5`}>
                    {/* First Page PDF Preview / Mockup */}
                    <img
                      src={project.cover || project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient & Overlay for high readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15121B]/90 via-[#15121B]/25 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10 gap-2">
                      <div className="flex flex-wrap items-center gap-1.5 max-w-[75%] sm:max-w-[80%]">
                        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#6D28D9] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm border border-[#E9D5FF]/50 truncate">
                          {project.categories?.[0] || project.category}
                        </span>
                      </div>

                      {project.pdf ? (
                        <button
                          type="button"
                          onClick={(e) => handleDirectPdfOpen(e, project.pdf!)}
                          title="Apri il documento PDF originale in nuova scheda"
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11px] sm:text-xs font-semibold shadow-md transition-transform active:scale-95 flex-shrink-0 z-20"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF</span>
                          <ExternalLink className="w-3 h-3 opacity-80" />
                        </button>
                      ) : (
                        <span className="px-2 sm:px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-[10px] sm:text-[11px] font-mono">
                          Progetto
                        </span>
                      )}
                    </div>

                    {/* Hover Floating Action Button (desktop only) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 hidden sm:block pointer-events-none">
                      <div className="px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#7C3AED] font-semibold text-xs shadow-xl flex items-center gap-2 border border-[#E9D5FF]">
                        <Eye className="w-4 h-4 text-[#7C3AED]" />
                        <span>Dettagli & Anteprima</span>
                      </div>
                    </div>

                    {/* Bottom Information overlay on image */}
                    <div className="absolute bottom-3.5 sm:bottom-5 left-3.5 sm:left-5 right-3.5 sm:right-5 z-10 text-white">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#DDD6FE] font-medium block mb-1">
                        {project.category}
                      </span>
                      <h3 className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-white tracking-tight drop-shadow-sm group-hover:text-[#FAF5FF] transition-colors leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Editorial Caption below card */}
                  <div className="mt-3 px-1.5 sm:px-2 flex items-start justify-between gap-3">
                    <div className="pr-2 flex-1 min-w-0">
                      <span className="font-serif italic text-base sm:text-lg font-semibold text-[#1A1A1A] group-hover:text-[#7C3AED] transition-colors line-clamp-1">
                        {project.title}
                      </span>
                      <p className="text-xs text-[#6B7280] font-medium line-clamp-2 mt-0.5 leading-relaxed">
                        {project.description}
                      </p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF5FF] text-[#6D28D9] border border-[#E9D5FF]/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF5FF] border border-[#E9D5FF]/80 group-hover:bg-[#7C3AED] group-hover:text-white text-[#7C3AED] flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-0.5">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>


      </div>
    </section>
  );
};
