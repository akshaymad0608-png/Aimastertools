const fs = require('fs');
const filePath = 'data/categories.ts';
let content = fs.readFileSync(filePath, 'utf8');

const newCategories = [
  {
    "id": "Social Media Automation",
    "name": "Social Media Automation",
    "icon": "ti-share",
    "bg": "#FCE4EC",
    "color": "#D81B60",
    "emoji": "🔥"
  },
  {
    "id": "Workflow Automation",
    "name": "Workflow Automation",
    "icon": "ti-settings",
    "bg": "#E3F2FD",
    "color": "#1976D2",
    "emoji": "⚙️"
  },
  {
    "id": "Email Automation",
    "name": "Email Automation",
    "icon": "ti-email",
    "bg": "#E8F5E9",
    "color": "#388E3C",
    "emoji": "📧"
  },
  {
    "id": "WhatsApp Automation",
    "name": "WhatsApp Automation",
    "icon": "ti-brand-whatsapp",
    "bg": "#E8F5E9",
    "color": "#388E3C",
    "emoji": "💬"
  },
  {
    "id": "Lead Generation Automation",
    "name": "Lead Generation Automation",
    "icon": "ti-target",
    "bg": "#FFF3E0",
    "color": "#F57C00",
    "emoji": "🎯"
  },
  {
    "id": "CRM Automation",
    "name": "CRM Automation",
    "icon": "ti-users",
    "bg": "#EDE7F6",
    "color": "#512DA8",
    "emoji": "👥"
  },
  {
    "id": "Productivity Automation",
    "name": "Productivity Automation",
    "icon": "ti-calendar",
    "bg": "#F3E5F5",
    "color": "#7B1FA2",
    "emoji": "📅"
  }
];

if (!content.includes('"Social Media Automation"')) {
  const replacement = 'export const CATEGORY_META = [\n' + newCategories.map(c => JSON.stringify(c, null, 4)).join(',\n') + ',';
  content = content.replace('export const CATEGORY_META = [', replacement);
  fs.writeFileSync(filePath, content);
  console.log('Added new categories');
} else {
  console.log('Categories already added');
}
