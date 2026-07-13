const fs = require('fs');
const filePath = 'components/HeroSection.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldBg = `      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-[var(--color-primary)] opacity-[0.08] blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-[var(--color-accent)] opacity-[0.05] blur-[100px] mix-blend-screen"></div>
      </div>`;

const newBg = `      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-[var(--color-primary)] opacity-[0.08] blur-[120px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-[var(--color-accent)] opacity-[0.05] blur-[100px] mix-blend-screen animate-pulse delay-700 duration-1000"></div>
        
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>`;

if (content.includes('blur-[120px] mix-blend-screen')) {
  content = content.replace(oldBg, newBg);
  
  // also add some styling to search bar
  const oldSearch = `className="relative flex items-center bg-[var(--color-cardBg)]/90 backdrop-blur-3xl border border-[var(--color-border)] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all focus-within:shadow-[0_8px_40px_rgba(var(--color-primary-rgb),0.12)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30 focus-within:border-[var(--color-primary)]/50"`;
  const newSearch = `className="relative flex items-center bg-[var(--color-cardBg)]/80 backdrop-blur-2xl border border-[var(--color-border)] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all focus-within:shadow-[0_8px_40px_rgba(var(--color-primary-rgb),0.2)] focus-within:ring-4 focus-within:ring-[var(--color-primary)]/20 focus-within:border-[var(--color-primary)] hover:border-[var(--color-primary)]/50"`;
  
  content = content.replace(oldSearch, newSearch);

  // and update "Trusted by" to be "Loved by"
  content = content.replace('Trusted by Professionals At', 'Loved by Professionals At');
  
  fs.writeFileSync(filePath, content);
  console.log('Hero section updated with grid and glassmorphism improvements');
} else {
  console.log('Hero section not matched');
}
