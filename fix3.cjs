const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const regex = /\{([^}]+)\}\s*<\/div>\s*<\/div>\s*<\/motion\.div>\s*<\/div>\s*<\/div>\s*<\/section>\s*\);\s*\};/g;

code = code.replace(/<span className="text-\[9px\] sm:text-\[10px\] text-\[#6B7280\]">Verona · Print & Editorial<\/span>\s*<\/div>\s*<\/div>\s*<\/motion\.div>\s*<\/div>\s*<\/div>\s*<\/section>\s*\);\s*\};/, '<span className="text-[9px] sm:text-[10px] text-[#6B7280]">Verona · Print & Editorial</span>\n                </div>\n              </div>\n            </div>\n          </motion.div>\n        </div>\n      </div>\n    </section>\n  );\n};');

fs.writeFileSync('src/components/Hero.tsx', code);
