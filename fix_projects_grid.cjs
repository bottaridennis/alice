const fs = require('fs');

let code = fs.readFileSync('src/components/ProjectsGrid.tsx', 'utf8');

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

if (!code.includes('const ProjectCardImage')) {
  // Let's insert it before export const ProjectsGrid
  code = code.replace("export const ProjectsGrid: React.FC<ProjectsGridProps> = ({", projectCardImageCode + "\nexport const ProjectsGrid: React.FC<ProjectsGridProps> = ({");
  fs.writeFileSync('src/components/ProjectsGrid.tsx', code);
  console.log("Injected ProjectCardImage successfully.");
} else {
  console.log("ProjectCardImage already injected.");
}
