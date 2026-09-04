const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const regex = /<span className="hidden sm:inline">·<\/span>\s*<a href="https:\/\/visitor-badge\.laobi\.icu"[^>]*>\s*<img alt="Hits"[^>]*\/>\s*<\/a>\s*/;

if (regex.test(code)) {
    code = code.replace(regex, '');
    fs.writeFileSync('src/components/Footer.tsx', code);
    console.log("Counter removed successfully!");
} else {
    console.log("Counter regex not found! Let's try something else.");
    console.log(code);
}
