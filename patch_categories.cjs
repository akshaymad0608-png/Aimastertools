const fs = require('fs');
const filePath = 'data/categories.ts';
let content = fs.readFileSync(filePath, 'utf8');

const newCategory = `  {
    "id": "Official Google Tools",
    "name": "Official Google Tools",
    "icon": "ti-google",
    "bg": "#E8F0FE",
    "color": "#1A73E8",
    "emoji": "🔵"
  },`;

if (!content.includes('"Official Google Tools"')) {
  content = content.replace('export const CATEGORY_META = [', 'export const CATEGORY_META = [\n' + newCategory);
  fs.writeFileSync(filePath, content);
  console.log('Added Official Google Tools category');
}
