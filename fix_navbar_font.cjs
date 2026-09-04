const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

code = code.replace(
  'font-display font-bold text-base sm:text-lg text-[#1A1A1A] tracking-tight group-hover:text-[#7C3AED] transition-colors whitespace-nowrap',
  'font-serif italic font-bold text-lg sm:text-xl text-[#1A1A1A] tracking-tight group-hover:text-[#7C3AED] transition-colors whitespace-nowrap'
);

fs.writeFileSync('src/components/Navbar.tsx', code);
