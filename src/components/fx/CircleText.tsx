import React from 'react';

/** Testo che ruota lungo una circonferenza (badge rotante). */
export const CircleText: React.FC<{ text: string; className?: string; size?: number }> = ({
  text,
  className = '',
  size = 140,
}) => (
  <svg
    aria-hidden
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={`animate-spin-slow ${className}`}
  >
    <defs>
      <path id="circle-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
    </defs>
    <text className="font-mono uppercase" style={{ fontSize: 15, letterSpacing: 4.2 }} fill="currentColor">
      <textPath href="#circle-path">{text}</textPath>
    </text>
  </svg>
);
