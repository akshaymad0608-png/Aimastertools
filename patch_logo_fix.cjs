const fs = require('fs');
let content = fs.readFileSync('components/Logo.tsx', 'utf8');

// Revert back to reasonable sizes
content = content.replace("isSmall ? 'w-12 h-12' : 'w-16 h-16'", "isSmall ? 'w-9 h-9' : 'w-12 h-12'");
content = content.replace('size={isSmall ? 38 : 52}', 'size={isSmall ? 34 : 44}');
content = content.replace('size={isSmall ? 18 : 26}', 'size={isSmall ? 16 : 22}');
content = content.replace('isSmall ? "text-[26px]" : "text-[34px]"', 'isSmall ? "text-[22px]" : "text-[30px]"');
content = content.replace('text-[10px] font-bold', 'text-[9px] font-bold');

fs.writeFileSync('components/Logo.tsx', content);

let navContent = fs.readFileSync('components/Navbar.tsx', 'utf8');
navContent = navContent.replace('<Logo size="md" />', '<Logo size="sm" />');
fs.writeFileSync('components/Navbar.tsx', navContent);
console.log('Fixed Logo sizes and set to sm in Navbar');
