const fs = require('fs');
const filePath = 'pages/Home.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldSkeleton = `<div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 shadow-sm group-hover:-translate-y-2 transition-transform duration-500">
                   <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><Sparkles size={14}/></div>
                     <div className="h-4 w-32 bg-[var(--color-border)] rounded-full"></div>
                   </div>
                   <div className="h-3 w-full bg-[var(--color-border)]/50 rounded-full mb-2"></div>
                   <div className="h-3 w-4/5 bg-[var(--color-border)]/50 rounded-full"></div>
                </div>`;

const newContent = `<div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 shadow-sm group-hover:-translate-y-2 transition-transform duration-500 text-left">
                   <div className="flex items-center gap-3 mb-2">
                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><Sparkles size={14}/></div>
                     <div className="font-bold text-sm text-[var(--color-text-primary)]">ChatGPT Plus</div>
                   </div>
                   <div className="text-xs text-[var(--color-text-secondary)] mb-3 leading-relaxed">The most advanced AI model for conversation, coding, and creative tasks.</div>
                   <div className="flex gap-2">
                     <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">Paid</span>
                     <span className="text-[10px] font-bold bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full">LLM</span>
                   </div>
                </div>`;

if (content.includes('bg-[var(--color-border)]/50 rounded-full')) {
  content = content.replace(oldSkeleton, newContent);
  fs.writeFileSync(filePath, content);
  console.log('Patched bento skeleton');
} else {
  console.log('Skeleton not found');
}
