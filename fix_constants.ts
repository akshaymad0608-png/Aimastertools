import fs from 'fs';

const filePath = './constants.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

content = content.replace(/auto=format&fit=crop/g, 'auto=format&fm=webp&fit=crop');

fs.writeFileSync(filePath, content);
console.log('Updated constants.tsx');
