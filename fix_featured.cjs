const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

content = content.replace(/"isFeatured": /g, 'featured: ');

fs.writeFileSync('constants.tsx', content);
console.log('Fixed features field');
