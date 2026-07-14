const fs = require('fs');
let content = fs.readFileSync('components/Logo.tsx', 'utf8');

content = content.replace("isSmall ? 'w-10 h-10' : 'w-12 h-12'", "isSmall ? 'w-12 h-12' : 'w-16 h-16'");
content = content.replace('size={isSmall ? 32 : 40}', 'size={isSmall ? 38 : 52}');
content = content.replace('size={isSmall ? 16 : 20}', 'size={isSmall ? 18 : 26}');
content = content.replace('isSmall ? "text-[22px]" : "text-[28px]"', 'isSmall ? "text-[26px]" : "text-[34px]"');
content = content.replace('text-[9px] font-bold', 'text-[10px] font-bold');

fs.writeFileSync('components/Logo.tsx', content);
console.log('Logo made bigger');
