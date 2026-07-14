const fs = require('fs');
let content = fs.readFileSync('components/Navbar.tsx', 'utf8');

// Replace the erroneous closing div
content = content.replace('</nav>\n      </div>\n    </header>', '</nav>\n    </header>');

const oldHeaderStartRegex = /<header className=\{\`fixed top-0 left-0 w-full z-50 transition-all duration-300 \$\{\s*scrolled\s*\?\s*'bg-\[var\(--color-background\)\]\/75 backdrop-blur-xl border-b border-\[var\(--color-border\)\] shadow-sm'\s*:\s*'bg-transparent'\s*\}\`\}>\s*<nav className=\{\`transition-all duration-300 \$\{\s*scrolled \? 'py-3' : 'py-5'\s*\}\`\}>\s*<div className="container-custom max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6">/s;

const newHeaderStart = `<header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 pt-3 sm:pt-5 px-3 sm:px-6 pointer-events-none">
      <div className={\`pointer-events-auto mx-auto max-w-7xl transition-all duration-400 rounded-2xl border \${
        scrolled 
          ? 'bg-[var(--color-cardBg)]/85 backdrop-blur-2xl border-[var(--color-border)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 sm:py-3' 
          : 'bg-[var(--color-surface)]/40 backdrop-blur-md border-[var(--color-border)]/40 py-3 sm:py-4'
      }\`}>
        <nav className="flex flex-col relative">
          <div className="flex justify-between items-center px-4 sm:px-6 w-full">`;

if (oldHeaderStartRegex.test(content)) {
  content = content.replace(oldHeaderStartRegex, newHeaderStart);
  // Add the closing div back only if we replaced the opening header!
  content = content.replace('</nav>\n    </header>', '</nav>\n      </div>\n    </header>');
  console.log("Header start fixed and updated successfully.");
} else {
  console.log("Could not match the old header start via Regex.");
}

fs.writeFileSync('components/Navbar.tsx', content);
