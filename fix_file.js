const fs = require('fs');
let content = fs.readFileSync('pages/ToolDetail.tsx', 'utf8');
content = content.replace(/\} \[id\]\);/g, '}, [id]);');
content = content.replace(/\} \[tool\]\);/g, '}, [tool]);');
fs.writeFileSync('pages/ToolDetail.tsx', content);
