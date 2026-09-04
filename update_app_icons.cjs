const fs = require('fs');

let code = fs.readFileSync('src/components/CurriculumView.tsx', 'utf8');

const newIconFunction = `
const getSoftwareIcon = (name: string) => {
  if (name.includes('Illustrator')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#330000] text-[#FF9A00] tracking-tighter">
      Ai
    </div>
  );
  if (name.includes('InDesign')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#49021F] text-[#FF3366] tracking-tighter">
      Id
    </div>
  );
  if (name.includes('Photoshop')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#001E36] text-[#31A8FF] tracking-tighter">
      Ps
    </div>
  );
  if (name.includes('XD')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#470137] text-[#FF61C6] tracking-tighter">
      Xd
    </div>
  );
  if (name.includes('Premiere')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#00005C] text-[#EA77FF] tracking-tighter">
      Pr
    </div>
  );
  if (name.includes('Character')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#14003C] text-[#DCA2FF] tracking-tighter">
      Ch
    </div>
  );
  if (name.includes('Articulate')) return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[14px] bg-[#00A5D9] text-white">
      a
    </div>
  );
  if (name.includes('Camtasia')) return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[14px] bg-[#087754] text-white">
      C
    </div>
  );
  if (name.includes('Office')) return (
    <div className="w-6 h-6 grid grid-cols-2 gap-[1.5px] p-[2.5px]">
      <div className="bg-[#F25022] rounded-sm"></div>
      <div className="bg-[#7FBA00] rounded-sm"></div>
      <div className="bg-[#00A4EF] rounded-sm"></div>
      <div className="bg-[#FFB900] rounded-sm"></div>
    </div>
  );
  
  return <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center font-bold text-[12px] text-gray-500">{name.charAt(0)}</div>;
};
`;

const oldIconFunctionRegex = /const getSoftwareIcon = \(name: string\) => \{[\s\S]*?return <Box \{\.\.\.iconProps\} \/>;\n\};/;

if (code.match(oldIconFunctionRegex)) {
  code = code.replace(oldIconFunctionRegex, newIconFunction.trim());
  fs.writeFileSync('src/components/CurriculumView.tsx', code);
  console.log("Updated to actual software icons.");
} else {
  console.log("Could not find old getSoftwareIcon function.");
}
