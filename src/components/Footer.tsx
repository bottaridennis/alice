import React from 'react';
import { Mail, ArrowUp, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="border-t border-[#E9D5FF] bg-[#FDFCFE] py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280] text-center sm:text-left">
        
        <div className="flex flex-wrap items-center justify-center gap-2">
          
          <span className="font-serif italic font-bold text-sm text-[#1A1A1A]">Alice Mariarita Mele</span>
          <span className="hidden sm:inline">·</span>
          <a href="https://hits.sh/alicemariaritamele-portfolio.run.app/" target="_blank" rel="noreferrer" className="flex items-center" title="Contatore visitatori unici (privacy-friendly)">
            <img alt="Hits" src="https://hits.sh/alicemariaritamele-portfolio.run.app.svg?view=today-total&style=flat-square&color=7C3AED&label=Visitatori" className="h-5" />
          </a>

          <span>© {new Date().getFullYear()}</span>
          <span>·</span>
          <span>Tutti i diritti riservati</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href="tel:3478468996"
            className="hover:text-[#7C3AED] transition-colors flex items-center gap-1.5 min-h-[36px]"
          >
            <Phone className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>347 8468996</span>
          </a>

          <a
            href="mailto:alicemariaritamele@gmail.com"
            className="hover:text-[#7C3AED] transition-colors flex items-center gap-1.5 min-h-[36px]"
          >
            <Mail className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>alicemariaritamele@gmail.com</span>
          </a>

          <button
            onClick={scrollToTop}
            className="hover:text-[#7C3AED] transition-colors flex items-center gap-1 font-medium min-h-[36px] px-2"
            title="Torna all'inizio della pagina"
          >
            <span>Inizio</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
