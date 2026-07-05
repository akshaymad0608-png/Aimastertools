const fs = require('fs');
let code = fs.readFileSync('components/ToolLogo.tsx', 'utf8');

code = code.replace(
  /domain \? \`https:\/\/img\.logo\.dev\/\$\{domain\}\?token=pk_Yy124-7wSK-z-Hym446V9A\` : null/g,
  "domain ? `https://logo.clearbit.com/${domain}` : null"
);

code = code.replace(
  /src\?\.includes\("logo\.dev"\)/g,
  'src?.includes("logo.clearbit.com")'
);

fs.writeFileSync('components/ToolLogo.tsx', code, 'utf8');
console.log('Fixed ToolLogo.tsx');
