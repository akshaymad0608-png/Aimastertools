const fs = require('fs');
let code = fs.readFileSync('pages/BlogIndex.tsx', 'utf8');

code = code.replace(
  '<div className="relative w-full overflow-hidden shrink-0">',
  '<div className="relative w-full h-56 sm:h-60 overflow-hidden shrink-0 border-b border-[var(--color-border)]">'
);

fs.writeFileSync('pages/BlogIndex.tsx', code, 'utf8');
console.log('Fixed BlogIndex layout');
