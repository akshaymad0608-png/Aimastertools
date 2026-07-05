const fs = require('fs');
let code = fs.readFileSync('pages/Workflows.tsx', 'utf8');

code = code.replace(
  '<span className="text-transparent bg-clip-text bg-gradient-premium">AI Workflows</span>',
  '<span className="text-gradient-premium">AI Workflows</span>'
);

fs.writeFileSync('pages/Workflows.tsx', code, 'utf8');
console.log('Fixed AI Workflows text color');
