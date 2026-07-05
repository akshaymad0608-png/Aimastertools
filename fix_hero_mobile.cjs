const fs = require('fs');
let code = fs.readFileSync('components/HeroSection.tsx', 'utf8');

code = code.replace(
  `className="w-full h-16 pl-14 pr-32 bg-transparent border-none outline-none text-lg text-[var(--color-text-primary)] font-medium"`,
  `className="w-full h-14 sm:h-16 pl-12 sm:pl-14 pr-16 sm:pr-32 bg-transparent border-none outline-none text-base sm:text-lg text-[var(--color-text-primary)] font-medium"`
);

code = code.replace(
  `placeholder="Search AI tools, categories, or use cases..."`,
  `placeholder="Search AI tools..."`
);

code = code.replace(
  `<Search className="absolute left-5 text-[var(--color-text-muted)]" size={22} />`,
  `<Search className="absolute left-4 sm:left-5 text-[var(--color-text-muted)]" size={20} />`
);

code = code.replace(
  `pt-32 pb-20 md:pt-44 md:pb-28`,
  `pt-24 pb-16 md:pt-44 md:pb-28`
);

fs.writeFileSync('components/HeroSection.tsx', code, 'utf8');
console.log("HeroSection.tsx mobile fixes applied");
