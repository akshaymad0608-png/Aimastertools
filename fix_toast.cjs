const fs = require('fs');
const filePath = 'components/Navbar.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace("import toast from 'react-hot-toast';", "");
content = content.replace("toast?.success?.('Link copied to clipboard!') || alert('Link copied to clipboard!');", "");

fs.writeFileSync(filePath, content);
console.log('Fixed toast import in Navbar.tsx');
