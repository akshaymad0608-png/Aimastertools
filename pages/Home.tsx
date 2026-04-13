import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, ArrowRight, BrainCircuit, Sparkles, Check, Loader2, Play
} from 'lucide-react';
import { motion } from 'framer-motion';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import { CATEGORIES, MOCK_TOOLS, BLOG_POSTS } from '../constants';
import { Category } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import VoiceSearch from '../components/VoiceSearch';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

const Home: React.FC = () => {
  const location = useLocation();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'Featured' | 'Newest' | 'Trending'>('Featured');
  const [visibleCount, setVisibleCount] = useState(6);

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleVoiceTranscript = (transcript: string) => {
    setSearchTerm(transcript);
    // Scroll to tools section
    setTimeout(() => {
      const toolsSection = document.getElementById('tools');
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
    if (categoryParam) {
      // Check if category exists in our list to avoid invalid states
      const categoryExists = CATEGORIES.some(c => c.id === categoryParam);
      if (categoryExists) {
        setSelectedCategory(categoryParam as Category);
        // Scroll to tools section
        setTimeout(() => {
          const toolsSection = document.getElementById('tools');
          if (toolsSection) {
            toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [location.search]);

  const handleCategoryClick = (categoryId: Category) => {
    setSelectedCategory(categoryId);
    setVisibleCount(6);
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const displayedCategories = useMemo(() => {
    let cats = CATEGORIES;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      // Find tools that match the search term
      const matchingTools = MOCK_TOOLS.filter(tool => 
        tool.name.toLowerCase().includes(term) || 
        tool.description.toLowerCase().includes(term) ||
        tool.category.toLowerCase().includes(term) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(term)))
      );
      
      // Get unique categories from matching tools
      const matchingCategoryIds = new Set(matchingTools.map(t => t.category));
      
      cats = cats.filter(cat => 
        cat.name.toLowerCase().includes(term) || 
        cat.id.toLowerCase().includes(term) ||
        matchingCategoryIds.has(cat.id)
      );
    }
    return showAllCategories || searchTerm ? cats : cats.slice(0, 6);
  }, [showAllCategories, searchTerm]);

  const filteredTools = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return MOCK_TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(term) || 
                            tool.description.toLowerCase().includes(term) ||
                            tool.category.toLowerCase().includes(term) ||
                            (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(term)));
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesPricing = selectedPricing === 'All' || tool.pricing === selectedPricing;
      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [searchTerm, selectedCategory, selectedPricing]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const processedTools = useMemo(() => {
    let tools = [...filteredTools];
    
    // If searching, show all matching results regardless of "Featured" status
    if (searchTerm) {
      if (activeTab === 'Newest') {
        tools = tools.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      } else if (activeTab === 'Trending') {
        tools = tools.sort((a, b) => b.rating - a.rating);
      } else {
        // Default search sort by rating
        tools = tools.sort((a, b) => b.rating - a.rating);
      }
    } else {
      // Standard browsing behavior
      if (activeTab === 'Featured') {
        if (selectedCategory !== 'All') {
          // If a category is selected, show ALL tools in that category, but sort featured first
          tools = tools.sort((a, b) => {
            if (a.featured === b.featured) {
              return b.rating - a.rating; // Secondary sort by rating
            }
            return a.featured ? -1 : 1; // Featured first
          });
        } else {
          // On main page (All categories), show ONLY featured tools to keep it curated
          tools = tools.filter(t => t.featured).sort((a, b) => b.rating - a.rating);
        }
      } else if (activeTab === 'Trending') {
        // Simulate trending by sorting by rating and picking top ones
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

  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('submitting');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const subscriberData: any = {
        uid: user.uid,
        email: user.email,
        subscribedAt: serverTimestamp()
      };
      
      if (user.displayName) {
        subscriberData.displayName = user.displayName;
      }
      
      await setDoc(doc(db, 'subscribers', user.uid), subscriberData);
      
      setNewsletterStatus('success');
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    } catch (error: any) {
      console.error("Error subscribing:", error);
      
      const errorCode = error.code || '';
      const errMsg = error.message || '';
      
      if (errorCode === 'auth/cancelled-popup-request' || errMsg.includes('auth/cancelled-popup-request')) {
        setErrorMessage('A login popup is already open. Please complete or close it before trying again.');
      } else if (errorCode === 'auth/popup-closed-by-user' || errMsg.includes('auth/popup-closed-by-user')) {
        setErrorMessage('Login window was closed. Please try again.');
      } else {
        setErrorMessage(errMsg || 'Failed to subscribe. Please try again.');
      }
      
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    }
  };

  return (
    <>
      <SEO 
        title="AI Master Tools | Discover, Compare & Find the Best AI Tools" 
        description="Find, compare, and review the best AI tools and software. Get personalized AI tool suggestions to boost your productivity and business. Discover top AI solutions."
        keywords={['AI tools directory', 'compare AI tools', 'best AI software', 'AI tool suggestions', 'AI Master Tools', 'Akshay Mahajan', 'Prompt Engineering', 'AI ML Engineering']}
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

      {/* Hero Section */}
      <section id="home" className="relative pt-28 pb-16 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Effects */}
        <motion.div 
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none will-change-transform transform-gpu"
        />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden md:block absolute bottom-0 right-0 w-[800px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[100px] -z-10 pointer-events-none will-change-transform transform-gpu"
        />

        <div className="container-custom text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-primary)]/30 mb-8 shadow-[var(--shadow-neon)]"
          >
            <Sparkles size={16} className="text-[var(--color-secondary)]" />
            <span className="text-sm font-semibold text-[var(--color-text-primary)] tracking-wide uppercase">Discover & Compare AI Solutions</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[var(--color-text-primary)] mb-6 tracking-tighter leading-[1.1] sm:leading-[0.9]"
          >
            Find & Compare <br className="hidden md:block" />
            <span className="text-gradient">The Best AI Tools</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-[var(--color-text-secondary)] max-w-4xl mx-auto mb-12 leading-relaxed font-medium px-4 md:px-0"
          >
            The ultimate directory for AI Master Tools. Discover, compare, and implement the perfect AI solutions to supercharge your productivity and business workflows.
          </motion.p>

            {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto relative mb-16"
          >
            <div className="relative flex items-center group">
              <Search className="absolute left-4 md:left-6 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" size={20} />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder={selectedCategory !== 'All' ? `Search in ${CATEGORIES.find(c => c.id === selectedCategory)?.name}...` : "Search for solutions (e.g., 'Automation', 'Analytics')"} 
                className="w-full h-14 md:h-16 pl-12 md:pl-16 pr-20 md:pr-28 rounded-xl bg-[var(--color-cardBg)] border border-[var(--color-border)] shadow-2xl shadow-[var(--color-primary)]/10 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm md:text-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] transition-all"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
              
              <div className="absolute right-2 md:right-4 flex items-center gap-1 md:gap-2">
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="p-1.5 md:p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    aria-label="Clear search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
                
                <VoiceSearch onTranscript={handleVoiceTranscript} />

                <div className="hidden md:flex items-center gap-2 pointer-events-none ml-2">
                  <kbd className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono">⌘K</kbd>
                </div>
              </div>
            </div>
            
            {/* Active Filters Indicator */}
            {(searchTerm || selectedCategory !== 'All') && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 animate-fade-in">
                <span className="text-sm text-[var(--color-text-muted)]">Filtering by:</span>
                
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm font-medium">
                    {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('All')} className="hover:text-[var(--color-text-primary)] ml-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </span>
                )}

                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] text-sm font-medium">
                    "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="hover:text-[var(--color-text-primary)] ml-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </span>
                )}
                
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Popular Tags */}
            {!searchTerm && selectedCategory === 'All' && (
              <div className="mt-6 flex flex-col items-center gap-6">
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider flex items-center">Trending:</span>
                  {['Analytics', 'Copywriting', 'Development', 'Video', 'Marketing'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-primary)] px-4 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories Section - Tech Grid */}
      <section id="categories" className="py-16 md:py-24 bg-[var(--color-surface)]/30 border-y border-[var(--color-border)] relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-3 md:mb-4">Explore AI Master Tools & Solutions</h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg">Browse our comprehensive directory by category to find the perfect solution for your prompt engineering needs.</p>
            </div>
            <button 
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-[var(--color-primary)] font-semibold hover:text-[var(--color-secondary)] flex items-center gap-2 transition-colors group"
            >
              {showAllCategories ? 'Show Less' : 'View All Categories'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {displayedCategories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {displayedCategories.map((cat, index) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                
                return (
                  <motion.button 
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`p-5 sm:p-6 rounded-[2rem] border transition-all duration-300 flex flex-col items-center text-center gap-4 group relative overflow-hidden
                      ${isSelected 
                        ? 'border-[var(--color-primary)] bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent shadow-[0_8px_30px_rgba(var(--color-primary-rgb),0.15)] ring-1 ring-[var(--color-primary)]/50' 
                        : 'border-[var(--color-border)] bg-[var(--color-surface)]/50 hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]'
                      }`}
                  >
                    {/* Background Glow */}
                    <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl transition-all duration-500 ${isSelected ? 'bg-[var(--color-primary)]/20' : 'bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/10'}`}></div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-1 rounded-full">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                    
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10 
                      ${isSelected 
                        ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/40 scale-110 rotate-3' 
                        : 'bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10 group-hover:border-[var(--color-primary)]/30 group-hover:scale-110 group-hover:-rotate-3'
                      }`}>
                      <Icon size={26} strokeWidth={isSelected ? 2 : 1.5} className="transition-all duration-500" />
                    </div>
                    
                    <div className="relative z-10 w-full mt-2">
                      <h3 className={`font-bold text-sm sm:text-base mb-2 line-clamp-2 transition-colors ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]'}`}>{cat.name}</h3>
                      <div className="flex items-center justify-center gap-2">
                        <span className={`text-xs font-semibold tracking-wider transition-colors px-3 py-1 rounded-full ${isSelected ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:bg-[var(--color-primary)]/5 group-hover:border-[var(--color-primary)]/20 group-hover:text-[var(--color-primary)]/80'}`}>{cat.count} Tools</span>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-surface)] mb-4">
                <Search size={24} className="text-[var(--color-text-muted)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">No categories found</h3>
              <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">We couldn't find any categories matching "{searchTerm}". Try adjusting your search or browse all categories.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedPricing('All');}}
                className="mt-6 px-6 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tools Section - Agency Portfolio Style */}
      <section id="tools" className="py-16 md:py-24 relative">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-12 gap-6 md:gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2 md:mb-3">
                {activeTab === 'Featured' ? 'Featured' : activeTab === 'Trending' ? 'Trending' : 'Latest'} <span className="text-gradient">Innovations</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg">Handpicked AI tools to elevate your business</p>
            </div>
            
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
               <div className="flex items-center gap-2 mr-2">
                 <span className="text-sm font-medium text-[var(--color-text-secondary)]">Pricing:</span>
                 <select 
                   value={selectedPricing}
                   onChange={(e) => setSelectedPricing(e.target.value)}
                   className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] block p-2"
                 >
                   <option value="All">All</option>
                   <option value="Free">Free</option>
                   <option value="Freemium">Freemium</option>
                   <option value="Paid">Paid</option>
                 </select>
               </div>
               <div className="flex bg-[var(--color-cardBg)] p-1.5 rounded-xl border border-[var(--color-border)] shadow-sm min-w-max">
                 <button 
                   onClick={() => setActiveTab('Featured')}
                   className={`px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${activeTab === 'Featured' ? 'bg-[var(--color-primary)] text-white shadow-md transform scale-105' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'}`}
                 >
                   Featured
                 </button>
                 <button 
                   onClick={() => setActiveTab('Trending')}
                   className={`px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${activeTab === 'Trending' ? 'bg-[var(--color-primary)] text-white shadow-md transform scale-105' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'}`}
                 >
                   Trending
                 </button>
                 <button 
                   onClick={() => setActiveTab('Newest')}
                   className={`px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${activeTab === 'Newest' ? 'bg-[var(--color-primary)] text-white shadow-md transform scale-105' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'}`}
                 >
                   Newest
                 </button>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {/* Main Tools Grid */}
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedTools.length > 0 ? (
                  displayedTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <ToolCard 
                        tool={tool} 
                        rank={activeTab === 'Featured' ? index + 1 : undefined}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-32 text-[var(--color-text-secondary)] glass-panel rounded-2xl border border-[var(--color-border)]">
                    <Search size={48} className="mx-auto mb-4 text-[var(--color-text-muted)] opacity-50" />
                    <p className="text-xl font-medium mb-2">No results found.</p>
                    <p className="text-sm text-[var(--color-text-muted)] mb-6">Try adjusting your search criteria.</p>
                    <button onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedPricing('All');}} className="btn-primary">Clear Filters</button>
                  </div>
                )}
              </div>

              {processedTools.length > visibleCount && (
                <div className="mt-16 text-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    className="btn-primary px-8 py-4 text-lg"
                  >
                    Load More Solutions
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Submit Tool Banner */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border-y border-[var(--color-border)]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[var(--color-cardBg)] p-8 rounded-2xl border border-[var(--color-border)] shadow-lg">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Know a great AI tool?</h3>
              <p className="text-[var(--color-text-secondary)]">Help us grow the directory by submitting your favorite AI tools. It's free and takes only a minute.</p>
            </div>
            <Link to="/submit" className="btn-primary whitespace-nowrap px-8 py-4 text-lg shadow-xl shadow-[var(--color-primary)]/20">
              Submit an AI Tool
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Playlist */}
      <section id="youtube" className="py-16 md:py-24 bg-[var(--color-surface)]/30 border-t border-[var(--color-border)]">
        <div className="container-custom">
          <div className="bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-3xl p-6 md:p-12 text-center shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Play size={36} className="text-[#FF0000]" />
              <h2 className="text-3xl font-bold">Learn AI on YouTube</h2>
            </div>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
              Watch our curated playlist of the best AI tutorials, prompt engineering guides, and tool reviews directly here.
            </p>
            
            <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8 border border-[var(--color-border)]">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/videoseries?list=PLa3Uyoo-UhyGcmhIa20x8p9MTm121rY_J" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>

            <a 
              href="https://youtube.com/playlist?list=PLa3Uyoo-UhyGcmhIa20x8p9MTm121rY_J&si=j9ItQeMoUtvkn53Y" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FF0000] text-white font-bold hover:bg-[#CC0000] transition-colors shadow-lg shadow-[#FF0000]/20"
            >
              <Play size={20} className="fill-white" /> Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-24 bg-[var(--color-surface)]/30 border-t border-[var(--color-border)]">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3 md:mb-4">Latest <span className="text-gradient">AI Engineering Insights</span></h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-base md:text-lg px-4 md:px-0">
              Expert analysis, tutorials, and trends in the AI landscape and prompt engineering.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, index) => (
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer glass-panel rounded-xl overflow-hidden border border-[var(--color-border)] card-hover-effect"
              >
                <div className="h-60 overflow-hidden relative">
                   <Link to={post.url} className="block w-full h-full">
                     <img src={post.imageUrl} alt={post.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-cardBg)] to-transparent opacity-80"></div>
                     <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-3 text-xs text-[var(--color-secondary)] font-bold uppercase tracking-wider mb-2">
                          <span>{post.date}</span>
                          <span className="w-1 h-1 bg-[var(--color-secondary)] rounded-full"></span>
                          <span>{post.readTime}</span>
                        </div>
                     </div>
                   </Link>
                </div>
                <div className="p-8 pt-4">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-tight">
                    <Link to={post.url}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-6 leading-relaxed">{post.excerpt}</p>
                  <Link to={post.url} className="text-[var(--color-primary)] text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-wide inline-flex">
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/#blog" className="inline-flex items-center gap-2 text-[var(--color-text-primary)] font-semibold hover:text-[var(--color-primary)] transition-colors">
              View All Articles <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 relative overflow-hidden border-t border-[var(--color-border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-primary)]/5 -z-10"></div>
        <div className="container-custom relative z-10">
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-[var(--color-border)] bg-[var(--color-cardBg)]/80 backdrop-blur-3xl p-6 md:p-24 text-center max-w-6xl mx-auto shadow-[0_0_100px_rgba(59,130,246,0.1)]">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-6 md:mb-8">
                <BrainCircuit size={14} /> AI Master Newsletter
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-[var(--color-text-primary)] mb-4 md:mb-6 tracking-tighter leading-tight">
                Stay Ahead of the <br/>
                <span className="text-gradient">AI Revolution</span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-12 leading-relaxed">
                Join 50,000+ engineers and creators getting weekly insights on the latest AI tools, prompt engineering hacks, and industry trends.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  className="flex-1 h-16 px-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-lg text-[var(--color-text-primary)] transition-all"
                />
                <button 
                  type="submit" 
                  disabled={newsletterStatus === 'submitting'}
                  className="h-16 px-10 rounded-2xl bg-[var(--color-primary)] text-white font-bold text-lg hover:bg-[var(--color-primary-dark)] transition-all shadow-xl shadow-[var(--color-primary)]/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {newsletterStatus === 'submitting' ? <Loader2 className="animate-spin" /> : 'Subscribe Now'}
                </button>
              </form>
              
              {newsletterStatus === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-green-400 font-bold flex items-center justify-center gap-2">
                  <Check size={20} /> Welcome to the future of AI!
                </motion.p>
              )}
              
              {newsletterStatus === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-red-400 font-bold">
                  {errorMessage}
                </motion.p>
              )}
              
              <p className="mt-8 text-sm text-[var(--color-text-muted)]">
                No spam. Only high-signal AI insights. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
