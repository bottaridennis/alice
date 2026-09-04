const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
    'return (\n    <MagneticCursor />\n    <div className="min-h-screen',
    'return (\n    <>\n      <MagneticCursor />\n      <div className="min-h-screen'
);

code = code.replace(
    '      <Footer />\n    </div>\n  );\n}',
    '      <Footer />\n    </div>\n    </>\n  );\n}'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed JSX in App.tsx");
