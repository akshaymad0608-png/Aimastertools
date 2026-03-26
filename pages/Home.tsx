import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, ArrowRight, BrainCircuit, Sparkles, Check, Loader2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import CountUp from '../components/CountUp';
import AdBanner from '../components/AdBanner';
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
  const [activeTab, setActiveTab] = useState<'Featured' | 'Newest' | 'Trending'>('Featured');
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

  const TRUSTED_COMPANIES = ['Google', 'Microsoft', 'OpenAI', 'Amazon', 'Meta', 'IBM', 'Nvidia', 'Adobe'];

  const TESTIMONIALS = [
    { name: 'Sarah J.', role: 'Product Manager', text: 'This directory helped us find the perfect AI stack for our workflow. Incredible resource!', company: 'TechFlow' },
    { name: 'David K.', role: 'CTO', text: 'Aisev is my go-to for discovering new enterprise-grade AI solutions. Highly recommended.', company: 'InnovateX' },
    { name: 'Elena R.', role: 'Creative Director', text: 'The design tools collection is unmatched. Found exactly what I needed for our new campaign.', company: 'CreativeStudio' }
  ];

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

  const spotlightTool = useMemo(() => {
    const featured = MOCK_TOOLS.filter(t => t.featured);
    return featured[Math.floor(Math.random() * featured.length)] || MOCK_TOOLS[0];
  }, []);

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
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Effects */}
        <motion.div 
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none"
        />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden md:block absolute bottom-0 right-0 w-[800px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[100px] -z-10 pointer-events-none"
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
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[var(--color-text-primary)] mb-6 tracking-tighter leading-[0.9]"
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
                
                <Link 
                  to="/compare" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 text-[var(--color-text-primary)] font-medium transition-all duration-300 group shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)] group-hover:scale-110 transition-transform"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  Compare AI Tools Side-by-Side
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
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

      {/* How It Works Section */}
      <section className="py-20 bg-[var(--color-cardBg)]/50 border-y border-[var(--color-border)]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Discover', desc: 'Browse through 500+ curated AI tools across 20+ specialized categories.', icon: Search },
              { step: '02', title: 'Compare', desc: 'Use our side-by-side comparison tool to find the best fit for your budget and needs.', icon: SlidersHorizontal },
              { step: '03', title: 'Implement', desc: 'Get expert insights and direct links to start transforming your workflow today.', icon: BrainCircuit }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/30 group hover:border-[var(--color-primary)] transition-all duration-500"
              >
                <div className="absolute -top-6 -left-6 text-6xl font-black text-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)]/20 transition-colors">{item.step}</div>
                <div className="mb-6 p-4 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] w-fit group-hover:scale-110 transition-transform">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{item.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {displayedCategories.map((cat, index) => {
              const Icon = cat.icon;
              // Create a more dynamic bento-like layout
              const isWide = index % 7 === 0;
              const isTall = index % 5 === 0 && !isWide;
              
              return (
                <motion.button 
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`p-6 md:p-8 rounded-3xl border transition-all duration-500 flex flex-col gap-4 group glass-panel relative overflow-hidden
                    ${isWide ? 'col-span-2 md:flex-row items-center text-left' : 'col-span-1 items-start text-left'}
                    ${isTall ? 'row-span-2 justify-between' : 'justify-center'}
                    ${selectedCategory === cat.id 
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[var(--shadow-glow)]' 
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface)]/50'
                    }`}
                >
                  {/* Background Glow */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--color-primary)]/10 rounded-full blur-2xl group-hover:bg-[var(--color-primary)]/20 transition-all duration-500"></div>
                  
                  <div className={`p-4 rounded-2xl transition-all duration-500 relative z-10 ${selectedCategory === cat.id ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] group-hover:text-white group-hover:bg-[var(--color-primary)] group-hover:shadow-lg group-hover:shadow-[var(--color-primary)]/20'}`}>
                    <Icon size={isWide ? 32 : 24} strokeWidth={1.5} />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className={`font-bold ${isWide ? 'text-xl md:text-2xl' : 'text-lg'} mb-1 ${selectedCategory === cat.id ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors'}`}>{cat.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider">{cat.count} Tools</span>
                      <div className="w-1 h-1 rounded-full bg-[var(--color-border)]"></div>
                      <span className="text-[10px] text-[var(--color-primary)] font-bold uppercase">Trending</span>
                    </div>
                  </div>
                  
                  {isTall && (
                    <div className="mt-4 w-full h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '70%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                      />
                    </div>
                  )}
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
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${spotlightTool.imageUrl})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/90 to-transparent"></div>
            
            <div className="relative z-10 p-6 md:p-16 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/50 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
                <Sparkles size={12} /> Editor's Choice
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Unleash Creativity with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]">{spotlightTool.name}</span>
              </h2>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-6 md:mb-8 leading-relaxed">
                {spotlightTool.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={spotlightTool.url} target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3 flex items-center gap-2">
                  Try It Now <ArrowRight size={18} />
                </a>
                <Link to={`/tool/${spotlightTool.id}`} className="px-8 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-surface)] transition-all">
                  Read Review
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ad Banner Section */}
      <section className="py-4">
        <div className="container-custom">
          <AdBanner />
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
            
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
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

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Tools Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            {/* Trending Sidebar */}
            <aside className="lg:w-80 shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="glass-panel border border-[var(--color-border)] rounded-3xl p-6 bg-[var(--color-cardBg)]/50">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                    <Sparkles className="text-[var(--color-accent)]" size={20} /> Trending Now
                  </h3>
                  <div className="space-y-6">
                    {MOCK_TOOLS.slice(0, 5).map((tool, i) => (
                      <Link 
                        key={tool.id} 
                        to={`/tool/${tool.id}`}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--color-border)] shrink-0">
                          <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors">{tool.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">{tool.category}</span>
                            <span className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-0.5">
                              ★ {tool.rating}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-3 rounded-xl border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] transition-all">
                    View All Trending
                  </button>
                </div>

                <div className="rounded-3xl overflow-hidden relative group aspect-[3/4] border border-[var(--color-border)] shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/ai-pro/600/800" 
                    alt="Pro Membership" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8">
                    <div className="text-[var(--color-accent)] text-xs font-black uppercase tracking-[0.2em] mb-2">Limited Offer</div>
                    <h4 className="text-2xl font-black text-white mb-4 leading-tight">Upgrade to Pro & Save 50%</h4>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">Get unlimited access to premium tools, advanced prompts, and priority support.</p>
                    <Link to="/pricing" className="block w-full py-4 rounded-xl bg-white text-black text-center font-bold hover:bg-[var(--color-accent)] hover:text-white transition-all">
                      Claim Discount
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
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
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">Pioneering the <span className="text-gradient">Future of AI Master Tools</span></h2>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                We are a premier digital agency dedicated to curating and developing the most advanced AI solutions and prompt engineering techniques. 
                Led by Akshay Mahajan, our mission is to bridge the gap between complex AI ML technology and practical business applications.
              </p>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                Whether you are looking to optimize your workflow with the <Link to="/#tools" className="text-[var(--color-primary)] hover:underline">latest AI tools</Link> or master the art of prompt engineering, our comprehensive directory provides everything you need to succeed in the rapidly evolving AI landscape.
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
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 blur-[80px] -z-10 rounded-full"></div>
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
              <div className="space-y-6 mt-12 md:mt-0 col-span-2 md:col-span-1 flex flex-row md:flex-col gap-6">
                <div className="flex-1 p-8 glass-panel rounded-2xl border border-[var(--color-border)] text-center card-hover-effect">
                  <h3 className="text-4xl font-bold text-green-400 mb-2">
                    <CountUp to={2} suffix="M+" />
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-bold uppercase tracking-wider">Total Visitors</p>
                </div>
                <div className="flex-1 p-8 glass-panel rounded-2xl border border-[var(--color-border)] text-center card-hover-effect">
                  <h3 className="text-4xl font-bold text-purple-400 mb-2">
                    <CountUp to={150} suffix="k+" />
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-bold uppercase tracking-wider">Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Content Depth Section */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]/30 border-t border-[var(--color-border)]">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3 md:mb-4">Mastering <span className="text-gradient">Prompt Engineering</span></h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-base md:text-lg px-4 md:px-0">
              Unlock the full potential of AI Master Tools with advanced prompt engineering strategies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">What is Prompt Engineering?</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">
                Prompt engineering is the practice of designing and refining inputs (prompts) to effectively communicate with large language models (LLMs) and other AI systems. By crafting precise and context-rich prompts, you can guide AI tools to generate more accurate, relevant, and high-quality outputs. It is an essential skill for anyone looking to leverage AI Master Tools for professional tasks.
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">Why Use an AI Tools Directory?</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">
                With the rapid explosion of AI ML engineering solutions, finding the right tool can be overwhelming. Our curated AI tools directory simplifies this process by categorizing the best platforms for copywriting, image generation, coding, and more. <Link to="/#categories" className="text-[var(--color-primary)] hover:underline">Explore our categories</Link> to discover solutions tailored to your specific workflow.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">How to Choose the Right AI Tool</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">
                When selecting an AI tool, consider your specific use case, budget, and required integrations. Many tools offer free tiers or trials, allowing you to test their capabilities before committing. Pay attention to community reviews and expert insights, which you can find in our <Link to="/#blog" className="text-[var(--color-primary)] hover:underline">latest AI engineering insights</Link>.
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">The Future of AI ML Engineering</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">
                The field of AI ML engineering is constantly evolving, with new breakthroughs in generative AI, autonomous agents, and multimodal models. Staying updated with the latest trends and continuously honing your prompt engineering skills will ensure you remain at the forefront of this technological revolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]/30 border-t border-[var(--color-border)] relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3 md:mb-4">What Our <span className="text-gradient">Users Say</span></h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-base md:text-lg px-4 md:px-0">
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
                className="p-8 glass-panel rounded-2xl border border-[var(--color-border)] relative card-hover-effect group"
              >
                <div className="absolute top-6 right-8 text-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)]/30 transition-colors duration-300">
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

      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]/30 border-t border-[var(--color-border)]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-6 md:p-12 border border-[var(--color-border)] shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-6">Why Use AI Master Tools to Find & Compare AI Software?</h2>
            
            <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                In today's rapidly evolving digital landscape, finding the right artificial intelligence software can be overwhelming. <strong>AI Master Tools</strong> is your premier destination to discover, compare, and review the best AI tools available in 2026. Whether you are looking for an AI writing assistant, an advanced image generator, or an enterprise-grade machine learning platform, our comprehensive directory provides personalized suggestions tailored to your specific needs.
              </p>
              
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">How We Help You Choose the Best AI Tools</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Unbiased Comparisons:</strong> We evaluate tools based on features, pricing, and real user reviews so you can make an informed decision.</li>
                <li><strong>Curated Categories:</strong> Browse through meticulously organized categories including Copywriting, Video Creation, Coding, SEO, and Productivity.</li>
                <li><strong>Personalized Suggestions:</strong> Use our advanced search and filtering system to get recommendations that match your exact workflow requirements.</li>
                <li><strong>Prompt Engineering Resources:</strong> Beyond just software, we provide expert insights and tutorials to help you master prompt engineering and get the most out of your AI investments.</li>
              </ul>

              <p className="mt-6">
                Stop wasting time testing subpar solutions. Let AI Master Tools guide you to the perfect software stack. Compare features, read in-depth reviews, and discover the top-rated AI solutions that will elevate your business and personal productivity to the next level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Community Stats */}
      <section className="py-20 border-t border-[var(--color-border)] bg-[var(--color-cardBg)]/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Users', value: '150k+', color: 'text-blue-400' },
              { label: 'Tools Compared', value: '2.5M+', color: 'text-cyan-400' },
              { label: 'Prompt Templates', value: '10k+', color: 'text-violet-400' },
              { label: 'Success Rate', value: '99.9%', color: 'text-emerald-400' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/20 glass-panel"
              >
                <div className={`text-3xl md:text-5xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden border-t border-[var(--color-border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-primary)]/5 -z-10"></div>
        <div className="container-custom relative z-10">
          <div className="relative rounded-[3rem] overflow-hidden border border-[var(--color-border)] bg-[var(--color-cardBg)]/80 backdrop-blur-3xl p-8 md:p-24 text-center max-w-6xl mx-auto shadow-[0_0_100px_rgba(59,130,246,0.1)]">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-8">
                <BrainCircuit size={14} /> AI Master Newsletter
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[var(--color-text-primary)] mb-6 tracking-tighter leading-tight">
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
