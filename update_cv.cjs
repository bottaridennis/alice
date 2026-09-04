const fs = require('fs');
let code = fs.readFileSync('src/components/CurriculumView.tsx', 'utf8');

// Increase spacing in experiences timeline
code = code.replace(/space-y-6 sm:space-y-8/g, "space-y-10 sm:space-y-12");
code = code.replace(/mb-3\.5 sm:mb-4/g, "mb-4 sm:mb-5"); // Extra spacing inside the card

// Increase font weight and size for experience roles
code = code.replace(/font-bold text-lg sm:text-2xl text-\[#1A1A1A\]/g, "font-extrabold text-xl sm:text-2xl text-[#000000]");

// Increase font weight and size for education
code = code.replace(/font-bold text-base sm:text-lg text-\[#1A1A1A\]/g, "font-extrabold text-lg sm:text-xl text-[#000000]");

// Darken general text for better readability on mobile
// text-[#4B5563] -> text-[#1F2937]
code = code.replace(/text-\[#4B5563\]/g, "text-[#1F2937]");
// text-[#6B7280] -> text-[#374151]
code = code.replace(/text-\[#6B7280\]/g, "text-[#374151]");

fs.writeFileSync('src/components/CurriculumView.tsx', code);
