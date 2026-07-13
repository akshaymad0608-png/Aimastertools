import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Check, Loader2, Sparkles, Star, ArrowRight, TrendingUp, Clock, Award, GitCompare, Mail, Compass, Code
} from 'lucide-react';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import { CATEGORIES } from '../data/categories';
import { MOCK_TOOLS } from '../data/tools';
import { CategoryCard } from '../components/CategoryCard';
import { Category } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import { doc, setDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const VoiceSearch = React.lazy(() => import('../components/VoiceSearch'));
import { CollectionsSection } from '../components/home/CollectionsSection';
import { BlogSection } from '../components/BlogSection';
import HeroSection from '../components/HeroSection';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedDashboard } from '../components/home/FeaturedDashboard';
import { ExploreDirectory } from '../components/home/ExploreDirectory';
import { FAQSection } from '../components/home/FAQSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { TrendingToolsSection } from '../components/TrendingToolsSection';

const Home: React.FC = () => {
  const location = useLocation();
  const { bookmarks } = useBookmarks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'Featured' | 'Newest' | 'Trending'>('Featured');
  const [visibleCount, setVisibleCount] = useState(8);
  const [showChatTooltip, setShowChatTooltip] = useState(true);

  const navigate = useNavigate();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedCategory('All');
  };

  const handleChipClick = (val: string) => {
    setSearchTerm(val);
    setSelectedCategory('All');
    document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleVoiceTranscript = (transcript: string) => {
    setSearchTerm(transcript);
    setSelectedCategory('All');
    setTimeout(() => {
      const toolsSection = document.getElementById('search-results');
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowChatTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        mobileSearchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const tabParam = params.get('tab');
    const pricingParam = params.get('pricing');

    let shouldScroll = false;

    if (categoryParam) {
      const matchedCategory = CATEGORIES.find(c => c.id.toLowerCase() === categoryParam.toLowerCase());
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.id as Category);
        shouldScroll = true;
      }
    }
    
    if (tabParam && ['Featured', 'Newest', 'Trending'].includes(tabParam)) {
      setActiveTab(tabParam as any);
      shouldScroll = true;
    }

    if (pricingParam) {
      setSelectedPricing(pricingParam);
      shouldScroll = true;
    }

    const searchParam = params.get('search');
    if (searchParam === 'true') {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else if (shouldScroll) {
      setTimeout(() => {
        const toolsSection = document.getElementById('search-results');
        if (toolsSection) {
          toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.search]);

  const handleCategoryClick = (categoryId: Category) => {
    setSelectedCategory(categoryId);
    setVisibleCount(8);
    const toolsSection = document.getElementById('search-results');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Curated lists of actual tools matching real specifications
  const trendingToolsCurated = useMemo(() => {
    return MOCK_TOOLS.filter(t => t.rating >= 4.7).slice(0, 5);
  }, []);

  const recentlyAddedToolsCurated = useMemo(() => {
    return [...MOCK_TOOLS]
      .sort((a, b) => new Date(b.dateAdded || '2026-01-01').getTime() - new Date(a.dateAdded || '2026-01-01').getTime())
      .slice(0, 4);
  }, []);

  const topFreeToolsCurated = useMemo(() => {
    return MOCK_TOOLS
      .filter(t => t.pricing === 'Free' || t.pricing === 'Open Source')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, []);

  const filteredTools = useMemo(() => {
    const terms = searchTerm.toLowerCase().split(' ').filter(String);
    return MOCK_TOOLS.filter(tool => {
      const toolText = `${tool.name} ${tool.description} ${tool.category} ${(tool.tags || []).join(' ')} ${tool.pricing} ${(tool.useCases || []).join(' ')}`.toLowerCase();
      const matchesSearch = terms.length === 0 || terms.every(term => toolText.includes(term));
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesPricing = selectedPricing === 'All' || tool.pricing === selectedPricing;
      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [searchTerm, selectedCategory, selectedPricing]);

  const processedTools = useMemo(() => {
    let tools = [...filteredTools];
    if (searchTerm) {
      if (activeTab === 'Newest') {
        tools = tools.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      } else if (activeTab === 'Trending') {
        tools = tools.sort((a, b) => b.rating - a.rating);
      } else {
        tools = tools.sort((a, b) => b.rating - a.rating);
      }
    } else {
      if (activeTab === 'Featured') {
        if (selectedCategory !== 'All') {
          tools = tools.sort((a, b) => {
            if (a.featured === b.featured) {
              return b.rating - a.rating;
            }
            return a.featured ? -1 : 1; 
          });
        } else {
          tools = tools.filter(t => t.featured).sort((a, b) => b.rating - a.rating);
        }
      } else if (activeTab === 'Trending') {
        tools = tools.sort((a, b) => b.rating - a.rating);
      } else {
        tools = tools.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      }
    }
    return tools;
  }, [filteredTools, activeTab, searchTerm, selectedCategory]);

  const displayedTools = useMemo(() => {
    return processedTools.slice(0, visibleCount);
  }, [processedTools, visibleCount]);

      
  const [toastMessage, setToastMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };
  const seoTitle = selectedCategory === 'All' 
    ? "AI Master Tools — #1 Directory to Discover & Compare 500+ AI Tools (2026)" 
    : `Best ${selectedCategory} AI Tools (2026) | AI Master Tools`;

  const seoDesc = selectedCategory === 'All'
    ? "Browse 500+ AI tools across 50+ categories. Find the perfect free and premium AI software for writing, coding, productivity, design, and more."
    : `Discover and compare the best ${selectedCategory} AI tools. Read reviews, check pricing, and find the perfect AI software for your workflow.`;

  // True if user is actively searching or has a category filter active
  const isCurationActive = !searchTerm && selectedCategory === 'All';

  return (
    <>
      {/* Dynamic styling for floating graphics */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatingGlow {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-15px) scale(1.05); opacity: 0.25; }
        }
        .glowing-orb-bg {
          animation: floatingGlow 6s ease-in-out infinite;
        }
      `}} />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-full shadow-2xl font-bold text-sm animate-fade-in-up flex items-center border ${
          toastMessage.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/90 dark:text-emerald-300 dark:border-emerald-800' : 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/90 dark:text-red-300 dark:border-red-800'
        }`}>
          {toastMessage.type === 'success' && <Check size={16} className="mr-2" strokeWidth={3} />}
          {toastMessage.text}
        </div>
      )}

      <SEO 
        title={seoTitle} 
        description={seoDesc} 
        keywords={['ai tools', 'free ai tools', 'best ai tools', 'ai tools directory', 'free ai tools list', 'chatgpt alternatives', 'ai image generators', 'ai writing tools', 'best ai tools for students', 'best ai tool for coding', 'free ai tools for video creation', 'best ai tool for ppt', 'ai detection tool free', 'free ai paraphrasing tool', 'top ai software', 'ai tools for business', 'machine learning tools', 'generative ai tools', 'AI Master Tools', 'Akshay Mahajan']}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AI Master Tools",
            "url": "https://aimastertools.space",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://aimastertools.space/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Top AI Tools Directory for Prompt Engineering",
            "description": "A curated list of the best AI tools and prompt engineering resources by Akshay Mahajan.",
            "url": "https://aimastertools.space",
            "hasPart": MOCK_TOOLS.slice(0, 10).map(tool => ({
              "@type": "SoftwareApplication",
              "name": tool.name,
              "description": tool.description,
              "applicationCategory": tool.category,
              "operatingSystem": "All",
              "url": `https://aimastertools.space/tool/${tool.id}`
            }))
          })}
        </script>
      </SEO>

      <HeroSection 
        searchTerm={searchTerm} 
        handleSearchChange={handleSearchChange} 
        searchInputRef={searchInputRef} 
        onChipClick={handleChipClick}
      />

      <TrendingToolsSection />
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
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 shadow-sm group-hover:-translate-y-2 transition-transform duration-500 text-left">
                   <div className="flex items-center gap-3 mb-2">
                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><Sparkles size={14}/></div>
                     <div className="font-bold text-sm text-[var(--color-text-primary)]">ChatGPT Plus</div>
                   </div>
                   <div className="text-xs text-[var(--color-text-secondary)] mb-3 leading-relaxed">The most advanced AI model for conversation, coding, and creative tasks.</div>
                   <div className="flex gap-2">
                     <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">Paid</span>
                     <span className="text-[10px] font-bold bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full">LLM</span>
                   </div>
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

      
      {/* Category Selection Sidebar Slider & Content */}
      <section id="search-results" className="py-12 md:py-16 relative bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Horizontal Category Cards */}
          <CategorySection 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            setSearchTerm={setSearchTerm} 
            onCategoryClick={handleCategoryClick} 
          />

          {/* CURATED DEFAULT DASHBOARD (Shows when NOT searching/filtering) */}
          {isCurationActive && (
            <FeaturedDashboard 
              trendingToolsCurated={trendingToolsCurated}
              recentlyAddedToolsCurated={recentlyAddedToolsCurated}
              topFreeToolsCurated={topFreeToolsCurated}
            />
          )}

                    <ExploreDirectory 
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


        </div>
      </section>

      {/* Floating Chat Tool Shortcut Widget */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 items-center justify-end gap-3" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        {showChatTooltip && (
          <div className="bg-[var(--color-background)] rounded-2xl p-4 shadow-xl border border-[var(--color-border)] relative min-w-[200px] max-w-[240px]">
            <p className="text-[14px] text-[var(--color-text-primary)] font-medium leading-snug pr-2">
              Hi! What do you want to optimize with AI today?
            </p>
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-4 bg-[var(--color-background)] border-t border-r border-[var(--color-border)] transform rotate-45"></div>
          </div>
        )}
        <button 
          onClick={() => navigate('/find')}
          className="w-14 h-14 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-all duration-300 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(83,74,183,0.4)] text-white group cursor-pointer"
          title="Find AI Tools"
        >
          <Sparkles size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Prompt Engineering Teaser */}
      <section className="py-12 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-bold text-xs uppercase tracking-wider mb-4">
                <Sparkles size={14} /> For Prompt Engineers
              </div>
              <h2 className="text-3xl font-extrabold mb-4 text-[var(--color-text-primary)]">Master the Art of Prompting</h2>
              <p className="text-[var(--color-text-secondary)] text-lg mb-6 leading-relaxed">
                Unlock the true potential of LLMs. Explore our dedicated library of advanced prompt frameworks, including Chain-of-Thought, Zero-Shot, and persona injection templates.
              </p>
              <Link to="/prompts" className="btn-primary inline-flex items-center gap-2">
                Explore Prompt Library <ArrowRight size={18} />
              </Link>
            </div>
            <div className="w-full md:w-1/3 relative">
               <div className="bg-[var(--color-cardBg)] border border-[var(--color-border)] p-6 rounded-2xl relative z-10 shadow-sm font-mono text-sm">
                 <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-border)] pb-2">
                   <div className="w-3 h-3 rounded-full bg-[var(--color-text-muted)] opacity-50"></div>
                   <div className="w-3 h-3 rounded-full bg-[var(--color-text-muted)] opacity-50"></div>
                   <div className="w-3 h-3 rounded-full bg-[var(--color-text-muted)] opacity-50"></div>
                   <span className="ml-2 text-[var(--color-text-muted)] font-bold text-xs">megaprompt.txt</span>
                 </div>
                 <p className="text-[var(--color-primary)] mb-2">{'// Persona Definition'}</p>
                 <p className="text-[var(--color-text-primary)] mb-4">Act as an expert Systems Architect...</p>
                 <p className="text-[var(--color-text-secondary)] mb-2">{'// Constraints'}</p>
                 <p className="text-[var(--color-text-primary)]">1. Use TypeScript<br/>2. Zero-shot reasoning</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Blog Posts */}
      <CollectionsSection />
      <BlogSection />

      <FAQSection />
      <NewsletterSection showToast={showToast} />
    </>
  );
};

export default Home;
