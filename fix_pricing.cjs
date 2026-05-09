const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

content = content.replace(/"price": "Freemium"/g, 'pricing: "Freemium"');
content = content.replace(/"price": "Paid"/g, 'pricing: "Paid"');
content = content.replace(/"price": "Free"/g, 'pricing: "Free"');

fs.writeFileSync('constants.tsx', content);
console.log('Fixed pricing field');
