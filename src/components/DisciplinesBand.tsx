import React from 'react';
import { Marquee } from './fx/Marquee';
import { RESUME_DATA } from '../data/portfolioData';

const DISCIPLINES = ['Editorial Design', 'Poster Design', 'Brand & Visual Identity', 'Typography & Lettering'];
const TOOLS = RESUME_DATA.softwareTools.map((t) => t.name);

/** Due nastri incrociati come fascette di carta: discipline e strumenti. */
export const DisciplinesBand: React.FC = () => (
  <section aria-label="Discipline" className="relative py-16 sm:py-24 overflow-hidden">
    <div className="relative">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] bg-mag text-paper py-3">
        <Marquee baseVelocity={-1.5}>
          {TOOLS.map((t) => (
            <span key={t} className="flex items-center font-mono text-xs sm:text-sm uppercase tracking-[0.2em] px-6">
              {t}
              <span className="ml-12 opacity-70">+</span>
            </span>
          ))}
        </Marquee>
      </div>
      <div className="relative -rotate-[2deg] bg-ink text-paper py-4 sm:py-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] mx-[-5%]">
        <Marquee baseVelocity={2.2}>
          {DISCIPLINES.map((d, i) => (
            <span key={d} className="flex items-center px-4 sm:px-8">
              <span
                className={`font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight ${
                  i % 2 ? 'italic font-light' : 'text-outline-paper font-normal'
                }`}
              >
                {d}
              </span>
              <span className="ml-8 sm:ml-16 text-yel text-3xl sm:text-5xl">✶</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  </section>
);
