const fs = require('fs');
let code = fs.readFileSync('components/AIToolFinder.tsx', 'utf8');

if (!code.includes("import ToolLogo")) {
  code = code.replace(
    "import { Tool } from '../types';",
    "import { Tool } from '../types';\nimport ToolLogo from './ToolLogo';"
  );
  fs.writeFileSync('components/AIToolFinder.tsx', code, 'utf8');
  console.log("Added ToolLogo import");
} else {
  console.log("Already imported");
}
