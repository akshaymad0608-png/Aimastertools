const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const importTarget = "import ScrollToTop from './components/ScrollToTop';";
const importReplacement = "import ScrollToTop from './components/ScrollToTop';\nimport { TopBanner } from './components/TopBanner';";
content = content.replace(importTarget, importReplacement);

const renderTarget = '<div className="min-h-screen font-sans text-[var(--color-text-primary)] selection:bg-[var(--color-primary)] selection:text-white flex flex-col bg-[var(--color-background)]">\n              <Navbar />';
const renderReplacement = '<div className="min-h-screen font-sans text-[var(--color-text-primary)] selection:bg-[var(--color-primary)] selection:text-white flex flex-col bg-[var(--color-background)]">\n              <TopBanner />\n              <Navbar />';
content = content.replace(renderTarget, renderReplacement);

fs.writeFileSync('App.tsx', content);
