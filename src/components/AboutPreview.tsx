import React from 'react';
import { ArrowRight, Compass, Sparkles, Layers, BookOpen, Stamp } from 'lucide-react';

interface AboutPreviewProps {
  onNavigateCurriculum: () => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ onNavigateCurriculum }) => {
  return (
    <section id="about-preview-section" className="py-20 relative overflow-hidden">
      {/* Background Soft Blobs */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 rounded-full bg-[#EDE9FE] blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute -bottom-10 right-20 w-96 h-96 rounded-full bg-[#DDD6FE] blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[28px] sm:rounded-[40px] p-5 sm:p-10 lg:p-16 border border-[#E9D5FF] shadow-[0_12px_40px_rgba(124,58,237,0.06)] relative overflow-hidden">
          
          {/* Subtle print grid watermark in background */}
          <div className="absolute right-0 bottom-0 w-96 h-96 opacity-5 pointer-events-none">
            <div className="w-full h-full border-l-2 border-t-2 border-[#7C3AED] rounded-tl-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Designer Portrait / Editorial Visual */}
            <div className="lg:col-span-5 relative w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-[#FAF8FE] via-[#F4EEFF] to-[#EBE0FD] border-2 border-white shadow-[0_20px_50px_rgba(124,58,237,0.12)] flex flex-col justify-end">
                
                {/* Refined editorial geometric backdrop accents */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-[#DDD6FE]/70 to-[#FAF5FF] blur-2xl" />
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-[#DDD6FE]/80" />
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-[#C084FC]/35 border-dashed" />
                  <div className="absolute top-4 right-4 font-mono text-[9px] sm:text-[10px] text-[#7C3AED]/45 tracking-wider">
                    STUDIO // MILANO
                  </div>
                </div>

                {/* Alice Mariarita Mele Transparent Cutout Portrait */}
                <img
                  src="./Alice_photo.png"
                  alt="Alice Mariarita Mele — Graphic Designer"
                  className="relative z-10 w-full h-[88%] sm:h-[90%] object-contain object-bottom drop-shadow-[0_14px_28px_rgba(76,29,149,0.18)] transition-transform duration-500 hover:scale-[1.02]"
                />
                
                {/* Floating pill badge */}
                <div className="relative z-20 m-3 sm:m-4 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg border border-[#E9D5FF] flex items-center justify-between">
                  <div className="pr-2">
                    <span className="font-serif italic font-bold text-sm sm:text-base text-[#1A1A1A] block truncate">Alice Mariarita Mele</span>
                    <span className="text-[10px] sm:text-[11px] text-[#7C3AED] font-semibold block truncate">Milano · Graphic & Print Design</span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#FAF5FF] flex items-center justify-center text-[#7C3AED] flex-shrink-0">
                    <Stamp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

              {/* Decorative mini card */}
              <div className="absolute -top-3 -left-3 bg-white px-3.5 py-1.5 rounded-full border border-[#E9D5FF] shadow-md hidden sm:flex items-center gap-2 text-xs font-semibold text-[#6D28D9] z-30">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span>
                <span>Graphic & Editorial Designer</span>
              </div>
            </div>

            {/* Right: Short about statement with CTA */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border border-[#E9D5FF] text-[#7C3AED] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider sm:tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Approccio Progettuale</span>
              </div>

              <h3 className="font-serif italic text-2xl sm:text-4xl lg:text-[2.6rem] text-[#1A1A1A] leading-snug tracking-tight">
                "Mi piace costruire progetti grafici in cui estetica e funzionalità lavorano insieme."
              </h3>

              <p className="text-base sm:text-lg text-[#374151] leading-relaxed font-medium">
                Dalla prima idea alla composizione finale, curo ogni dettaglio cercando di creare soluzioni visive semplici, riconoscibili e coerenti. Credo nella forza tattile della stampa, nel rigore della gabbia grafica e nel valore della tipografia come voce visiva.
              </p>

              {/* Link: Scopri il mio percorso → */}
              <div className="pt-2 w-full sm:w-auto">
                <button
                  id="about-cta-curriculum"
                  onClick={onNavigateCurriculum}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-sm sm:text-base shadow-lg shadow-purple-200 hover:scale-105 transition-all duration-200 min-h-[44px]"
                >
                  <span>Scopri il mio percorso</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
