const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/import \{ HomeFinale \} from '\.\/components\/HomeFinale';\n/, '');

const finaleRegex = /\s*\{\/\* Home Finale with visual identity and subtle CTA \*\/\}[\s\S]*?<HomeFinale[\s\S]*?\/>/;
code = code.replace(finaleRegex, '');

fs.writeFileSync('src/App.tsx', code);
