const fs = require('fs');
let code = fs.readFileSync('data/blogs.ts', 'utf8');

code = code.replace(
  /id: '1',\s*title: 'Top 10 AI Tools for Students in 2026',/,
  "id: '1',\n    title: 'Top 10 AI Tools for Students in 2026',\n    category: 'EDUCATION',"
);

code = code.replace(
  /id: '2',\s*title: 'AI vs Human Creativity: The Balance',/,
  "id: '2',\n    title: 'AI vs Human Creativity: The Balance',\n    category: 'DESIGN',"
);

code = code.replace(
  /id: '3',\s*title: 'Latest AI Trends to Watch',/,
  "id: '3',\n    title: 'Latest AI Trends to Watch',\n    category: 'RESEARCH',"
);

fs.writeFileSync('data/blogs.ts', code, 'utf8');
console.log('Fixed categories');
