const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsGrid.tsx', 'utf8');

code = code.replace('<section id="progetti" className="py-20 relative">', '<motion.section\n      id="progetti"\n      initial={{ opacity: 0, y: 30 }}\n      whileInView={{ opacity: 1, y: 0 }}\n      viewport={{ once: true, margin: "-100px" }}\n      transition={{ duration: 0.6, ease: "easeOut" }}\n      className="py-20 relative"\n    >');
code = code.replace('</section>', '</motion.section>');

fs.writeFileSync('src/components/ProjectsGrid.tsx', code);
