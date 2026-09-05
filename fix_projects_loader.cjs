const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsGrid.tsx', 'utf8');

code = code.replace(/import React from 'react';/, "import React, { useState, useEffect } from 'react';");

const fnStartRegex = /export const ProjectsGrid: React\.FC<ProjectsGridProps> = \(\{\s*projects,\s*onSelectProject\s*\}\) => \{/;
const newFnStart = `export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  onSelectProject
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5s visual loading
    return () => clearTimeout(timer);
  }, []);
`;
code = code.replace(fnStartRegex, newFnStart);

const sectionHeaderRegex = /\{\/\* Section Header \*\/\}/;
const loadingBlock = `
        {/* Section Header */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 sm:py-60 space-y-12 min-h-[50vh]">
            {/* CMYK overlapping spinner loader */}
            <div className="relative w-20 h-20 flex items-center justify-center mix-blend-multiply">
              <motion.div
                animate={{ x: [-15, 15, -15], y: [-15, 15, -15], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="absolute w-10 h-10 rounded-full bg-[#00FFFF] opacity-80 mix-blend-multiply"
              />
              <motion.div
                animate={{ x: [15, -15, 15], y: [-15, 15, -15], scale: [1.2, 1, 1.2] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                className="absolute w-10 h-10 rounded-full bg-[#FF00FF] opacity-80 mix-blend-multiply"
              />
              <motion.div
                animate={{ y: [15, -15, 15], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.6 }}
                className="absolute w-10 h-10 rounded-full bg-[#FFFF00] opacity-80 mix-blend-multiply"
              />
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <motion.p 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="font-serif italic text-xl sm:text-2xl text-[#1A1A1A] tracking-wide"
              >
                Stampa in corso...
              </motion.p>
              <div className="flex gap-1.5">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} />
                <motion.div className="w-1.5 h-1.5 rounded-full bg-[#FF00FF]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                <motion.div className="w-1.5 h-1.5 rounded-full bg-[#FFFF00]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
                <motion.div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.6 }} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Section Header */}`;

code = code.replace(sectionHeaderRegex, loadingBlock);

const closingSectionRegex = /<\/motion\.section>\s*\);\s*\};/;
const newClosingSection = `
          </>
        )}
      </div>
    </motion.section>
  );
};`;
// wait, the last tags are:
//       </div>
//     </motion.section>
//   );
// };
code = code.replace(/<\/div>\s*<\/motion\.section>\s*\);\s*\};\s*$/, '          </>\n        )}\n      </div>\n    </motion.section>\n  );\n};\n');

fs.writeFileSync('src/components/ProjectsGrid.tsx', code);
