const fs = require('fs');

const path = './pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

const importStatement = `import { FAQSection } from '../components/home/FAQSection';`;

if (!content.includes('FAQSection')) {
  // Add import
  content = content.replace(`import { ExploreDirectory } from '../components/home/ExploreDirectory';`, `import { ExploreDirectory } from '../components/home/ExploreDirectory';\n${importStatement}`);
  
  // Add component before NewsletterSection
  content = content.replace(`<NewsletterSection showToast={showToast} />`, `<FAQSection />\n      <NewsletterSection showToast={showToast} />`);
  
  fs.writeFileSync(path, content, 'utf8');
  console.log("Home.tsx updated with FAQSection");
} else {
  console.log("Home.tsx already has FAQSection");
}
