const fs = require('fs');
let code = fs.readFileSync('src/components/AboutPreview.tsx', 'utf8');

code = code.replace('<section id="about-preview-section" className="py-20 relative overflow-hidden">', '<motion.section\n      id="about-preview-section"\n      initial={{ opacity: 0, y: 40 }}\n      whileInView={{ opacity: 1, y: 0 }}\n      viewport={{ once: true, margin: "-100px" }}\n      transition={{ duration: 0.8, ease: "easeOut" }}\n      className="py-20 relative overflow-hidden"\n    >');
code = code.replace('</section>', '</motion.section>');

fs.writeFileSync('src/components/AboutPreview.tsx', code);
