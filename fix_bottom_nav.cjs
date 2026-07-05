const fs = require('fs');

const path = 'components/MobileBottomNav.tsx';
let content = fs.readFileSync(path, 'utf8');

// Upgrade styling
content = content.replace(`className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] z-[100] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] pb-safe"`, `className="md:hidden fixed bottom-0 left-0 right-0 glass-nav border-t border-[var(--color-border)] z-[100] shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.15)] pb-safe"`);

// Replace icons to match design
content = content.replace(`{ name: 'Home', path: '/', icon: Home },`, `{ name: 'Home', path: '/', icon: Home },`);
content = content.replace(`{ name: 'Prompts', path: '/prompts', icon: Compass },`, `{ name: 'Prompts', path: '/prompts', icon: Compass },`);

fs.writeFileSync(path, content, 'utf8');

const cssPath = 'index.css';
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('pb-[80px] md:pb-0')) {
    css += `\n\n/* Global body padding for mobile nav */\n@media (max-width: 768px) {\n  #root { padding-bottom: 72px; }\n}\n`;
    fs.writeFileSync(cssPath, css, 'utf8');
}
