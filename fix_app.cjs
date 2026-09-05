const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add motion imports
code = code.replace(
  /import \{ Navbar \} from '\.\/components\/Navbar';/,
  "import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';\nimport { Navbar } from './components/Navbar';"
);

// Add hooks in App component
const hookTarget = /const \[currentPage, setCurrentPage\] = useState<PageType>\('portfolio'\);/;
const hookInjection = `const [currentPage, setCurrentPage] = useState<PageType>('portfolio');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });`;
code = code.replace(hookTarget, hookInjection);

// Add progress bar and AnimatePresence to main
const mainRegex = /<main className="flex-grow">[\s\S]*?<\/main>/;
const newMain = `<main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'portfolio' ? (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Hero Section */}
              <Hero
                onNavigateProjects={handleScrollToProjects}
                onNavigateCurriculum={() => handleNavigatePage('curriculum')}
                onSelectFeaturedProject={handleSelectFeaturedProject}
              />

              {/* Dynamic Editorial Projects Grid */}
              <ProjectsGrid
                projects={PROJECTS_DATA}
                onSelectProject={(project) => setSelectedProject(project)}
              />

              {/* Short About Section as specified */}
              <AboutPreview
                onNavigateCurriculum={() => handleNavigatePage('curriculum')}
              />

              {/* Home Finale with visual identity and subtle CTA */}
              <HomeFinale
                onNavigateCurriculum={() => handleNavigatePage('curriculum')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <CurriculumView
                onBackToPortfolio={() => handleNavigatePage('portfolio')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>`;
code = code.replace(mainRegex, newMain);

// Insert progress bar at top of return
const returnRegex = /return \(\s*<div className="min-h-screen bg-\[#FAF9FD\] text-\[#1A1721\] flex flex-col font-sans selection:bg-\[#E9D5FF\] selection:text-\[#581C87\]">/;
const newReturn = `return (
    <div className="min-h-screen bg-[#FAF9FD] text-[#1A1721] flex flex-col font-sans selection:bg-[#E9D5FF] selection:text-[#581C87]">
      {/* Elegant Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#7C3AED] origin-left z-[100]"
        style={{ scaleX }}
      />`;
code = code.replace(returnRegex, newReturn);

fs.writeFileSync('src/App.tsx', code);
