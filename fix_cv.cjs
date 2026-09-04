const fs = require('fs');
let code = fs.readFileSync('src/components/CurriculumView.tsx', 'utf8');

// Remove "Torna al Portfolio" button and align right
code = code.replace(
  /<div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">[\s\S]*?<div className="flex items-center gap-2 sm:gap-3">/,
  `<div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">`
);

// Replace Globe span with amale.eu link
const globeRegex = /<span className="flex items-center gap-2 px-3\.5 sm:px-4 py-2 rounded-full bg-\[#FAF9FC\] text-\[#4B5563\] border border-\[#E9D5FF\] hover:border-\[#DDD6FE\] transition-colors min-h-\[38px\]">\s*<Globe className="w-3\.5 h-3\.5 text-\[#7C3AED\] flex-shrink-0" \/>\s*<span>\{RESUME_DATA\.location\}<\/span>\s*<\/span>/;
const amaleLink = `<a 
                  href="https://amale.eu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#FAF9FC] text-[#4B5563] border border-[#E9D5FF] hover:border-[#DDD6FE] hover:text-[#7C3AED] transition-all min-h-[38px]"
                >
                  <Globe className="w-3.5 h-3.5 text-[#7C3AED] flex-shrink-0" />
                  <span>amale.eu</span>
                </a>`;
code = code.replace(globeRegex, amaleLink);

fs.writeFileSync('src/components/CurriculumView.tsx', code);
