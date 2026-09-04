const fs = require('fs');
let code = fs.readFileSync('src/components/CurriculumView.tsx', 'utf8');

const ctaRegex = /\s*\{\/\* Bottom CTA on Curriculum Page \*\/\}[\s\S]*?<\/motion\.div>/;
code = code.replace(ctaRegex, '');

fs.writeFileSync('src/components/CurriculumView.tsx', code);
