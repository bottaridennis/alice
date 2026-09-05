const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

code = code.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/motion.div>\s*<\/div>\s*<\/div>\s*<\/section>\s*\);\s*};/, '            </div>\n          </motion.div>\n        </div>\n      </div>\n    </section>\n  );\n};');

fs.writeFileSync('src/components/Hero.tsx', code);
