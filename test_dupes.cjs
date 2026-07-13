const fs = require('fs');

const content = fs.readFileSync('data/tools.ts', 'utf8');

const idRegex = /"id": "([^"]+)"/g;
let match;
const ids = [];
while ((match = idRegex.exec(content)) !== null) {
  ids.push(match[1]);
}

const dupes = ids.filter((item, index) => ids.indexOf(item) !== index);
console.log(`Total tools: ${ids.length}`);
console.log(`Duplicates: ${[...new Set(dupes)].join(', ')}`);
