const fs = require('fs');
const filePath = 'pages/Home.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const bentoGrid = `
      {/* Platform Features Bento Grid */}
      <section className="py-20 md:py-32 bg-[var(--color-background)] relative">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-[var(--color-text-primary)]">Everything you need to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">master AI</span></h2>
            <p className="text-lg text-[var(--color-text-secondary)] font-medium">We've built the most comprehensive ecosystem for finding, evaluating, and mastering artificial intelligence tools.</p>
          </div>
          
          <div className="bento-grid">
            {/* Main Feature */}
            <div className="bento-item bento-item-1 group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6">
                  <Compass size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[var(--color-text-primary)]">Curated Directory</h3>
                <p className="text-[var(--color-text-secondary)] mb-8 flex-1 leading-relaxed">Access our hand-picked database of over 500+ premium AI tools. Every tool is manually vetted, tested, and categorized to ensure you only see the best software available on the market.</p>
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 shadow-sm group-hover:-translate-y-2 transition-transform duration-500">
                   <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><Sparkles size={14}/></div>
                     <div className="h-4 w-32 bg-[var(--color-border)] rounded-full"></div>
                   </div>
                   <div className="h-3 w-full bg-[var(--color-border)]/50 rounded-full mb-2"></div>
                   <div className="h-3 w-4/5 bg-[var(--color-border)]/50 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bento-item bento-item-3 group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col">
                <div className="w-10 h-10 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-4">
                  <Star size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-[var(--color-text-primary)]">Real User Reviews</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">Don't trust marketing copy. Read authentic reviews from verified professionals who actually use the tools daily.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bento-item bento-item-4 group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
                  <GitCompare size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-[var(--color-text-primary)]">Side-by-Side Compare</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">Evaluate pricing, features, and limitations of multiple tools simultaneously with our advanced comparison engine.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bento-item bento-item-2 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                    <Code size={20} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">Prompt Library</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] max-w-sm leading-relaxed">Copy and paste battle-tested prompts to get the absolute best results from ChatGPT, Claude, and Midjourney.</p>
                </div>
                <div className="mt-8 flex gap-2 translate-y-4 group-hover:translate-y-0 opacity-50 group-hover:opacity-100 transition-all duration-500">
                  <span className="px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono">system_prompt</span>
                  <span className="px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono">few_shot</span>
                  <span className="px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono">cot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
`;

if (content.includes('<TrendingToolsSection />')) {
  content = content.replace('<TrendingToolsSection />', '<TrendingToolsSection />' + bentoGrid);
  
  if (!content.includes('Compass')) {
      content = content.replace("import { Search, Sparkles, ArrowRight, Check, X }", "import { Search, Sparkles, ArrowRight, Check, X, Compass, Star, GitCompare, Code }");
  }
  
  fs.writeFileSync(filePath, content);
  console.log('Added Bento Grid to Home');
}
