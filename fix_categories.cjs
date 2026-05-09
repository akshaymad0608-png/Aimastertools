const fs = require('fs');

const file = 'constants.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacements = [
  ['"Writing & Editing"', '"AI Writing & Content"'],
  ['"Writing"', '"AI Writing & Content"'],
  ['"Image"', '"Image & Art Generation"'],
  ['"Coding"', '"Code & Development"'],
  ['"Technology & IT"', '"Code & Development"'],
  ['"Video"', '"Video & Audio Tools"'],
  ['"Audio"', '"Video & Audio Tools"'],
  ['"Chatbots"', '"AI Chatbots & Assistants"'],
  ['"Marketing"', '"Marketing & SEO"'],
  ['"Growth & Marketing"', '"Marketing & SEO"'],
  ['"SEO"', '"Marketing & SEO"'],
  ['"Productivity"', '"Productivity & Automation"'],
  ['"Research"', '"Research & Analysis"'],
  ['"Design"', '"UI/UX & Design Tools"'],
  ['"Design & Creative"', '"UI/UX & Design Tools"'],
  ['"Business"', '"Business & Finance AI"'],
  ['"Finance"', '"Business & Finance AI"'],
  ['"Sales"', '"Business & Finance AI"'],
  ['"HR"', '"Business & Finance AI"'],
  ['"Education"', '"Learning & Education"'],
  ['"Workflow Automation"', '"AI Agents & Automation"'],
  ['"Avatars"', '"Video & Audio Tools"'],
  ['"Generative AI"', '"AI Writing & Content"']
];

for (const [oldVal, newVal] of replacements) {
    content = content.replace(new RegExp(`category: ${oldVal}`, 'g'), `category: ${newVal}`);
    content = content.replace(new RegExp(`id: ${oldVal},`, 'g'), `id: ${newVal},`);
    content = content.replace(new RegExp(`name: ${oldVal},`, 'g'), `name: ${newVal},`);
    
    let oldValSq = oldVal.replace(/"/g, "'");
    let newValSq = newVal.replace(/"/g, "'");
    content = content.replace(new RegExp(`category: ${oldValSq}`, 'g'), `category: ${newValSq}`);
    content = content.replace(new RegExp(`id: ${oldValSq},`, 'g'), `id: ${newValSq},`);
    content = content.replace(new RegExp(`name: ${oldValSq},`, 'g'), `name: ${newValSq},`);
}
fs.writeFileSync(file, content);
console.log("Categories fixed");
