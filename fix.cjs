const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// I'll just restore the div tags to how they were, then change the correct one.
code = code.replace('</motion.div>\n        </div>\n      </div>\n    </section>\n  );\n};', '</div>\n              </div>\n            </div>\n          </motion.div>\n        </div>\n      </div>\n    </section>\n  );\n};');

fs.writeFileSync('src/components/Hero.tsx', code);
