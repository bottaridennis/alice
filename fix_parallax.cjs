const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsGrid.tsx', 'utf8');

// Update imports
code = code.replace(
  /import React, \{ useState, useEffect \} from 'react';/,
  "import React, { useState, useEffect, useRef } from 'react';"
);
code = code.replace(
  /import \{ motion, AnimatePresence \} from 'motion\/react';/,
  "import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';"
);

// Add hooks
const fnStartRegex = /const \[isLoading, setIsLoading\] = useState\(true\);/;
const hookInject = `const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
`;
code = code.replace(fnStartRegex, hookInject);

// Add ref to section and background elements
const sectionRegex = /<motion\.section\s+id="progetti"/;
code = code.replace(sectionRegex, '<motion.section\n      ref={containerRef}\n      id="progetti"');

const innerContainerRegex = /<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/;
const blobsInject = `{/* Parallax Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#EDE9FE] blur-[100px] opacity-40 mix-blend-multiply"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-[40%] right-[-15%] w-[600px] h-[600px] rounded-full bg-[#F3E8FF] blur-[120px] opacity-30 mix-blend-multiply"
        />
        <motion.div 
          style={{ y: y3 }}
          className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#DDD6FE] blur-[90px] opacity-40 mix-blend-multiply"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">`;

code = code.replace(innerContainerRegex, blobsInject);

fs.writeFileSync('src/components/ProjectsGrid.tsx', code);
