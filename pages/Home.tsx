import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Check, Loader2, Sparkles, Star, ArrowRight, TrendingUp, Clock, Award, GitCompare, Mail, Compass, Code
} from 'lucide-react';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import { websiteSchema, organizationSchema, itemListSchema, faqSchema } from '../utils/seo';
import { TOOL_COUNT, CATEGORY_COUNT, FREE_TOOL_COUNT } from '../utils/stats';
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
import { FAQSection, HOME_FAQS } from '../components/home/FAQSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { TrendingToolsSection } from '../components/TrendingToolsSection';
import { FeaturedCarousel } from '../components/home/FeaturedCarousel';
import { BrowseHub } from '../components/home/BrowseHub';
import { ToolOfTheDay } from '../components/home/ToolOfTheDay';
import { RecentlyViewed } from '../components/home/RecentlyViewed';

const Home: React.FC = () => {
  const location = useLocation();
  const { bookmarks } = useBookmarks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'Featured' | 'Newest' | 'Trending'>('Featured');
  const [visibleCount, setVisibleCount] = useState(8);

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
          tools = tools.filter(t => t?.featured).sort((a, b) => b.rating - a.rating);
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
    ? `AI Master Tools — Compare ${TOOL_COUNT}+ AI Tools by Price & Rating (2026)`
    : `Best ${selectedCategory} AI Tools (2026) — Compared & Ranked`;

  const seoDesc = selectedCategory === 'All'
    ? `AI Master Tools is the master list of ${TOOL_COUNT}+ AI tools across ${CATEGORY_COUNT} categories, including ${FREE_TOOL_COUNT} free options. Search, compare and find the best one in under a minute.`
    : `Compare the best ${selectedCategory} AI tools side by side. Real pricing, ratings, alternatives and what each one is actually good at.`;

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
        <div className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-full shadow-[var(--shadow-lift)] font-bold text-sm animate-fade-in-up flex items-center border ${
          toastMessage.type === 'success' ? 'bg-emerald-50 text-[var(--color-primary)] border-emerald-200 dark:bg-emerald-950/90 dark:text-[var(--color-primary)] dark:border-emerald-800' : 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/90 dark:text-red-300 dark:border-red-800'
        }`}>
          {toastMessage.type === 'success' && <Check size={16} className="mr-2" strokeWidth={3} />}
          {toastMessage.text}
        </div>
      )}

      <SEO
        title={seoTitle}
        description={seoDesc}
        url="/"
        keywords={[
          'AI tools directory',
          'best AI tools 2026',
          `${TOOL_COUNT} AI tools`,
          'free AI tools',
          'compare AI tools',
          'AI tool finder',
          'ChatGPT alternatives',
          'AI writing tools',
          'AI image generators',
          'AI video generators',
          'AI coding tools',
          'AI tools for students',
          'AI tools for business',
          ...MOCK_TOOLS.slice(0, 8).map((t) => t.name),
        ]}
        schema={[
          websiteSchema(),
          organizationSchema(),
          itemListSchema(MOCK_TOOLS.slice(0, 20), 'Top AI tools on AI Master Tools'),
          faqSchema(HOME_FAQS.map((f) => ({ question: f.question, answer: f.answer }))),
        ]}
      />

      <HeroSection 
        searchTerm={searchTerm} 
        handleSearchChange={handleSearchChange} 
        searchInputRef={searchInputRef} 
        onChipClick={handleChipClick}
      />

      <FeaturedCarousel />
      <BrowseHub />

      <ToolOfTheDay />

      {/* Best-of guides — curated category landing pages (also standalone SEO pages) */}
      <section className="section section-alt" aria-labelledby="guides-heading">
        <div className="container-custom">
          <p className="eyebrow">Curated guides</p>
          <h2 id="guides-heading" className="display-lg mt-4 text-[var(--color-text-primary)]">
            The <span className="text-gradient">best AI tools</span>, hand-picked by category
          </h2>
          <p className="section-head__lede">
            Short, comparison-first shortlists — the top picks in each category with pricing,
            pros and cons, so you can choose in a minute instead of an afternoon.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[
              { href: '/best-google-ai-tools.html', label: 'Google AI Tools', emoji: '🔵' },
              { href: '/best-ai-chatbots.html', label: 'AI Chatbots', emoji: '💬' },
              { href: '/best-ai-image-generators.html', label: 'AI Image Generators', emoji: '🖼️' },
              { href: '/best-ai-writing-tools.html', label: 'AI Writing Tools', emoji: '✍️' },
              { href: '/best-ai-coding-tools.html', label: 'AI Coding Tools', emoji: '👨‍💻' },
              { href: '/best-ai-video-generators.html', label: 'AI Video Generators', emoji: '🎬' },
              { href: '/best-ai-voice-generators.html', label: 'AI Voice Generators', emoji: '🔊' },
              { href: '/best-ai-logo-makers.html', label: 'AI Logo Makers', emoji: '🎨' },
              { href: '/best-free-ai-tools.html', label: 'Best Free AI Tools', emoji: '🆓' },
            ].map((g) => (
              <a
                key={g.href}
                href={g.href}
                className="ring-gradient group flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-4 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5 sm:p-5"
              >
                <span className="text-2xl" aria-hidden="true">{g.emoji}</span>
                <span className="title-sm text-[15px] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
                  {g.label}
                </span>
                <span className="label-mono mt-auto flex items-center gap-1 text-[var(--color-primary)]">
                  View picks <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category Selection Sidebar Slider & Content */}
      <section id="search-results" className="section section-alt">
        <div className="container-custom">
          
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

      {/* Persistent shortcut to the guided finder */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => navigate('/find')}
          aria-label="Find a tool by answering three questions"
          className="btn-primary h-12 rounded-full px-5 shadow-[var(--shadow-lift)]"
        >
          <Sparkles size={17} /> Find a tool
        </button>
      </div>

      {/* Prompt library teaser */}
      <section className="section section-rule" aria-labelledby="prompts-heading">
        <div className="container-custom">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">Prompt library</p>
              <h2 id="prompts-heading" className="display-lg mt-4 text-[var(--color-text-primary)]">
                The tool is half of it. The prompt is the other half.
              </h2>
              <p className="section-head__lede">
                Reusable frameworks — persona setup, chain-of-thought, few-shot scaffolds —
                written out in full so you can paste and edit rather than start from a blank box.
              </p>
              <Link to="/prompts" className="btn-primary mt-7 h-11 px-5">
                Open the prompt library <ArrowRight size={16} />
              </Link>
            </div>

            <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
                <span className="label-mono ml-2">system-prompt.txt</span>
              </div>
              <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
<span className="text-[var(--color-text-muted)]"># Role</span>{'\n'}
<span className="text-[var(--color-text-primary)]">You are a systems architect reviewing a</span>{'\n'}
<span className="text-[var(--color-text-primary)]">migration plan for correctness, not style.</span>{'\n\n'}
<span className="text-[var(--color-text-muted)]"># Constraints</span>{'\n'}
<span className="text-[var(--color-text-primary)]">1. Name every assumption you make.</span>{'\n'}
<span className="text-[var(--color-text-primary)]">2. Flag anything you cannot verify.</span>{'\n'}
<span className="text-[var(--color-text-primary)]">3. Reason step by step before concluding.</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <RecentlyViewed />

      {/* Curated Blog Posts */}
      <CollectionsSection />
      <BlogSection />

      <FAQSection />
      <NewsletterSection showToast={showToast} />
    </>
  );
};

export default Home;
