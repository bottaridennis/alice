const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('MagneticCursor')) {
  // Add import
  code = code.replace("import { Footer } from './components/Footer';", "import { Footer } from './components/Footer';\nimport { MagneticCursor } from './components/MagneticCursor';");
  
  // Inject MagneticCursor inside the main div wrapper
  code = code.replace('<div className="min-h-screen', '<MagneticCursor />\n    <div className="min-h-screen');
  
  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated App.tsx with MagneticCursor");
} else {
  console.log("MagneticCursor already in App.tsx");
}
