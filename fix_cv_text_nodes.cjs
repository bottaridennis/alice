const fs = require('fs');

let code = fs.readFileSync('src/components/CurriculumView.tsx', 'utf8');

code = code.replace(/>\s+Ai\s+<\/div>/g, "><span>Ai</span></div>");
code = code.replace(/>\s+Id\s+<\/div>/g, "><span>Id</span></div>");
code = code.replace(/>\s+Ps\s+<\/div>/g, "><span>Ps</span></div>");
code = code.replace(/>\s+Xd\s+<\/div>/g, "><span>Xd</span></div>");
code = code.replace(/>\s+Pr\s+<\/div>/g, "><span>Pr</span></div>");
code = code.replace(/>\s+Ch\s+<\/div>/g, "><span>Ch</span></div>");
code = code.replace(/>\s+a\s+<\/div>/g, "><span>a</span></div>");
code = code.replace(/>\s+C\s+<\/div>/g, "><span>C</span></div>");
code = code.replace(/>\{name.charAt\(0\)\}<\/div>/g, "><span>{name.charAt(0)}</span></div>");

fs.writeFileSync('src/components/CurriculumView.tsx', code);
