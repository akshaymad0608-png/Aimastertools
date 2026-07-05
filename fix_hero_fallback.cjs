const fs = require('fs');
let code = fs.readFileSync('components/BlogSection.tsx', 'utf8');

const targetStr = `<div className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full bg-[var(--color-surface)]">
                      <div className="w-16 h-16 rounded-xl bg-[var(--color-cardBg)] border border-[var(--color-border)] flex items-center justify-center shadow-sm">
                        <Bot size={32} className="text-[var(--color-primary)]" />
                      </div>
                    </div>`;

const newStr = `<div className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-text-primary) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                      <div className="relative z-10 w-24 h-24 rounded-2xl bg-[var(--color-cardBg)]/80 backdrop-blur-md border border-[var(--color-border)] flex flex-col items-center justify-center shadow-xl mb-4 group-hover:scale-110 transition-transform duration-500">
                        <Bot size={40} className="text-[var(--color-primary)] mb-2" />
                        <div className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">AI INSIGHT</div>
                      </div>
                    </div>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, newStr);
  fs.writeFileSync('components/BlogSection.tsx', code, 'utf8');
  console.log("Fixed BlogSection fallback");
} else {
  console.log("Could not find fallback target");
}
