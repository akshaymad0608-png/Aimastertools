const fs = require('fs');
let code = fs.readFileSync('pages/Home.tsx', 'utf8');

const importCode = `import { BlogSection } from '../components/BlogSection';`;
const newImportCode = `import { CollectionsSection } from '../components/home/CollectionsSection';\nimport { BlogSection } from '../components/BlogSection';`;

if (!code.includes('CollectionsSection')) {
  code = code.replace(importCode, newImportCode);
}

const tagCode = `<BlogSection />`;
const newTagCode = `<CollectionsSection />\n      <BlogSection />`;

if (!code.includes('<CollectionsSection />')) {
  code = code.replace(tagCode, newTagCode);
}

fs.writeFileSync('pages/Home.tsx', code, 'utf8');
console.log('Home.tsx updated with CollectionsSection');
