import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { Sparkles, ArrowUpRight, FileText, Grid } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FDFCFE]/85 backdrop-blur-md py-3 shadow-[0_4px_24px_rgba(124,58,237,0.06)] border-b border-[#E9D5FF]/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="nav-brand-btn"
          onClick={() => {
            onPageChange('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none min-h-[44px]"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white shadow-md shadow-[#7C3AED]/20 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
            <span className="font-display font-bold text-xs sm:text-sm tracking-tight">AM</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-bold text-base sm:text-lg text-[#1A1A1A] tracking-tight group-hover:text-[#7C3AED] transition-colors whitespace-nowrap">
                Alice Mariarita Mele
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span>
            </div>
            <span className="hidden sm:block text-[11px] font-medium tracking-wide uppercase text-[#6B7280]">
              Graphic & Print Designer
            </span>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav id="nav-tabs" aria-label="Navigazione principale" className="flex items-center bg-white/90 p-1 rounded-full border border-[#E9D5FF] shadow-[0_2px_12px_rgba(124,58,237,0.05)] backdrop-blur-sm">
          <button
            id="nav-tab-portfolio"
            onClick={() => {
              onPageChange('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[40px] sm:min-h-[44px] ${
              currentPage === 'portfolio'
                ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/25'
                : 'text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#FAF5FF]'
            }`}
          >
            <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Portfolio</span>
          </button>

          <button
            id="nav-tab-curriculum"
            onClick={() => {
              onPageChange('curriculum');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[40px] sm:min-h-[44px] ${
              currentPage === 'curriculum'
                ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/25'
                : 'text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#FAF5FF]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Curriculum</span>
          </button>
        </nav>

        {/* Quick Availability status */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            id="nav-contact-pill"
            href="mailto:alicemariaritamele@gmail.com"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold hover:bg-[#7C3AED] hover:text-white transition-all duration-200 shadow-sm group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]"></span>
            </span>
            <span>Disponibile per progetti</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </header>
  );
};
