const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// 1. Remove print marks
code = code.replace(/\{\/\* Decorative Print Marks[\s\S]*?<\/div>\s*<\/div>/, '');

// 2. Remove subtitle pill
code = code.replace(/\{\/\* Subtitle \/ Role Tag \*\/\}[\s\S]*?<\/div>/, '');

// 3. Animate Graphic Designer
const designerRegex = /<div className="flex items-center gap-3 mb-5 sm:mb-6">[\s\S]*?<\/div>/;
const animatedDesigner = `<div className="flex items-center gap-3 mb-5 sm:mb-6">
              <motion.div 
                initial={{ scaleX: 0 }} 
                animate={{ scaleX: 1 }} 
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="w-8 sm:w-10 h-[1.5px] bg-[#7C3AED]"
              ></motion.div>
              <motion.span 
                initial={{ opacity: 0, filter: 'blur(10px)', x: -20 }} 
                animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }} 
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                className="text-xl sm:text-3xl font-serif italic text-[#7C3AED]"
              >
                Graphic Designer
              </motion.span>
            </div>`;
code = code.replace(designerRegex, animatedDesigner);

fs.writeFileSync('src/components/Hero.tsx', code);
