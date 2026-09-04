import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, ChevronLeft, ChevronRight, ExternalLink, FileText } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  const currentImage = (project.galleryImages && project.galleryImages[activeImageIndex]) || project.cover || project.coverImage;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#131118]/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 md:p-8 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="project-modal-dialog"
        className="relative w-full max-w-5xl bg-white rounded-[24px] sm:rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-[#E9D5FF] overflow-hidden my-auto max-h-[94vh] sm:max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white/95 backdrop-blur-md border-b border-[#F3E8FF] gap-2">
          <div className="flex items-center gap-2 sm:gap-3 max-w-[55%] sm:max-w-none">
            <span className="px-2.5 sm:px-3.5 py-1 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-[#7C3AED] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm truncate">
              {project.categories?.[0] || project.category}
            </span>
            {project.year && (
              <span className="text-xs sm:text-sm font-semibold text-[#6B7280] flex-shrink-0">
                {project.year}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Main prominent 'Apri progetto completo' button in top bar */}
            {project.pdf && (
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                title="Apri il file PDF completo in una nuova scheda"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shadow-md shadow-purple-200 transition-all active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Apri progetto completo</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-90" />
              </a>
            )}

            {onPrev && (
              <button
                id="modal-prev-btn"
                onClick={onPrev}
                title="Progetto precedente (Freccia sinistra)"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#4C1D95] flex items-center justify-center transition-colors min-h-[40px]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {onNext && (
              <button
                id="modal-next-btn"
                onClick={onNext}
                title="Progetto successivo (Freccia destra)"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#4C1D95] flex items-center justify-center transition-colors min-h-[40px]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button
              id="modal-close-btn"
              onClick={onClose}
              title="Chiudi (Esc)"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#F3E8FF] hover:bg-[#7C3AED] hover:text-white text-[#4C1D95] flex items-center justify-center transition-all duration-200 ml-0.5 sm:ml-1 min-h-[40px]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto px-4 sm:px-8 py-5 sm:py-6 space-y-6 sm:space-y-8">
          
          {/* Main Showcase Image Area: Click opens full PDF */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative group w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF5FF] border border-[#E9D5FF] shadow-inner flex items-center justify-center">
              {project.pdf ? (
                <a
                  href={project.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative cursor-pointer"
                  title="Clicca per aprire e consultare il PDF completo in alta risoluzione"
                >
                  <img
                    src={currentImage}
                    alt={project.title}
                    className="w-full h-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  {/* Subtle hover overlay indicating click opens PDF */}
                  <div className="absolute inset-0 bg-[#7C3AED]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#7C3AED] font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 border border-[#E9D5FF]">
                      <FileText className="w-4 h-4 text-[#7C3AED]" />
                      <span>Apri PDF completo (Nuova Scheda)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              ) : (
                <img
                  src={currentImage}
                  alt={project.title}
                  className="w-full h-auto object-contain mx-auto"
                />
              )}
            </div>

            {/* Mobile / Prominent PDF Action Button Bar */}
            {project.pdf && (
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#FAF5FF] via-[#F3E8FF]/60 to-[#FAF5FF] border border-[#DDD6FE] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#4C1D95] block">
                      Documento PDF originale disponibile
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#6B7280]">
                      Visualizza tutte le pagine con lo strumento nativo del browser (zoom, fullscreen, stampa)
                    </span>
                  </div>
                </div>

                <a
                  href={project.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-200 transition-all duration-200 active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>Apri progetto completo</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                </a>
              </div>
            )}
          </div>

          {/* Project Title, Summary & Description */}
          <div className="space-y-5 pt-2 max-w-4xl">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#7C3AED] font-semibold mb-1">
                {project.categories?.[0] || project.category}
              </div>
              <h2 className="font-serif italic text-2xl sm:text-4xl text-[#1A1A1A] tracking-tight mb-3">
                {project.title}
              </h2>

              {/* Project Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF5FF] text-[#6D28D9] text-xs font-medium border border-[#E9D5FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {project.summary && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF5FF]/70 border border-[#E9D5FF] text-[#373043] leading-relaxed font-medium">
                <p className="font-bold text-[#7C3AED] mb-1.5 text-xs uppercase tracking-wider">
                  Sintesi del Concept
                </p>
                <p className="text-sm sm:text-base leading-relaxed">{project.summary}</p>
              </div>
            )}

            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="font-serif italic text-lg sm:text-xl font-semibold text-[#1A1A1A]">
                Descrizione del Progetto
              </h4>
              <p className="text-[#4B5563] leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#FAF9FC] border-t border-[#F3E8FF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <span className="text-[11px] sm:text-xs text-[#6B7280]">
            Alice Mariarita Mele · Progetto Reale di Portfolio
          </span>
          {project.pdf && (
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#7C3AED] hover:text-[#581C87] transition-colors"
            >
              <span>Apri progetto completo (PDF) in nuova scheda</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
