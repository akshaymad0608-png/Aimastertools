import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, ArrowRight, BrainCircuit, Sparkles, Check 
} from 'lucide-react';
import { motion } from 'framer-motion';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import CountUp from '../components/CountUp';
import { CATEGORIES, MOCK_TOOLS, BLOG_POSTS } from '../constants';
import { Category } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import VoiceSearch from '../components/VoiceSearch';

const Home: React.FC = () => {
  const location = useLocation();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'Featured' | 'Newest'>('Featured');
  const [visibleCount, setVisibleCount] = useState(12);

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
    setVisibleCount(12);
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const displayedCategories = useMemo(() => {
    return showAllCategories ? CATEGORIES : CATEGORIES.slice(0, 10);
  }, [showAllCategories]);

  const filteredTools = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return MOCK_TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(term) || 
                            tool.description.toLowerCase().includes(term) ||
                            (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(term)));
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setVisibleCount(12);
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
      } else {
        tools = tools.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      }
    }
    return tools;
  }, [filteredTools, activeTab, searchTerm, selectedCategory]);

  const displayedTools = useMemo(() => {
    return processedTools.slice(0, visibleCount);
  }, [processedTools, visibleCount]);

  const TRUSTED_COMPANIES = ['Google', 'Microsoft', 'OpenAI', 'Amazon', 'Meta', 'IBM', 'Nvidia', 'Adobe'];

  const TESTIMONIALS = [
    { name: 'Sarah J.', role: 'Product Manager', text: 'This directory helped us find the perfect AI stack for our workflow. Incredible resource!', company: 'TechFlow' },
    { name: 'David K.', role: 'CTO', text: 'Aisev is my go-to for discovering new enterprise-grade AI solutions. Highly recommended.', company: 'InnovateX' },
    { name: 'Elena R.', role: 'Creative Director', text: 'The design tools collection is unmatched. Found exactly what I needed for our new campaign.', company: 'CreativeStudio' }
  ];

  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setNewsletterStatus('success');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <>
      <SEO 
        title="Discover Top AI Tools" 
        description="Explore 1000+ powerful AI tools for writing, design, coding, video editing & more. The ultimate directory for the future of technology."
        keywords={['AI Tools', 'Artificial Intelligence', 'Directory', 'Software', 'Tech', 'Innovation', 'ChatGPT', 'Midjourney']}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AIMasterTools",
            "url": "https://aimastertools.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://aimastertools.com/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Top AI Tools Directory",
            "description": "A curated list of the best AI tools for various categories.",
            "url": "https://aimastertools.com",
            "hasPart": MOCK_TOOLS.slice(0, 10).map(tool => ({
              "@type": "SoftwareApplication",
              "name": tool.name,
              "description": tool.description,
              "applicationCategory": tool.category,
              "url": `https://aimastertools.com/tool/${tool.id}`
            }))
          })}
        </script>
      </SEO>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Effects */}
        <motion.div 
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none"
        />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[100px] -z-10 pointer-events-none"
        />

        <div className="container-custom text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-primary)]/30 mb-8 shadow-[var(--shadow-neon)]"
          >
            <Sparkles size={16} className="text-[var(--color-secondary)]" />
            <span className="text-sm font-semibold text-[var(--color-text-primary)] tracking-wide uppercase">Next Gen AI Solutions</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-8 tracking-tight leading-tight"
          >
            Empower Your Business with <br />
            <span className="text-gradient">Intelligent AI Tools</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Discover a curated ecosystem of 150+ enterprise-grade AI solutions. Optimize workflows, enhance creativity, and drive innovation with the power of Artificial Intelligence.
          </motion.p>

            {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto relative mb-16"
          >
            <div className="relative flex items-center group">
              <Search className="absolute left-6 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" size={24} />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder={selectedCategory !== 'All' ? `Search in ${CATEGORIES.find(c => c.id === selectedCategory)?.name}...` : "Search for solutions (e.g., 'Automation', 'Analytics')"} 
                className="w-full h-14 md:h-16 pl-16 pr-28 rounded-xl bg-[var(--color-cardBg)] border border-[var(--color-border)] shadow-2xl shadow-[var(--color-primary)]/10 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-base md:text-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] transition-all"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
              
              <div className="absolute right-4 flex items-center gap-2">
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    aria-label="Clear search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">Trending:</span>
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
            )}
          </motion.div>

          {/* Trusted By Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 pt-10 border-t border-[var(--color-border)]/30 overflow-hidden"
          >
            <p className="text-sm font-medium uppercase tracking-widest mb-8 electric-text">Trusted by industry leaders</p>
            
            <div className="relative w-full overflow-hidden mask-fade-sides">
              <div className="animate-marquee flex gap-16 items-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                {/* Duplicate list 3 times for seamless loop */}
                {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, i) => (
                  <span key={i} className="text-xl md:text-2xl font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] cursor-default transition-colors whitespace-nowrap">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section - Tech Grid */}
      <section id="categories" className="py-16 md:py-24 bg-[var(--color-surface)]/30 border-y border-[var(--color-border)] relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">Explore Solutions</h2>
              <p className="text-[var(--color-text-secondary)] text-lg">Browse our comprehensive directory by category</p>
            </div>
            <button 
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-[var(--color-primary)] font-semibold hover:text-[var(--color-secondary)] flex items-center gap-2 transition-colors group"
            >
              {showAllCategories ? 'Show Less' : 'View All Categories'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {displayedCategories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.button 
                  key={cat.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`p-8 rounded-xl border transition-all duration-300 flex flex-col items-center text-center gap-5 group glass-panel card-hover-effect
                    ${selectedCategory === cat.id 
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[var(--shadow-glow)]' 
                      : 'border-[var(--color-border)]'
                    }`}
                >
                  <div className={`p-4 rounded-lg transition-colors duration-300 ${selectedCategory === cat.id ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] group-hover:text-white group-hover:bg-[var(--color-primary)]'}`}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-2 ${selectedCategory === cat.id ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]'}`}>{cat.name}</h3>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium bg-[var(--color-surface)] px-3 py-1 rounded-md inline-block border border-[var(--color-border)]">{cat.count} Tools</p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Spotlight Section */}
      <section className="py-12">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-2xl group"
          >
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/ai-art/1600/600')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/90 to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-16 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/50 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles size={12} /> Editor's Choice
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Unleash Creativity with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]">Midjourney V6</span>
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                Experience the next evolution of AI art generation. Create hyper-realistic images, unique textures, and concept art with simple text prompts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary px-8 py-3 flex items-center gap-2">
                  Try It Now <ArrowRight size={18} />
                </button>
                <button className="px-8 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-surface)] transition-all">
                  Read Review
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section - Agency Portfolio Style */}
      <section id="tools" className="py-16 md:py-24 relative">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div>
              <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-3">
                {activeTab === 'Featured' ? 'Featured' : 'Latest'} <span className="text-gradient">Innovations</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg">Handpicked AI tools to elevate your business</p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex bg-[var(--color-cardBg)] p-1 rounded-lg border border-[var(--color-border)]">
                 <button 
                   onClick={() => setActiveTab('Featured')}
                   className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all ${activeTab === 'Featured' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'}`}
                 >
                   Featured
                 </button>
                 <button 
                   onClick={() => setActiveTab('Newest')}
                   className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all ${activeTab === 'Newest' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'}`}
                 >
                   Newest
                 </button>
               </div>
            </div>
          </div>

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
                <button onClick={() => {setSearchTerm(''); setSelectedCategory('All');}} className="btn-primary">Clear Filters</button>
              </div>
            )}
          </div>

          {processedTools.length > visibleCount && (
            <div className="mt-16 text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="btn-primary px-8 py-4 text-lg"
              >
                Load More Solutions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-24 bg-[var(--color-surface)]/30 border-t border-[var(--color-border)]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">Latest <span className="text-gradient">Insights</span></h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg">
              Expert analysis, tutorials, and trends in the AI landscape.
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
                     <img src={post.imageUrl} alt={post.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
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
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">Pioneering the <span className="text-gradient">Future of AI</span></h2>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                We are a premier digital agency dedicated to curating and developing the most advanced AI solutions. 
                Our mission is to bridge the gap between complex technology and practical business applications.
              </p>
              <ul className="space-y-4">
                {['Enterprise-Grade Solutions', 'Real-time Analytics', 'Expert Consultation'].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-3 text-[var(--color-text-primary)] font-medium"
                  >
                    <div className="bg-[var(--color-primary)]/20 p-1 rounded-full">
                      <Check size={16} className="text-[var(--color-primary)]" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <button className="btn-primary mt-4">Learn More About Us</button>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 mt-12">
                <div className="p-8 glass-panel rounded-2xl border border-[var(--color-border)] text-center card-hover-effect">
                  <h3 className="text-4xl font-bold text-[var(--color-secondary)] mb-2">
                    <CountUp to={MOCK_TOOLS.length} suffix="+" />
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-bold uppercase tracking-wider">Tools Indexed</p>
                </div>
                <div className="p-8 glass-panel rounded-2xl border border-[var(--color-border)] text-center card-hover-effect">
                  <h3 className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                    <CountUp to={CATEGORIES.length} suffix="+" />
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-bold uppercase tracking-wider">Categories</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-8 glass-panel rounded-2xl border border-[var(--color-border)] text-center card-hover-effect">
                  <h3 className="text-4xl font-bold text-[var(--color-accent)] mb-2">
                    <CountUp to={MOCK_TOOLS.filter(t => t.pricing === 'Free').length} suffix="+" />
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-bold uppercase tracking-wider">Free Tools</p>
                </div>
                <div className="p-8 glass-panel rounded-2xl border border-[var(--color-border)] text-center card-hover-effect">
                  <h3 className="text-4xl font-bold text-white mb-2">
                    <CountUp to={BLOG_POSTS.length} suffix="+" />
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-bold uppercase tracking-wider">Articles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]/30 border-t border-[var(--color-border)] relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">What Our <span className="text-gradient">Users Say</span></h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg">
              Join thousands of professionals who trust AIMasterTools for their AI needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 glass-panel rounded-2xl border border-[var(--color-border)] relative"
              >
                <div className="absolute top-6 right-8 text-[var(--color-primary)]/20">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
                  </svg>
                </div>
                <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed relative z-10">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-text-primary)]">{testimonial.name}</h4>
                    <p className="text-xs text-[var(--color-text-muted)]">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 relative overflow-hidden border-t border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[var(--color-surface)]/50 -z-10"></div>
        <div className="container-custom relative z-10">
          <div className="glass-panel border border-[var(--color-border)] rounded-2xl p-12 md:p-20 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50"></div>
            
            <div className="inline-flex p-4 rounded-xl bg-[var(--color-primary)]/10 mb-8 border border-[var(--color-primary)]/20 shadow-[var(--shadow-neon)]">
              <Sparkles className="text-[var(--color-primary)]" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text-primary)] tracking-tight">Join the <span className="text-gradient">AI Revolution</span></h2>
            <p className="text-[var(--color-text-secondary)] mb-10 max-w-xl mx-auto text-xl leading-relaxed">
              Get exclusive access to new tools, premium tutorials, and industry insights delivered to your inbox.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleNewsletterSubmit}>
              {newsletterStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center justify-center gap-3 text-green-400"
                >
                  <Check size={20} />
                  <span className="font-semibold">Subscribed successfully!</span>
                </motion.div>
              ) : (
                <>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-grow bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-lg px-6 py-4 text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-transparent transition-all placeholder-[var(--color-text-muted)]"
                    required
                    disabled={newsletterStatus === 'submitting'}
                  />
                  <button 
                    type="submit"
                    disabled={newsletterStatus === 'submitting'}
                    className="btn-primary px-10 py-4 rounded-lg shadow-lg whitespace-nowrap text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {newsletterStatus === 'submitting' ? 'Joining...' : 'Subscribe'}
                  </button>
                </>
              )}
            </form>
            <p className="text-xs text-[var(--color-text-muted)] mt-8 font-medium">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
