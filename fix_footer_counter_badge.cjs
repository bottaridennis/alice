const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const originalHits = 'https://hits.sh/alicemariaritamele-portfolio.run.app.svg?view=today-total&style=flat-square&color=7C3AED&label=Visitatori';
const newHits = 'https://visitor-badge.laobi.icu/badge?page_id=alicemariaritamele-portfolio.run.app&left_text=Visitatori&right_color=%237C3AED';

code = code.replace(originalHits, newHits);

fs.writeFileSync('src/components/Footer.tsx', code);
