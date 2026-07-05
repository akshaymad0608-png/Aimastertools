const fs = require('fs');

const path = './pages/FindMyTool.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(`import AIToolFinder from '../components/AIToolFinder';`, `import { AIToolFinder } from '../components/AIToolFinder';`);

fs.writeFileSync(path, content, 'utf8');
console.log("FindMyTool.tsx updated");
