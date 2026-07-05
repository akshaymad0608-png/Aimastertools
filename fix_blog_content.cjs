const fs = require('fs');
let code = fs.readFileSync('pages/BlogPost.tsx', 'utf8');

code = code.replace(
  /<ReactMarkdown>\{post\.content\}<\/ReactMarkdown>/g,
  '<ReactMarkdown>{post.content || \'\'}</ReactMarkdown>'
);

fs.writeFileSync('pages/BlogPost.tsx', code, 'utf8');
console.log('Fixed post.content undefined issue');
