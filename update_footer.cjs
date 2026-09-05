const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const regex = /<a href="https:\/\/hits\.sh[^>]+>\s*<img alt="Hits" src="[^"]+" className="h-5" \/>\s*<\/a>/;

const newCounter = `<a href="https://visitor-badge.laobi.icu" target="_blank" rel="noreferrer" className="flex items-center" title="Contatore visitatori unici (privacy-friendly)">
            <img alt="Hits" src="https://visitor-badge.laobi.icu/badge?page_id=alicemariaritamele.com&left_text=Visitatori&right_color=%237C3AED" className="h-[20px]" />
          </a>`;

if (regex.test(code)) {
    code = code.replace(regex, newCounter);
    fs.writeFileSync('src/components/Footer.tsx', code);
    console.log("Replaced successfully!");
} else {
    console.log("Regex not found!");
}
