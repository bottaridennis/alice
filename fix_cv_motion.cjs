const fs = require('fs');

let code = fs.readFileSync('src/components/CurriculumView.tsx', 'utf8');

code = code.replace(/<motion\.section[\s\S]*?className="/g, '<section className="');
code = code.replace(/<\/motion\.section>/g, '</section>');

fs.writeFileSync('src/components/CurriculumView.tsx', code);
