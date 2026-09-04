const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Ensure useTransform is imported
if (!code.includes('useTransform')) {
  code = code.replace("import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';", "import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';");
}

// Extract scrollY
code = code.replace("const { scrollYProgress } = useScroll();", "const { scrollYProgress, scrollY } = useScroll();");

// Add parallax elements
const parallaxHTML = `
      {/* Global Parallax Background Texture/Shapes */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-full h-[150vh] opacity-[0.02]"
          style={{
            backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\`,
            y: useTransform(scrollY, [0, 2000], [0, -100])
          }}
        />
        <motion.div 
          className="absolute top-0 -left-[10vw] w-[40vw] h-[40vw] rounded-full bg-[#E9D5FF] opacity-30 blur-[120px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '150%']) }}
        />
        <motion.div 
          className="absolute top-[40vh] -right-[10vw] w-[45vw] h-[45vw] rounded-full bg-[#DDD6FE] opacity-20 blur-[120px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-100%']) }}
        />
      </div>
      
      {/* Navbar with Sticky blur and active page indicator */}`;

code = code.replace("{/* Navbar with Sticky blur and active page indicator */}", parallaxHTML);

// Fix z-index for main so it stays above parallax
code = code.replace('<main className="flex-grow">', '<main className="flex-grow relative z-10">');

fs.writeFileSync('src/App.tsx', code);
