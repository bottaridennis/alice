import React from 'react';
import { ArrowRight, FileText, Sparkles, Printer, Layers } from 'lucide-react';

interface HomeFinaleProps {
  onNavigateCurriculum: () => void;
}

export const HomeFinale: React.FC<HomeFinaleProps> = ({ onNavigateCurriculum }) => {
  return (
    <section id="home-finale-section" className="py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[24px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#E9D5FF] shadow-[0_8px_30px_rgba(124,58,237,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          
          {/* Visual Identity Graphic Motif */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#C084FC] flex items-center justify-center text-white font-display font-bold text-lg sm:text-xl shadow-lg shadow-[#7C3AED]/20 flex-shrink-0">
              AM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif italic font-bold text-xl sm:text-2xl text-[#1A1A1A]">
                  Alice Mariarita Mele
                </span>
                <span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span>
              </div>
              <p className="text-xs text-[#6B7280] font-medium mt-0.5 max-w-sm sm:max-w-none">
                Progettazione grafica per la stampa, identità visive e cura editoriale.
              </p>
            </div>
          </div>

          {/* Minimal CTA to Curriculum */}
          <div className="w-full md:w-auto">
            <button
              id="finale-cta-curriculum"
              onClick={onNavigateCurriculum}
              className="w-full md:w-auto group inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-xs sm:text-sm shadow-lg shadow-purple-200 hover:scale-105 transition-all duration-200 min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              <span>Esplora il Curriculum completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
