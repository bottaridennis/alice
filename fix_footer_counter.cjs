const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Ensure the footer has position relative z-10 so it overlays background
code = code.replace('<footer id="main-footer" className="border-t border-[#E9D5FF] bg-[#FDFCFE] py-8">', '<footer id="main-footer" className="border-t border-[#E9D5FF] bg-[#FDFCFE] py-8 relative z-10">');

// Add hit counter near copyright
const originalCopy = '<span className="font-serif italic font-bold text-sm text-[#1A1A1A]">Alice Mariarita Mele</span>';
const replacementCopy = `
          <span className="font-serif italic font-bold text-sm text-[#1A1A1A]">Alice Mariarita Mele</span>
          <span className="hidden sm:inline">·</span>
          <a href="https://hits.sh/alicemariaritamele-portfolio.run.app/" target="_blank" rel="noreferrer" className="flex items-center" title="Contatore visitatori unici (privacy-friendly)">
            <img alt="Hits" src="https://hits.sh/alicemariaritamele-portfolio.run.app.svg?view=today-total&style=flat-square&color=7C3AED&label=Visitatori" className="h-5" />
          </a>
`;

code = code.replace(originalCopy, replacementCopy);

fs.writeFileSync('src/components/Footer.tsx', code);
