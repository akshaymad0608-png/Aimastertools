const fs = require('fs');
let code = fs.readFileSync('components/ToolLogo.tsx', 'utf8');

code = code.replace(
  'loading="lazy"',
  'loading="lazy"\n        referrerPolicy="no-referrer"'
);

fs.writeFileSync('components/ToolLogo.tsx', code, 'utf8');
console.log('Added referrerPolicy');
