const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectModal.tsx', 'utf8');

code = code.replace(
  /className="relative group w-full rounded-xl sm:rounded-2xl overflow-hidden bg-\[#FAF5FF\] border border-\[#E9D5FF\] shadow-inner max-h-\[60vh\] flex items-center justify-center"/,
  'className="relative group w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF5FF] border border-[#E9D5FF] shadow-inner flex items-center justify-center"'
);

code = code.replace(
  /className="w-full max-h-\[58vh\] object-contain mx-auto transition-transform duration-500 group-hover:scale-\[1\.01\]"/,
  'className="w-full h-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"'
);

code = code.replace(
  /className="w-full max-h-\[58vh\] object-contain mx-auto"/,
  'className="w-full h-auto object-contain mx-auto"'
);

fs.writeFileSync('src/components/ProjectModal.tsx', code);
