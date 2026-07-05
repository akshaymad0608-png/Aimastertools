import { CategoryStat } from '../types';
import { MOCK_TOOLS } from './tools';

export const CATEGORY_META = [
  {
    "id": "AI Chatbots & Assistants",
    "name": "AI Chatbots & Assistants",
    "icon": "ti-robot",
    "bg": "#E1F5EE",
    "color": "#0F6E56",
    "emoji": "🤖"
  },
  {
    "id": "AI Search Engines",
    "name": "AI Search Engines",
    "icon": "ti-search",
    "bg": "#E4F1FE",
    "color": "#1A56A5",
    "emoji": "🔍"
  },
  {
    "id": "Code & Development",
    "name": "Code & Development",
    "icon": "ti-code",
    "bg": "#EAF3DE",
    "color": "#3B6D11",
    "emoji": "💻"
  },
  {
    "id": "AI App Builders",
    "name": "AI App Builders",
    "icon": "ti-layers",
    "bg": "#EEEDFE",
    "color": "#534AB7",
    "emoji": "📱"
  },
  {
    "id": "Image & Art Generation",
    "name": "Image & Art Generation",
    "icon": "ti-palette",
    "bg": "#E6F1FB",
    "color": "#185FA5",
    "emoji": "🎨"
  },
  {
    "id": "Video & Audio Tools",
    "name": "Video & Audio Tools",
    "icon": "ti-video",
    "bg": "#FAEEDA",
    "color": "#633806",
    "emoji": "🎬"
  },
  {
    "id": "Voice & Audio AI",
    "name": "Voice & Audio AI",
    "icon": "ti-microphone",
    "bg": "#FBEAF0",
    "color": "#72243E",
    "emoji": "🎙️"
  },
  {
    "id": "AI Presentation Tools",
    "name": "AI Presentation Tools",
    "icon": "ti-desktop",
    "bg": "#EEEDFE",
    "color": "#534AB7",
    "emoji": "📊"
  },
  {
    "id": "AI Meeting Assistants",
    "name": "AI Meeting Assistants",
    "icon": "ti-headphone-alt",
    "bg": "#EAF3DE",
    "color": "#3B6D11",
    "emoji": "🤝"
  },
  {
    "id": "AI PDF & Document Tools",
    "name": "AI PDF & Document Tools",
    "icon": "ti-file",
    "bg": "#E6F1FB",
    "color": "#185FA5",
    "emoji": "📄"
  },
  {
    "id": "AI Email Assistants",
    "name": "AI Email Assistants",
    "icon": "ti-email",
    "bg": "#FBEAF0",
    "color": "#72243E",
    "emoji": "✉️"
  },
  {
    "id": "AI Resume & Career Tools",
    "name": "AI Resume & Career Tools",
    "icon": "ti-id-badge",
    "bg": "#FAECE7",
    "color": "#712B13",
    "emoji": "💼"
  },
  {
    "id": "AI Website Builders",
    "name": "AI Website Builders",
    "icon": "ti-world",
    "bg": "#E1F5EE",
    "color": "#0F6E56",
    "emoji": "🌐"
  },
  {
    "id": "AI Social Media Tools",
    "name": "AI Social Media Tools",
    "icon": "ti-share2",
    "bg": "#FBEAF0",
    "color": "#72243E",
    "emoji": "📱"
  },
  {
    "id": "AI Cybersecurity Tools",
    "name": "AI Cybersecurity Tools",
    "icon": "ti-shield",
    "bg": "#E6F1FB",
    "color": "#185FA5",
    "emoji": "🛡️"
  },
  {
    "id": "AI Healthcare Tools",
    "name": "AI Healthcare Tools",
    "icon": "ti-heart",
    "bg": "#FBEAF0",
    "color": "#72243E",
    "emoji": "⚕️"
  },
  {
    "id": "AI Real Estate Tools",
    "name": "AI Real Estate Tools",
    "icon": "ti-home",
    "bg": "#FAEEDA",
    "color": "#633806",
    "emoji": "🏠"
  },
  {
    "id": "AI Ecommerce Tools",
    "name": "AI Ecommerce Tools",
    "icon": "ti-shopping-cart",
    "bg": "#FAECE7",
    "color": "#712B13",
    "emoji": "🛒"
  },
  {
    "id": "AI Chrome Extensions",
    "name": "AI Chrome Extensions",
    "icon": "ti-plug",
    "bg": "#EEEDFE",
    "color": "#534AB7",
    "emoji": "🧩"
  },
  {
    "id": "AI Workflow Automation",
    "name": "AI Workflow Automation",
    "icon": "ti-settings",
    "bg": "#EAF3DE",
    "color": "#3B6D11",
    "emoji": "⚙️"
  },
  {
    "id": "AI Writing & Content",
    "name": "AI Writing & Content",
    "icon": "ti-pencil",
    "bg": "#EEEDFE",
    "color": "#534AB7",
    "emoji": "✍️"
  },
  {
    "id": "Marketing & SEO",
    "name": "Marketing & SEO",
    "icon": "ti-speakerphone",
    "bg": "#FBEAF0",
    "color": "#72243E",
    "emoji": "📈"
  },
  {
    "id": "Chatbot Creator Tools",
    "name": "Chatbot Creator Tools",
    "icon": "ti-messages",
    "bg": "#EAF3DE",
    "color": "#3B6D11",
    "emoji": "💬"
  },
  {
    "id": "Customer Support",
    "name": "Customer Support",
    "icon": "ti-headphone",
    "bg": "#EAF3DE",
    "color": "#3B6D11",
    "emoji": "🎧"
  },
  {
    "id": "Research & Analysis",
    "name": "Research & Analysis",
    "icon": "ti-search",
    "bg": "#E6F1FB",
    "color": "#185FA5",
    "emoji": "🔬"
  },
  {
    "id": "Gen AI Creator Tools",
    "name": "Gen AI Creator Tools",
    "icon": "ti-wand",
    "bg": "#EEEDFE",
    "color": "#534AB7",
    "emoji": "🪄"
  },
  {
    "id": "UI/UX & Design Tools",
    "name": "UI/UX & Design Tools",
    "icon": "ti-brush",
    "bg": "#EEEDFE",
    "color": "#534AB7",
    "emoji": "✨"
  },
  {
    "id": "Business & Finance AI",
    "name": "Business & Finance AI",
    "icon": "ti-briefcase",
    "bg": "#EAF3DE",
    "color": "#3B6D11",
    "emoji": "📈"
  },
  {
    "id": "Learning & Education",
    "name": "Learning & Education",
    "icon": "ti-book",
    "bg": "#FAEEDA",
    "color": "#633806",
    "emoji": "🎓"
  },
  {
    "id": "AI Agents & Automation",
    "name": "AI Agents & Automation",
    "icon": "ti-brain",
    "bg": "#E1F5EE",
    "color": "#0F6E56",
    "emoji": "🧠"
  },
  {
    "id": "LLM Providers & APIs",
    "name": "LLM Providers & APIs",
    "icon": "ti-server",
    "bg": "#EAF3DE",
    "color": "#3B6D11",
    "emoji": "🔌"
  },
  {
    "id": "HR & Recruiting",
    "name": "HR & Recruiting",
    "icon": "ti-user",
    "bg": "#FBEAF0",
    "color": "#72243E",
    "emoji": "👥"
  },
  {
    "id": "3D & Animation",
    "name": "3D & Animation",
    "icon": "ti-box",
    "bg": "#E6F1FB",
    "color": "#185FA5",
    "emoji": "🧊"
  },
  {
    "id": "Data Science & Analytics",
    "name": "Data Science & Analytics",
    "icon": "ti-bar-chart",
    "bg": "#FAEEDA",
    "color": "#633806",
    "emoji": "📉"
  },
  {
    "id": "Legal & Compliance",
    "name": "Legal & Compliance",
    "icon": "ti-ruler-pencil",
    "bg": "#EEEDFE",
    "color": "#534AB7",
    "emoji": "⚖️"
  },
  {
    "id": "Gaming & Entertainment",
    "name": "Gaming & Entertainment",
    "icon": "ti-game",
    "bg": "#E1F5EE",
    "color": "#0F6E56",
    "emoji": "🎮"
  }
,
  {
    "id": "Video & Audio Generation",
    "name": "Video & Audio Generation",
    "icon": "ti-video",
    "bg": "#FAEEDA",
    "color": "#633806",
    "emoji": "🎥"
},
  {
    "id": "Text & Writing",
    "name": "Text & Writing",
    "icon": "ti-pencil",
    "bg": "#EEEDFE",
    "color": "#534AB7",
    "emoji": "📝"
},
  {
    "id": "SEO & Marketing Tools",
    "name": "SEO & Marketing Tools",
    "icon": "ti-speakerphone",
    "bg": "#FBEAF0",
    "color": "#72243E",
    "emoji": "🎯"
},
  {
    "id": "Productivity & Collaboration",
    "name": "Productivity & Collaboration",
    "icon": "ti-briefcase",
    "bg": "#EAF3DE",
    "color": "#3B6D11",
    "emoji": "🚀"
},
  {
    "id": "Personal Assistant",
    "name": "Personal Assistant",
    "icon": "ti-headphone-alt",
    "bg": "#EEEDFE",
    "color": "#534AB7",
    "emoji": "🙋"
}
];

export const CATEGORIES: CategoryStat[] = CATEGORY_META.map(meta => ({
  ...meta,
  count: MOCK_TOOLS.filter(tool => tool.category === meta.id).length
})).filter(cat => cat.count > 0).sort((a, b) => b.count - a.count);

