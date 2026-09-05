const fs = require('fs');
let code = fs.readFileSync('src/components/CurriculumView.tsx', 'utf8');

code = code.replace(/className="pt-28 pb-20 relative"/, 'className="pt-40 sm:pt-32 pb-20 relative"');

fs.writeFileSync('src/components/CurriculumView.tsx', code);
