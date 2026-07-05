const fs = require('fs');
let code = fs.readFileSync('components/BlogSection.tsx', 'utf8');

const startIdx = code.indexOf('{/* HERO BANNER */}');
const endIdx = code.indexOf('{/* Substantive Article Metadata and Body */}');

if (startIdx !== -1 && endIdx !== -1) {
  const oldChunk = code.substring(startIdx, endIdx);
  const newChunk = `{/* HERO BANNER */}
                <div className="relative w-full h-[260px] sm:h-[320px] overflow-hidden flex flex-col items-center justify-center px-6 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                  {chatbotPost.imageUrl ? (
                    <img src={chatbotPost.imageUrl} alt={chatbotPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="relative flex flex-col items-center justify-center z-10 mt-6 sm:mt-4">
                      <div className="w-16 h-16 rounded-xl bg-[var(--color-cardBg)] border border-[var(--color-border)] flex items-center justify-center shadow-sm">
                        <Bot size={32} className="text-[var(--color-primary)]" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[var(--color-background)]/90 backdrop-blur-sm rounded-md border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider leading-none z-10 shadow-sm">
                    <span className="text-[var(--color-primary)] animate-pulse text-[8px]">●</span>
                    <span>FEATURED INSIGHT</span>
                  </div>
                </div>
                `;
  
  code = code.substring(0, startIdx) + newChunk + code.substring(endIdx);
  fs.writeFileSync('components/BlogSection.tsx', code, 'utf8');
  console.log("Successfully replaced hero banner in BlogSection.tsx");
} else {
  console.log("Could not find start/end markers");
}
