const fs = require('fs');

const emojis = {
  "AI Chatbots & Assistants": "🤖",
  "AI Search Engines": "🔍",
  "Code & Development": "💻",
  "AI App Builders": "📱",
  "Image & Art Generation": "🎨",
  "Video & Audio Tools": "🎬",
  "Voice & Audio AI": "🎙️",
  "AI Presentation Tools": "📊",
  "AI Meeting Assistants": "🤝",
  "AI PDF & Document Tools": "📄",
  "AI Email Assistants": "✉️",
  "AI Resume & Career Tools": "💼",
  "AI Website Builders": "🌐",
  "AI Social Media Tools": "📱",
  "AI Cybersecurity Tools": "🛡️",
  "AI Healthcare Tools": "⚕️",
  "AI Real Estate Tools": "🏠",
  "AI Ecommerce Tools": "🛒",
  "AI Chrome Extensions": "🧩",
  "AI Workflow Automation": "⚙️",
  "AI Writing & Content": "✍️",
  "Marketing & SEO": "📈",
  "Chatbot Creator Tools": "💬",
  "Customer Support": "🎧",
  "Research & Analysis": "🔬",
  "Gen AI Creator Tools": "🪄",
  "UI/UX & Design Tools": "✨",
  "Business & Finance AI": "📈",
  "Learning & Education": "🎓",
  "AI Agents & Automation": "🧠",
  "LLM Providers & APIs": "🔌",
  "HR & Recruiting": "👥",
  "3D & Animation": "🧊",
  "Data Science & Analytics": "📉",
  "Legal & Compliance": "⚖️",
  "Gaming & Entertainment": "🎮",
  "Video & Audio Generation": "🎥",
  "Text & Writing": "📝",
  "SEO & Marketing Tools": "🎯",
  "Productivity & Collaboration": "🚀",
  "Personal Assistant": "🙋"
};

let content = fs.readFileSync('data/categories.ts', 'utf8');

for (const [name, emoji] of Object.entries(emojis)) {
  const regex = new RegExp(`"name": "${name}",([^}]+)}`, 'g');
  content = content.replace(regex, (match, inner) => {
    if (!inner.includes('"emoji"')) {
      return `"name": "${name}",${inner.replace(/(\n\s*)$/, `,\n    "emoji": "${emoji}"$1`)}}`;
    }
    return match;
  });
}

fs.writeFileSync('data/categories.ts', content);
console.log('Done!');
