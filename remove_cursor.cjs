const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove import
code = code.replace("import { MagneticCursor } from './components/MagneticCursor';\n", "");
code = code.replace("import { MagneticCursor } from './components/MagneticCursor';", "");

// Remove component
code = code.replace("<MagneticCursor />\n", "");
code = code.replace("<MagneticCursor />", "");

fs.writeFileSync('src/App.tsx', code);
console.log("Removed MagneticCursor from App.tsx");
