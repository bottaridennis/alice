const fs = require('fs');
const code = fs.readFileSync('src/components/Hero.tsx', 'utf8');
const fixed = code.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>\s*\);\s*};/, '</motion.div>\n        </div>\n      </div>\n    </section>\n  );\n};');
fs.writeFileSync('src/components/Hero.tsx', fixed);
