import React, { useState, useEffect } from 'react';
import { ArrowDown, FileText, Sparkles, Layers, Palette, Eye } from 'lucide-react';
import { PageType } from '../types';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigateProjects: () => void;
  onNavigateCurriculum: () => void;
  onSelectFeaturedProject: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigateProjects,
  onNavigateCurriculum,
  onSelectFeaturedProject
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX / innerWidth - 0.5) * 20;
          const y = (e.clientY / innerHeight - 0.5) * 20;
          setMousePos({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero-section" className="relative min-h-[90vh] pt-40 sm:pt-28 pb-12 sm:pb-16 flex items-center overflow-hidden">
      {/* Soft organic purple ambient glowing diffusions */}
      <div
        className="absolute top-12 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#EDE9FE] blur-[90px] sm:blur-[120px] opacity-60 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`
        }}
      />
      <div
        className="absolute top-1/3 -right-24 w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full bg-[#DDD6FE] blur-[80px] sm:blur-[100px] opacity-40 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)`
        }}
      />
      <div className="absolute bottom-4 left-1/3 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-[#FAF5FF] blur-[70px] sm:blur-[90px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetric Typography & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Main Name & Title with Editorial Serif Italic */}
            <h1 className="relative inline-block font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] tracking-tight leading-[0.94] text-[#1A1A1A] mb-3">
              Alice Mariarita Mele
            </h1>
            
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <motion.div 
                initial={{ scaleX: 0 }} 
                animate={{ scaleX: 1 }} 
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="w-8 sm:w-10 h-[1.5px] bg-[#7C3AED]"
              ></motion.div>
              <motion.span 
                initial={{ opacity: 0, filter: 'blur(10px)', x: -20 }} 
                animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }} 
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                className="text-xl sm:text-3xl font-serif italic text-[#7C3AED]"
              >
                Graphic Designer
              </motion.span>
            </div>
            
            {/* Introduction paragraph */}
            <p className="text-base sm:text-xl text-[#374151] max-w-xl font-medium leading-relaxed mb-6 sm:mb-8">
              Progetto identità visive e materiali grafici capaci di trasformare idee, informazioni e contenuti in{' '}
              <motion.span 
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#C084FC] to-[#7C3AED] bg-[length:200%_auto]"
              >
                esperienze visive chiare, riconoscibili e coinvolgenti.
              </motion.span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10">
              <button
                id="hero-cta-projects"
                onClick={onNavigateProjects}
                className="group flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-sm sm:text-base shadow-lg shadow-purple-200 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 min-h-[48px]"
              >
                <span>Scopri i miei progetti</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" />
              </button>
              
              <button
                id="hero-cta-curriculum"
                onClick={onNavigateCurriculum}
                className="group flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#FAF5FF] text-[#1A1A1A] border border-[#E9D5FF] font-medium text-sm sm:text-base shadow-sm hover:border-[#7C3AED] hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 min-h-[48px]"
              >
                <FileText className="w-4 h-4 text-[#7C3AED]" />
                <span>Curriculum</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Visual Mockup Showcase with Interactive Floating Layer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`
              }}
            >
              {/* Main Featured Mockup Card */}
              <div
                onClick={() => onSelectFeaturedProject('festival-cinema-africano')}
                className="group cursor-pointer relative bg-white p-3 sm:p-4 rounded-[28px] sm:rounded-[36px] shadow-[0_20px_50px_rgba(124,58,237,0.12)] border border-[#E9D5FF] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(124,58,237,0.20)] hover:-translate-y-1"
              >
                {/* Poster Mockup Preview Frame */}
                <div className="relative aspect-[4/5] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#F3E8FF]">
                  <img
                    src="./projects/festival-cinema-africano/cover.jpg"
                    alt="Festival di Cinema Africano di Verona - Corporate Identity"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15121B]/85 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Print Crop Guides overlay */}
                  <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-[#6D28D9] shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span>
                    <span>In Evidenza</span>
                  </div>
                  
                  <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 bg-[#1A1A1A]/80 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold text-white/95">
                    Visual System
                  </div>
                  
                  {/* Card bottom info */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#DDD6FE] font-medium block mb-1">
                      Corporate Identity · Materiali Coordinati
                    </span>
                    <h3 className="font-serif italic text-xl sm:text-2xl lg:text-3xl leading-tight text-white mb-2">
                      Festival di Cinema Africano
                    </h3>
                    <div className="flex items-center justify-between pt-2 border-t border-white/20">
                      <span className="text-[11px] sm:text-xs text-white/80">Identità Visiva</span>
                      <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#DDD6FE] group-hover:text-white transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Dettagli & PDF</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Accent Card 2: Alice Mariarita Mele Designer Avatar Badge */}
              <div
                onClick={() => {
                  const el = document.getElementById('about-preview-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cursor-pointer absolute -top-4 sm:-top-6 right-1 sm:-right-6 max-w-[85%] sm:max-w-none bg-white/95 backdrop-blur-sm p-2 sm:p-2.5 rounded-2xl shadow-lg border border-[#E9D5FF] flex items-center gap-2.5 sm:gap-3 hover:scale-105 transition-all duration-200"
                style={{
                  transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px)`
                }}
              >
                <motion.div 
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-gradient-to-b from-[#FAF8FE] via-[#F4EEFF] to-[#E9DDFD] border border-[#C084FC]/50 flex items-end justify-center flex-shrink-0 shadow-sm"
                >
                  <img
                    src="./Alice_photo.png"
                    alt="Alice Mariarita Mele"
                    className="w-full h-full object-contain object-bottom drop-shadow-[0_2px_4px_rgba(76,29,149,0.18)]"
                  />
                </motion.div>
                <div className="text-left pr-1 sm:pr-2">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#7C3AED] tracking-wider block">
                    Graphic Designer
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm font-semibold text-[#1A1A1A] block truncate max-w-[130px] sm:max-w-none">
                    Alice Mariarita Mele
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#6B7280]">Verona · Print & Editorial</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
