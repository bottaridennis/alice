import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { PageType } from '../types';
import { RollText } from './fx/RollText';
import { RegMark } from './fx/CropMarks';

export type NavTarget = 'top' | 'progetti' | 'about' | 'contatti' | 'curriculum';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (target: NavTarget) => void;
}

const LINKS: { id: NavTarget; label: string; n: string }[] = [
  { id: 'progetti', label: 'Lavori', n: '01' },
  { id: 'about', label: 'Profilo', n: '02' },
  { id: 'contatti', label: 'Contatti', n: '03' },
  { id: 'curriculum', label: 'Curriculum', n: '04' },
];

const useRomeTime = () => {
  const fmt = () =>
    new Intl.DateTimeFormat('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome' }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
};

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const time = useRomeTime();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
    setScrolled(y > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (t: NavTarget) => {
    setOpen(false);
    onNavigate(t);
  };

  return (
    <>
      <motion.header
        id="main-navbar"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
            scrolled && !open ? 'bg-paper/80 backdrop-blur-md border-ink/10' : 'bg-transparent border-transparent'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
            {/* Monogramma */}
            <button
              id="nav-brand-btn"
              onClick={() => go('top')}
              className={`group flex items-center gap-3 min-h-[44px] transition-opacity duration-300 ${open ? 'opacity-0 pointer-events-none' : ''}`}
              aria-label="Torna all'inizio"
            >
              <span className="relative w-10 h-10 grid place-items-center">
                <RegMark size={40} className="absolute inset-0 text-ink/25 transition-transform duration-700 group-hover:rotate-180" />
                <span className="relative font-serif italic text-lg leading-none">
                  <span className="absolute inset-0 text-cy mix-blend-multiply transition-transform duration-300 group-hover:-translate-x-[3px] group-hover:-translate-y-[2px]">AM</span>
                  <span className="absolute inset-0 text-mag mix-blend-multiply transition-transform duration-300 group-hover:translate-x-[3px]">AM</span>
                  <span className="absolute inset-0 text-yel mix-blend-multiply transition-transform duration-300 group-hover:translate-y-[3px]">AM</span>
                  <span className="relative mix-blend-multiply">AM</span>
                </span>
              </span>
              <span className="hidden md:flex flex-col text-left leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Portfolio</span>
                <span className="text-sm font-medium">Alice Mele</span>
              </span>
            </button>

            {/* Link desktop */}
            <nav aria-label="Navigazione principale" className="hidden md:flex items-center gap-1">
              {LINKS.map((l) => {
                const active = l.id === 'curriculum' ? currentPage === 'curriculum' : false;
                return (
                  <button
                    key={l.id}
                    id={l.id === 'curriculum' ? 'nav-tab-curriculum' : undefined}
                    onClick={() => go(l.id)}
                    className={`group relative px-4 py-2 rounded-full text-sm font-medium flex items-baseline gap-1.5 transition-colors ${
                      active ? 'bg-ink text-paper' : 'hover:bg-ink/5'
                    }`}
                  >
                    <span className={`font-mono text-[9px] ${active ? 'text-yel' : 'text-mag'}`}>{l.n}</span>
                    <RollText text={l.label} />
                  </button>
                );
              })}
            </nav>

            {/* Status + ora locale */}
            <div className="hidden lg:flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mag opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-mag" />
                </span>
                Verona
              </span>
              <span className="text-ink-soft">{time}</span>
            </div>

            {/* Toggle mobile */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden relative w-12 h-12 -mr-2 grid place-items-center"
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={open}
            >
              <motion.span
                className={`absolute h-[1.5px] w-6 transition-colors duration-500 ${open ? 'bg-paper' : 'bg-ink'}`}
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.span
                className={`absolute h-[1.5px] w-6 transition-colors duration-500 ${open ? 'bg-paper' : 'bg-ink'}`}
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile a tutto schermo */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-ink text-paper flex flex-col justify-between pt-24 pb-8 px-5"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col">
              {LINKS.map((l, i) => (
                <div key={l.id} className="overflow-hidden border-b border-paper/15">
                  <motion.button
                    onClick={() => go(l.id)}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex items-baseline justify-between py-4 text-left"
                  >
                    <span className="font-serif italic text-5xl font-light">{l.label}</span>
                    <span className="font-mono text-xs text-yel">{l.n}</span>
                  </motion.button>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/70 flex justify-between"
            >
              <span>Verona · {time}</span>
              <a href="mailto:alicemariaritamele@gmail.com" className="text-paper">Scrivimi ↗</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
