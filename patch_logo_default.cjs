const fs = require('fs');
const filePath = 'components/Logo.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace('size = "md"', 'size = "sm"');
fs.writeFileSync(filePath, content);
console.log('Patched Logo default size to small');
