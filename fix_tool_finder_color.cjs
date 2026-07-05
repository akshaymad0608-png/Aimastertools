const fs = require('fs');
let code = fs.readFileSync('components/AIToolFinder.tsx', 'utf8');

code = code.replace(
  '<span className="text-transparent bg-clip-text bg-gradient-premium">Finder Quiz</span>',
  '<span className="text-gradient-premium">Finder Quiz</span>'
);

fs.writeFileSync('components/AIToolFinder.tsx', code, 'utf8');
console.log('Fixed AI Tool Finder text color');
