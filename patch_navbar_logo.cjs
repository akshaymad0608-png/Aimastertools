const fs = require('fs');
const filePath = 'components/Navbar.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace('<Logo size="md" />', '<Logo size="sm" />');
fs.writeFileSync(filePath, content);
console.log('Patched Navbar Logo to small');
