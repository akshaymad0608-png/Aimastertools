const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');
content = content.replace(/category: "Technology . IT"/g, 'category: "Code & Development"');
content = content.replace(/category: "Design . Creative"/g, 'category: "UI/UX & Design Tools"');
content = content.replace(/category: 'Chat'/g, "category: 'AI Chatbots & Assistants'");
content = content.replace(/category: 'Code'/g, "category: 'Code & Development'");
content = content.replace(/category: "Chat"/g, 'category: "AI Chatbots & Assistants"');
content = content.replace(/category: "Code"/g, 'category: "Code & Development"');
fs.writeFileSync('constants.tsx', content);
