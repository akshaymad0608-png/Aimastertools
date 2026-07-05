const fs = require('fs');
let code = fs.readFileSync('components/BlogCoverImage.tsx', 'utf8');

code = code.replace(
  'referrerPolicy="no-referrer"\n          referrerPolicy="no-referrer"',
  'referrerPolicy="no-referrer"'
);

fs.writeFileSync('components/BlogCoverImage.tsx', code, 'utf8');
console.log('Fixed duplicate referrerPolicy');
