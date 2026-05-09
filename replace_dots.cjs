const fs = require('fs');

const file = 'constants.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacements = [
  ['Writing . Editing', 'AI Writing & Content'],
  ['Growth . Marketing', 'Marketing & SEO'],
];

for (const [oldVal, newVal] of replacements) {
    let oldRegex = new RegExp(`['"]${oldVal}['"]`, 'g');
    content = content.replace(oldRegex, `"${newVal}"`);
}
fs.writeFileSync(file, content);
console.log("Replaced dots");
