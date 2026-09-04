const fs = require('fs');

let code = fs.readFileSync('src/components/ProjectsGrid.tsx', 'utf8');

// 1. Add useState to imports
if (!code.includes('useState')) {
  code = code.replace("import React from 'react';", "import React, { useState } from 'react';");
  // If "import React from 'react';" isn't there exactly, just do a generic replace
  if (code === fs.readFileSync('src/components/ProjectsGrid.tsx', 'utf8')) {
    code = code.replace("import { Project }", "import React, { useState } from 'react';\nimport { Project }");
  }
}

// 2. Add ProjectCardImage component
const projectCardImageCode = `
const ProjectCardImage = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-[#E9D5FF]/30 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={\`\${className} \${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500\`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};
`;

code = code.replace("export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onSelectProject }) => {", projectCardImageCode + "\nexport const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onSelectProject }) => {");

// 3. Replace the img tag with ProjectCardImage
const imgRegex = /<img\s+src=\{project\.cover \|\| project\.coverImage\}\s+alt=\{project\.title\}\s+className="([^"]+)"\s+loading="lazy"\s*\/>/g;
code = code.replace(imgRegex, '<ProjectCardImage src={project.cover || project.coverImage || ""} alt={project.title} className="$1" />');

// 4. Update the animation of the project cards to use whileInView and stagger
// We need to inject the index into the map function
code = code.replace("{projects.map((project) => {", "{projects.map((project, index) => {");

// Replace the motion.div animation props
const initialAnim = /initial=\{\{ opacity: 0, scale: 0.96 \}\}\s*animate=\{\{ opacity: 1, scale: 1 \}\}\s*exit=\{\{ opacity: 0, scale: 0.96 \}\}\s*transition=\{\{ duration: 0.35, ease: \[0.16, 1, 0.3, 1\] \}\}/g;
const newAnim = `initial={{ opacity: 0, y: 40, scale: 0.96 }}\n                  whileInView={{ opacity: 1, y: 0, scale: 1 }}\n                  viewport={{ once: true, margin: "-50px" }}\n                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}`;

code = code.replace(initialAnim, newAnim);

fs.writeFileSync('src/components/ProjectsGrid.tsx', code);
console.log("Updated ProjectsGrid.tsx");
