const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

content = content.replace(/"image": "/g, 'imageUrl: "');

fs.writeFileSync('constants.tsx', content);
console.log('Fixed imageUrl field');
