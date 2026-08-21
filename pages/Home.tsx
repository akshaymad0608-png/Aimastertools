import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Check, Loader2, Sparkles, Star, ArrowRight, TrendingUp, Clock, Award, GitCompare, Mail, Compass, Code, SlidersHorizontal
} from 'lucide-react';
import ToolCard from '../components/ToolCard';
import FilterSheet from '../components/FilterSheet';
import SEO from '../components/SEO';
import { websiteSchema, organizationSchema, itemListSchema, faqSchema } from '../utils/seo';
import { TOOL_COUNT, CATEGORY_COUNT, FREE_TOOL_COUNT } from '../utils/stats';
import { CATEGORIES } from '../data/categories';
import { MOCK_TOOLS } from '../data/tools';
import { CategoryCard } from '../components/CategoryCard';
import Reveal from '../components/Reveal';
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
import { EarnSection } from '../components/home/EarnSection';
import { HeroBand } from '../components/home/HeroBand';
import { TrustNumbers } from '../components/home/TrustNumbers';
import { WhyIndex } from '../components/home/WhyIndex';
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
  const [filtersOpen, setFiltersOpen] = useState(false);

  const navigate = useNavigate();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const heroSearchRef = useRef<HTMLInputElement>(null);
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
        // The hero field is the way in; the directory one refines once you are
        // there. Focusing both, as this did, meant the second call won and the
        // shortcut landed wherever the DOM order happened to put it.
        const target =
          heroSearchRef.current ?? searchInputRef.current ?? mobileSearchInputRef.current;
        target?.focus();
      }
      if (e.key === 'Escape') {
        (document.activeElement as HTMLElement | null)?.blur();
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

      {/*
        Hero, trust, then the reason to keep reading — the opening the Mayeen
        layout uses, which a directory can take almost as-is.

        The band this replaces was py-8 with no search in it. On the site whose
        job is finding a tool, the first screen offered no way to look for one:
        search lived in the header from xl up and again inside the directory
        further down, so a phone opened on a description of a search engine.
      */}
      <HeroBand
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSubmit={() =>
          document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        inputRef={heroSearchRef}
      />

      <TrustNumbers />

      {/* ===== Dashboard: category sidebar + tool grid ===== */}
      <section id="search-results" aria-labelledby="directory-heading" className="container-custom py-8 md:py-10">
        {/*
          The directory is the largest block on the page and had no heading of
          its own, so the outline ran h1 straight to the h3 on each tool card —
          a skipped level, and a section a screen reader could only reach as an
          unnamed region. It is visually hidden because the search field and the
          category rail already say what this is on screen.
        */}
        <h2 id="directory-heading" className="sr-only">
          Browse the directory
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[236px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="label-mono mb-2.5">Categories</p>
            {/*
              The rail scrolls itself from lg up.

              49 categories made this column ~1,900px tall, and since it is one
              half of a two-column grid it set the height of the whole section.
              The tool grid never fills that: measured 726px of empty column at
              the default 8 cards, and 1,145px once a smaller category was
              selected — a screen and a half of nothing beside a list of links.

              It also made the sticky positioning meaningless, because an
              element as tall as its container has nowhere to stick. Capping it
              to the viewport gives the sticky rail something to do and keeps
              all 49 filters rather than truncating the list.
            */}
            <nav className="flex gap-1.5 overflow-x-auto pb-2 lg:max-h-[calc(100dvh-9rem)] lg:flex-col lg:gap-0.5 lg:overflow-y-auto lg:overscroll-contain lg:pb-0 lg:pr-1">
              <button
                onClick={() => { setSelectedCategory('All'); setVisibleCount(8); }}
                className={`flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-[13.5px] font-medium transition-colors ${selectedCategory === 'All' ? 'bg-[var(--color-primary-fill)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'}`}
              >
                All tools
                <span className={`text-[11px] tabular-nums ${selectedCategory === 'All' ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>{TOOL_COUNT}</span>
              </button>
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id as Category)}
                    className={`flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-[13.5px] font-medium transition-colors ${active ? 'bg-[var(--color-primary-fill)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'}`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className={`text-[11px] tabular-nums ${active ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>{cat.count}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main column */}
          <div>
            <div className="relative">
              <Search size={17} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              {/* This field had no id, no label and no aria-label — nothing
                  naming it for anyone who cannot see the placeholder. */}
              <label htmlFor="directory-search" className="sr-only">
                Filter the directory
              </label>
              <input
                id="directory-search"
                ref={searchInputRef}
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search AI tools by name or job…"
                className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] pl-11 pr-4 text-[15px] text-[var(--color-text-primary)] shadow-[var(--shadow-card)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Mobile: filters open in a bottom sheet */}
            <div className="mt-4 flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cardBg)] px-4 py-2 text-[13px] font-semibold text-[var(--color-text-primary)]"
              >
                <SlidersHorizontal size={15} /> Filters
                {(selectedPricing !== 'All' || activeTab !== 'Featured') && (
                  <span className="grid h-4 min-w-[16px] place-items-center rounded-full bg-[var(--color-primary-fill)] px-1 text-[10px] font-bold text-white">
                    {(selectedPricing !== 'All' ? 1 : 0) + (activeTab !== 'Featured' ? 1 : 0)}
                  </span>
                )}
              </button>
              <span className="label-mono ml-auto tabular-nums">{processedTools.length} tools</span>
            </div>

            {/* Desktop / tablet: inline chips */}
            <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
              {['All', 'Free', 'Freemium', 'Paid', 'Usage Based', 'Open Source'].map((p) => (
                <button
                  key={p}
                  onClick={() => { setSelectedPricing(p); setVisibleCount(8); }}
                  className={`rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${selectedPricing === p ? 'border-transparent bg-[var(--color-primary-fill)] text-white' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}
                >
                  {p}
                </button>
              ))}
              <span className="mx-1 hidden h-5 w-px bg-[var(--color-border)] sm:block" aria-hidden="true" />
              {(['Featured', 'Trending', 'Newest'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${activeTab === t ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
                >
                  {t}
                </button>
              ))}
              <span className="label-mono ml-auto tabular-nums">{processedTools.length} tools</span>
            </div>

            <FilterSheet
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
              selectedPricing={selectedPricing}
              setSelectedPricing={(p) => { setSelectedPricing(p); setVisibleCount(8); }}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              resultCount={processedTools.length}
            />

            {displayedTools.length > 0 ? (
              <>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {displayedTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} layout="vertical" />
                  ))}
                </div>
                {processedTools.length > visibleCount && (
                  <div className="mt-8 text-center">
                    <button onClick={() => setVisibleCount((prev) => prev + 12)} className="btn-primary h-11 px-6">
                      Load more tools
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-10 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] p-12 text-center">
                <p className="text-[var(--color-text-secondary)]">No tools match your filters.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedPricing('All'); }}
                  className="mt-4 inline-flex h-10 items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] px-5 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Best-of guides — curated category landing pages (also standalone SEO pages) */}
      <section className="section section-alt" aria-labelledby="guides-heading">
        <div className="container-custom">
          <p className="eyebrow">Curated guides</p>
          <h2 id="guides-heading" className="display-md mt-4 text-[var(--color-text-primary)]">
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
              <h2 id="prompts-heading" className="display-md mt-4 text-[var(--color-text-primary)]">
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

      {/*
        Sections that were built, imported and never rendered.

        ToolOfTheDay, TrendingToolsSection, FeaturedCarousel and BrowseHub were
        all sitting in this file's import list with nothing calling them — the
        bundler tree-shook every one of them out, so they cost nothing and did
        nothing. That is most of why the page read as thin: the directory grid,
        then a long run of prose bands.

        EarnSection is new. /earn and /earn/:slug have existed all along with a
        real dataset behind them, and this page did not contain a single link
        to either.

        Each fades up as it arrives. Reveal keeps the visible state as the
        default and falls back to it on reduced motion, on a browser with no
        IntersectionObserver, and on a 1.2s failsafe — so a section can be late
        but never invisible.
      */}
      <Reveal><WhyIndex /></Reveal>
      <Reveal><ToolOfTheDay /></Reveal>
      <Reveal><TrendingToolsSection /></Reveal>
      <Reveal><FeaturedCarousel /></Reveal>
      <Reveal><EarnSection /></Reveal>
      <Reveal><CollectionsSection /></Reveal>
      <Reveal><BrowseHub /></Reveal>
      <Reveal><BlogSection /></Reveal>
      <Reveal><FAQSection /></Reveal>
      <Reveal><NewsletterSection showToast={showToast} /></Reveal>
    </>
  );
};

export default Home;
