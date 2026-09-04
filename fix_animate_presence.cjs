const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace AnimatePresence
code = code.replace(/<AnimatePresence mode="wait">/g, "");
code = code.replace(/<\/AnimatePresence>/g, "");
code = code.replace(/exit=\{\{ opacity: 0, y: -20 \}\}/g, "");

fs.writeFileSync('src/App.tsx', code);
