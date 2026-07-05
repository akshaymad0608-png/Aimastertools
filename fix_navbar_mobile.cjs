const fs = require('fs');
let code = fs.readFileSync('components/Navbar.tsx', 'utf8');

// For the main navbar class, increase mobile safe area compatibility
code = code.replace(
  `className={\`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 \${`,
  `className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${`
);

// We should also check the mobile menu
code = code.replace(
  `<motion.div             initial={{ opacity: 0, y: -20 }}            animate={{ opacity: 1, y: 0 }}            exit={{ opacity: 0, y: -20 }}            className="md:hidden absolute top-full left-0 right-0 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-xl overflow-hidden"`,
  `<motion.div             initial={{ opacity: 0, y: -20 }}            animate={{ opacity: 1, y: 0 }}            exit={{ opacity: 0, y: -20 }}            className="md:hidden absolute top-full left-0 right-0 glass-nav border-b border-[var(--color-border)] shadow-xl overflow-hidden"`
);

// Search overlay
code = code.replace(
  `className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-start justify-center pt-20 px-4"`,
  `className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-start justify-center pt-20 px-4"`
);

fs.writeFileSync('components/Navbar.tsx', code, 'utf8');
console.log("Navbar mobile fixes applied");
