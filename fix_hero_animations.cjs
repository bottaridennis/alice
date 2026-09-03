const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// 1. Sparkle near name
const titleRegex = /<h1 className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-\[5\.5rem\] tracking-tight leading-\[0\.94\] text-\[#1A1A1A\] mb-3">[\s\S]*?Alice Mariarita Mele[\s\S]*?<\/h1>/;
const animatedTitle = `<h1 className="relative inline-block font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] tracking-tight leading-[0.94] text-[#1A1A1A] mb-3">
              Alice Mariarita Mele
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute -top-4 sm:-top-8 -right-6 sm:-right-12 text-[#C084FC] opacity-40 hidden sm:block"
              >
                <Sparkles size={40} strokeWidth={1.5} />
              </motion.div>
            </h1>`;
code = code.replace(titleRegex, animatedTitle);

// 2. Emphasize text in intro paragraph
const introRegex = /Progetto identità visive e materiali grafici capaci di trasformare idee, informazioni e contenuti in esperienze visive chiare, riconoscibili e coinvolgenti\./;
const animatedIntro = `Progetto identità visive e materiali grafici capaci di trasformare idee, informazioni e contenuti in{' '}
              <motion.span 
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#C084FC] to-[#7C3AED] bg-[length:200%_auto]"
              >
                esperienze visive chiare, riconoscibili e coinvolgenti.
              </motion.span>`;
code = code.replace(introRegex, animatedIntro);

// 3. Continuous floating for the avatar card
// It has: className="cursor-pointer absolute -top-4 sm:-top-6 right-1 sm:-right-6 ...
// Let's replace the opening tag of that div to be a motion.div with continuous animation.
const avatarDivRegex = /<div\s+onClick=\{\(\) => \{\s*const el = document\.getElementById\('about-preview-section'\);\s*if \(el\) el\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\}\}\s+className="cursor-pointer absolute -top-4 sm:-top-6 right-1 sm:-right-6 max-w-\[85%\] sm:max-w-none bg-white\/95 backdrop-blur-sm p-2 sm:p-2\.5 rounded-2xl shadow-lg border border-\[#E9D5FF\] flex items-center gap-2\.5 sm:gap-3 hover:scale-105 transition-all duration-200"\s+style=\{\{\s*transform: `translate\(\$\{mousePos\.x \* 0\.7\}px, \$\{-mousePos\.y \* 0\.7\}px\)`\s*\}\}\s*>/g;
// Actually I don't want to mess with mousePos if I can just wrap its inner contents.
// Let's replace: <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-gradient-to-b from-[#FAF8FE] via-[#F4EEFF] to-[#E9DDFD] border border-[#C084FC]/50 flex items-end justify-center flex-shrink-0 shadow-sm">
// with a motion wrapper.
const avatarImgRegex = /<div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-gradient-to-b from-\[#FAF8FE\] via-\[#F4EEFF\] to-\[#E9DDFD\] border border-\[#C084FC\]\/50 flex items-end justify-center flex-shrink-0 shadow-sm">/;
const animatedAvatarImg = `<motion.div 
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-gradient-to-b from-[#FAF8FE] via-[#F4EEFF] to-[#E9DDFD] border border-[#C084FC]/50 flex items-end justify-center flex-shrink-0 shadow-sm"
                >`;
code = code.replace(avatarImgRegex, animatedAvatarImg);
code = code.replace(/<\/img>\s*<\/div>/, '</img>\n                </motion.div>'); // wait, img is self closing <img ... />
// better to just replace the closing div.
// let's do a simple regex for closing div of avatar
// It is followed by: <div className="text-left pr-1 sm:pr-2">
const avatarImgClosingRegex = /<\/div>\s*<div className="text-left pr-1 sm:pr-2">/;
code = code.replace(avatarImgClosingRegex, '</motion.div>\n                <div className="text-left pr-1 sm:pr-2">');

fs.writeFileSync('src/components/Hero.tsx', code);
