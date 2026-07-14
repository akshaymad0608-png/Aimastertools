const fs = require('fs');
let content = fs.readFileSync('components/Navbar.tsx', 'utf8');

const oldHeaderStart = `<header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 pt-3 sm:pt-5 px-3 sm:px-6 pointer-events-none">
      <div className={\`pointer-events-auto mx-auto max-w-7xl transition-all duration-400 rounded-2xl border \${
        scrolled 
          ? 'bg-[var(--color-cardBg)]/85 backdrop-blur-2xl border-[var(--color-border)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 sm:py-3' 
          : 'bg-[var(--color-surface)]/40 backdrop-blur-md border-[var(--color-border)]/40 py-3 sm:py-4'
      }\`}>
        <nav className="flex flex-col relative">
          <div className="flex justify-between items-center px-4 sm:px-6 w-full">`;

const newHeaderStart = `<header className={\`fixed top-0 left-0 w-full z-50 transition-all duration-500 \${
      scrolled 
        ? 'bg-[var(--color-background)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/50 shadow-sm py-3' 
        : 'bg-transparent py-5'
    }\`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex flex-col relative">
          <div className="flex justify-between items-center w-full">`;

if (content.includes(oldHeaderStart)) {
  content = content.replace(oldHeaderStart, newHeaderStart);
} else {
  console.log("Could not find the old header start block.");
}

// Update the mobile menu positioning to match the new header
const oldMobileMenu = `className="md:hidden absolute top-[calc(100%+1rem)] left-0 right-0 bg-[var(--color-cardBg)]/95 border border-[var(--color-border)] shadow-2xl rounded-2xl overflow-hidden backdrop-blur-2xl origin-top"`;
const newMobileMenu = `className="md:hidden absolute top-[calc(100%+1.5rem)] left-0 right-0 bg-[var(--color-cardBg)]/95 border border-[var(--color-border)] shadow-2xl rounded-2xl overflow-hidden backdrop-blur-2xl origin-top"`;

content = content.replace(oldMobileMenu, newMobileMenu);

fs.writeFileSync('components/Navbar.tsx', content);
console.log('Header style updated');
