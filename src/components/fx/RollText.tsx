import React from 'react';

/**
 * Testo che "rotola" in hover: la riga esce verso l'alto e la sua copia
 * entra dal basso, lettera per lettera. Richiede un antenato con classe `group`.
 */
export const RollText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <span className={`relative inline-flex overflow-hidden ${className}`} aria-label={text}>
    {text.split('').map((ch, i) => (
      <span key={i} aria-hidden className="relative inline-block">
        <span
          className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
          style={{ transitionDelay: `${i * 18}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
        <span
          className="absolute left-0 top-full inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
          style={{ transitionDelay: `${i * 18}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      </span>
    ))}
  </span>
);
