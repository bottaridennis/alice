const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsGrid.tsx', 'utf8');

code = code.replace(/className="absolute top-\[10%\] left-\[-10%\] w-\[500px\] h-\[500px\] rounded-full bg-\[#EDE9FE\] blur-\[100px\] opacity-40 mix-blend-multiply"/, 'className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#D8B4FE] blur-[120px] opacity-40"');
code = code.replace(/className="absolute top-\[40%\] right-\[-15%\] w-\[600px\] h-\[600px\] rounded-full bg-\[#F3E8FF\] blur-\[120px\] opacity-30 mix-blend-multiply"/, 'className="absolute top-[40%] right-[-15%] w-[600px] h-[600px] rounded-full bg-[#E9D5FF] blur-[140px] opacity-50"');
code = code.replace(/className="absolute bottom-\[-10%\] left-\[20%\] w-\[400px\] h-\[400px\] rounded-full bg-\[#DDD6FE\] blur-\[90px\] opacity-40 mix-blend-multiply"/, 'className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#C084FC] blur-[100px] opacity-30"');

fs.writeFileSync('src/components/ProjectsGrid.tsx', code);
