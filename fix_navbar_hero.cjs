const fs = require('fs');

// Fix Navbar
let navbarCode = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
const navbarTextRegex = /\s*<div className="flex flex-col">\s*<div className="flex items-center gap-1\.5 sm:gap-2">\s*<span className="font-serif italic font-bold text-lg sm:text-xl text-\[#1A1A1A\] tracking-tight group-hover:text-\[#7C3AED\] transition-colors whitespace-nowrap">\s*Alice Mariarita Mele\s*<\/span>\s*<span className="inline-block w-1\.5 h-1\.5 rounded-full bg-\[#7C3AED\]"><\/span>\s*<\/div>\s*<span className="hidden sm:block text-\[11px\] font-medium tracking-wide uppercase text-\[#6B7280\]">\s*Graphic & Print Designer\s*<\/span>\s*<\/div>/;

navbarCode = navbarCode.replace(navbarTextRegex, '');
fs.writeFileSync('src/components/Navbar.tsx', navbarCode);

// Fix Hero
let heroCode = fs.readFileSync('src/components/Hero.tsx', 'utf8');
const starRegex = /\s*<motion\.div\s*animate=\{\{ rotate: 360 \}\}\s*transition=\{\{ repeat: Infinity, duration: 12, ease: "linear" \}\}\s*className="absolute -top-4 sm:-top-8 -right-6 sm:-right-12 text-\[#C084FC\] opacity-40 hidden sm:block"\s*>\s*<Sparkles size=\{40\} strokeWidth=\{1\.5\} \/>\s*<\/motion\.div>/;

heroCode = heroCode.replace(starRegex, '');
fs.writeFileSync('src/components/Hero.tsx', heroCode);

console.log("Done");
