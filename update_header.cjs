const fs = require('fs');

// 1. Update Logo.tsx
let logoContent = fs.readFileSync('components/Logo.tsx', 'utf8');
logoContent = logoContent.replace('isSmall ? "text-[18px]" : "text-[24px]"', 'isSmall ? "text-[22px]" : "text-[28px]"');
logoContent = logoContent.replace("isSmall ? 'w-8 h-8' : 'w-10 h-10'", "isSmall ? 'w-10 h-10' : 'w-12 h-12'");
logoContent = logoContent.replace('size={isSmall ? 28 : 36}', 'size={isSmall ? 32 : 40}');
logoContent = logoContent.replace('size={isSmall ? 14 : 18}', 'size={isSmall ? 16 : 20}');
fs.writeFileSync('components/Logo.tsx', logoContent);
console.log('Logo.tsx updated');

// 2. Update Navbar.tsx
let navContent = fs.readFileSync('components/Navbar.tsx', 'utf8');

const oldHeaderStart = `<header className={\`fixed top-0 left-0 w-full z-50 transition-all duration-300 \${
      scrolled 
         ? 'bg-[var(--color-background)]/75 backdrop-blur-xl border-b border-[var(--color-border)] shadow-sm' 
         : 'bg-transparent'
    }\`}>
      <nav className={\`transition-all duration-300 \${scrolled ? 'py-3' : 'py-5'}\`}>
        <div className="container-custom max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6">`;

const newHeaderStart = `<header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 pt-3 sm:pt-5 px-3 sm:px-6 pointer-events-none">
      <div className={\`pointer-events-auto mx-auto max-w-7xl transition-all duration-400 rounded-2xl border \${
        scrolled 
          ? 'bg-[var(--color-cardBg)]/85 backdrop-blur-2xl border-[var(--color-border)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 sm:py-3' 
          : 'bg-[var(--color-surface)]/40 backdrop-blur-md border-[var(--color-border)]/40 py-3 sm:py-4'
      }\`}>
        <nav className="flex flex-col relative">
          <div className="flex justify-between items-center px-4 sm:px-6 w-full">`;

if(navContent.includes('bg-[var(--color-background)]/75 backdrop-blur-xl')) {
  navContent = navContent.replace(oldHeaderStart, newHeaderStart);
} else {
  console.log('Header start not matched perfectly, skipping header start patch');
}

const oldMobileMenu = `<motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden absolute top-full left-0 w-full bg-[var(--color-background)]/95 border-b border-[var(--color-border)] shadow-xl overflow-hidden backdrop-blur-xl"
            >
              <div className="p-4 flex flex-col gap-2.5">`;

const newMobileMenu = `<motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-[calc(100%+1rem)] left-0 right-0 bg-[var(--color-cardBg)]/95 border border-[var(--color-border)] shadow-2xl rounded-2xl overflow-hidden backdrop-blur-2xl origin-top"
            >
              <div className="p-3 flex flex-col gap-1.5">`;

if(navContent.includes('className="md:hidden absolute top-full left-0 w-full')) {
  navContent = navContent.replace(oldMobileMenu, newMobileMenu);
} else {
  console.log('Mobile menu not matched perfectly');
}

// Change Logo size in Navbar
navContent = navContent.replace('<Logo size="sm" />', '<Logo size="md" />');

// Close the new wrapper
if (navContent.includes('</nav>\n    </header>')) {
  navContent = navContent.replace('</nav>\n    </header>', '</nav>\n      </div>\n    </header>');
}

fs.writeFileSync('components/Navbar.tsx', navContent);
console.log('Navbar.tsx updated');
