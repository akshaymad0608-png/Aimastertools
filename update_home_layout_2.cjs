const fs = require('fs');
const file = 'pages/Home.tsx';
let data = fs.readFileSync(file, 'utf8');

// 1. Add imports for the new components
data = data.replace(
  "import HeroSection from '../components/HeroSection';",
  "import HeroSection from '../components/HeroSection';\nimport { CategorySection } from '../components/home/CategorySection';\nimport { FeaturedDashboard } from '../components/home/FeaturedDashboard';\nimport { ExploreDirectory } from '../components/home/ExploreDirectory';\nimport { NewsletterSection } from '../components/home/NewsletterSection';"
);

// 2. Remove newsletter specific state from Home.tsx as it is now in NewsletterSection
data = data.replace(/const \[newsletterEmail, setNewsletterEmail\] = useState\(''\);\n/, '');
data = data.replace(/const \[newsletterStatus, setNewsletterStatus\] = useState<'idle' \| 'submitting'>\('idle'\);\n/, '');

const submitNewsletterRegex = /\s*const handleNewsletterSubmit = async \(e: React\.FormEvent\) => \{[\s\S]*?\};\n/;
data = data.replace(submitNewsletterRegex, '');

// 3. Update filteredTools to include useCases in the search
const filteredToolsRegex = /const toolText = `\$\{tool\.name\} \$\{tool\.description\} \$\{tool\.category\} \$\{\(tool\.tags \|\| \[\]\)\.join\(' '\)\} \$\{tool\.pricing\}`\.toLowerCase\(\);/;
data = data.replace(filteredToolsRegex, "const toolText = `${tool.name} ${tool.description} ${tool.category} ${(tool.tags || []).join(' ')} ${tool.pricing} ${(tool.useCases || []).join(' ')}`.toLowerCase();");

// 4. Replace CategoryCards block
const categoryBlockStart = data.indexOf('<div className="mb-12 w-full relative">');
const categoryBlockEnd = data.indexOf('</div>\n          </div>', categoryBlockStart) + '</div>\n          </div>'.length;

const categoryBlockReplacement = `<CategorySection 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            setSearchTerm={setSearchTerm} 
            onCategoryClick={handleCategoryClick} 
          />`;

data = data.substring(0, categoryBlockStart) + categoryBlockReplacement + data.substring(categoryBlockEnd);

// 5. Replace FeaturedDashboard block
const curationStart = data.indexOf('{isCurationActive && (');
const curationEnd = data.indexOf('</div>\n          )}\n\n          {/* DYNAMIC EXPLORER DIR COMPONENT', curationStart) + '</div>\n          )}'.length;

const curationReplacement = `{isCurationActive && (
            <FeaturedDashboard 
              trendingToolsCurated={trendingToolsCurated}
              recentlyAddedToolsCurated={recentlyAddedToolsCurated}
              topFreeToolsCurated={topFreeToolsCurated}
            />
          )}`;

data = data.substring(0, curationStart) + curationReplacement + data.substring(curationEnd);

// 6. Replace ExploreDirectory block
const exploreStart = data.indexOf('{/* DYNAMIC EXPLORER DIR COMPONENT (Always shows when searching, or optionally below curations as complete listing) */}');
const exploreEnd = data.indexOf('</div>\n\n        </div>\n      </section>', exploreStart) + '</div>'.length;

const exploreReplacement = `          <ExploreDirectory 
            isCurationActive={isCurationActive}
            processedToolsLength={processedTools.length}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedPricing={selectedPricing}
            setSelectedPricing={setSelectedPricing}
            displayedTools={displayedTools}
            hasMore={processedTools.length > visibleCount}
            onLoadMore={() => setVisibleCount(prev => prev + 10)}
            onReset={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedPricing('All');}}
          />
`;

data = data.substring(0, exploreStart) + exploreReplacement + data.substring(exploreEnd);

// 7. Replace Newsletter CTA block
const newsletterStart = data.indexOf('{/* Compact Newsletter CTA */}');
const newsletterEnd = data.indexOf('</section>', newsletterStart) + '</section>'.length;

const newsletterReplacement = `<NewsletterSection showToast={showToast} />`;

data = data.substring(0, newsletterStart) + newsletterReplacement + data.substring(newsletterEnd);

fs.writeFileSync(file, data);
console.log('Home.tsx updated with components!');
