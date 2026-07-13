const fs = require('fs');
const filePath = 'components/ToolCard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldMotionHover = `whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}`;
const newMotionHover = `whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(var(--color-primary-rgb), 0.1), 0 8px 10px -6px rgba(var(--color-primary-rgb), 0.1)" }}`;

content = content.replace(oldMotionHover, newMotionHover);

const oldContainerClass = `className={\`group relative flex bg-[var(--color-cardBg)] rounded-[20px] border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)]/40 transition-colors gap-5 overflow-hidden shadow-sm \${`;
const newContainerClass = `className={\`group relative flex bg-[var(--color-cardBg)] rounded-[20px] border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)] transition-all duration-300 gap-5 overflow-hidden shadow-sm \${`;

content = content.replace(oldContainerClass, newContainerClass);

fs.writeFileSync(filePath, content);
console.log('Patched ToolCard hover effects');
