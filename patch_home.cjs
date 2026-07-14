const fs = require('fs');
const filePath = 'pages/Home.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldKeywordsRegex = /keywords=\{\[.*?\]\}/g;

const newKeywords = `keywords={['ai tools', 'free ai tools', 'best ai tools', 'ai tools directory', 'free ai tools list', 'chatgpt alternatives', 'ai image generators', 'ai writing tools', 'best ai tools for students', 'best ai tool for coding', 'free ai tools for video creation', 'best ai tool for ppt', 'ai detection tool free', 'free ai paraphrasing tool', 'top ai software', 'ai tools for business', 'machine learning tools', 'generative ai tools', 'artificial intelligence tools', 'new ai tools', 'ai productivity tools', 'AI Master Tools', 'Akshay Mahajan']}`;

content = content.replace(oldKeywordsRegex, newKeywords);
fs.writeFileSync(filePath, content);
console.log('Patched Home page');
