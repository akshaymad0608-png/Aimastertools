const fs = require('fs');
const filePath = 'index.html';
let content = fs.readFileSync(filePath, 'utf8');

const oldKeywords = '<meta name="keywords" content="AI tools directory, compare AI tools, best AI software, AI tool suggestions, AI Master Tools, Akshay Mahajan, Prompt Engineering, AI ML Engineering, best AI tools list 2026, free AI tools, ChatGPT alternatives, generative AI tools, AI productivity tools, machine learning applications, top AI software, AI for business, AI marketing tools, AI writing assistants, AI image generators, artificial intelligence directory" />';
const newKeywords = '<meta name="keywords" content="AI tools directory, best AI tools, free AI tools, compare AI tools, best AI software, AI tool suggestions, AI Master Tools, Akshay Mahajan, Prompt Engineering, AI ML Engineering, best AI tools list 2026, ChatGPT alternatives, generative AI tools, AI productivity tools, machine learning applications, top AI software, AI for business, AI marketing tools, AI writing tools, AI image generators, artificial intelligence tools, new AI tools, best AI tools for students, top 10 AI tools, free AI tools list" />';

content = content.replace(oldKeywords, newKeywords);
fs.writeFileSync(filePath, content);
console.log('Patched index.html keywords');
