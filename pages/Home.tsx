import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, ArrowRight, BrainCircuit, Sparkles, Check, Loader2, Play, TrendingUp, Star, X
} from 'lucide-react';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import { CATEGORIES, MOCK_TOOLS, BLOG_POSTS } from '../constants';
import { CategoryCard } from '../components/CategoryCard';
import { Category } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

const VoiceSearch = React.lazy(() => import('../components/VoiceSearch'));

import { blogPosts } from '../data/blogs';

const CategoryBadge = ({ label, bg, color }: { label: string, bg: string, color: string }) => (
  <span style={{
    display: "inline-block",
    fontSize: "10px", fontWeight: "600",
    padding: "3px 10px", borderRadius: "20px",
    background: bg, color: color,
    textTransform: "uppercase", letterSpacing: "0.4px",
    marginBottom: "8px"
  }}>{label}</span>
);

const BlogSection = () => {
  const featured = blogPosts[0];
  const sideLeft = blogPosts.slice(1, 3);
  const sideRight = blogPosts.slice(3, 5);
  const bottom = blogPosts.slice(5, 8);

  return (
    <section id="blog" className="py-16 md:py-24 relative bg-white border-y border-gray-100">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-0">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a2e" }}>Latest Insights</h2>
            <p style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>Stay updated with the latest in AI and prompt engineering.</p>
          </div>
          <Link to="/blog" style={{ fontSize: "13px", color: "#534AB7", textDecoration: "none", whiteSpace: "nowrap" }}>
            View all posts →
          </Link>
        </div>

        {/* Top 3-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }} className="md:grid-cols-[1.6fr_1fr_1fr]">

          {/* Featured card */}
          <Link to={`/blog/${featured.slug || featured.id}`} style={{
            border: "1px solid #e5e5e5", borderRadius: "16px",
            overflow: "hidden", cursor: "pointer", background: "#fff",
            transition: "border-color 0.15s", textDecoration: "none"
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#534AB7"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e5e5"}
          className="md:col-span-1 col-span-full"
          >
            <div style={{
              width: "100%", height: "200px",
              background: featured.imgBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "56px"
            }}>
              {featured.imgEmoji}
            </div>
            <div style={{ padding: "18px" }}>
              <CategoryBadge label={featured.category} bg={featured.catBg} color={featured.catColor} />
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a2e", lineHeight: "1.4", marginBottom: "8px" }}>
                {featured.title}
              </h3>
              <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.6", marginBottom: "14px" }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "11px", color: "#888" }}>{featured.date}</span>
                <span style={{ fontSize: "11px", color: "#888" }}>·</span>
                <span style={{ fontSize: "11px", color: "#888" }}>{featured.readTime}</span>
                <span style={{ fontSize: "12px", color: "#534AB7", fontWeight: "500", textDecoration: "none", marginLeft: "auto" }}>
                  Read post →
                </span>
              </div>
            </div>
          </Link>

          {/* Side column 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }} className="col-span-1">
            {sideLeft.map(post => (
              <Link to={`/blog/${post.slug || post.id}`} key={post.id} style={{
                border: "1px solid #e5e5e5", borderRadius: "14px",
                overflow: "hidden", cursor: "pointer", background: "#fff", flex: 1,
                transition: "border-color 0.15s", textDecoration: "none"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#534AB7"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e5e5"}
              >
                <div style={{
                  width: "100%", height: "100px",
                  background: post.imgBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "34px"
                }}>{post.imgEmoji}</div>
                <div style={{ padding: "12px 14px" }}>
                  <CategoryBadge label={post.category} bg={post.catBg} color={post.catColor} />
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#1a1a2e", lineHeight: "1.35", marginBottom: "6px" }}>{post.title}</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>{post.date} · {post.readTime}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Side column 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }} className="col-span-1">
            {sideRight.map(post => (
              <Link to={`/blog/${post.slug || post.id}`} key={post.id} style={{
                border: "1px solid #e5e5e5", borderRadius: "14px",
                overflow: "hidden", cursor: "pointer", background: "#fff", flex: 1,
                transition: "border-color 0.15s", textDecoration: "none"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#534AB7"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e5e5"}
              >
                <div style={{
                  width: "100%", height: "100px",
                  background: post.imgBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "34px"
                }}>{post.imgEmoji}</div>
                <div style={{ padding: "12px 14px" }}>
                  <CategoryBadge label={post.category} bg={post.catBg} color={post.catColor} />
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#1a1a2e", lineHeight: "1.35", marginBottom: "6px" }}>{post.title}</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>{post.date} · {post.readTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom horizontal cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginTop: "14px" }} className="md:grid-cols-3">
          {bottom.map(post => (
            <Link to={`/blog/${post.slug || post.id}`} key={post.id} style={{
              border: "1px solid #e5e5e5", borderRadius: "14px",
              overflow: "hidden", cursor: "pointer", background: "#fff",
              display: "flex", transition: "border-color 0.15s", textDecoration: "none"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#534AB7"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e5e5"}
            >
              <div style={{
                width: "88px", height: "88px", flexShrink: 0,
                background: post.imgBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px"
              }}>{post.imgEmoji}</div>
              <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <CategoryBadge label={post.category} bg={post.catBg} color={post.catColor} />
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#1a1a2e", lineHeight: "1.35", marginBottom: "4px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.title}</div>
                <div style={{ fontSize: "10px", color: "#888" }}>{post.date} · {post.readTime}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const location = useLocation();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'Featured' | 'Newest' | 'Trending'>('Featured');
  const [visibleCount, setVisibleCount] = useState(8);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const [showChatTooltip, setShowChatTooltip] = useState(true);

  const navigate = useNavigate();

  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = React.useRef<HTMLInputElement>(null);

  const handleVoiceTranscript = (transcript: string) => {
    setSearchTerm(transcript);
    // Scroll to tools section
    setTimeout(() => {
      const toolsSection = document.getElementById('content');
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSearchSticky(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    if (categoryParam) {
      // Check if category exists in our list to avoid invalid states
      const categoryExists = CATEGORIES.some(c => c.id === categoryParam);
      if (categoryExists) {
        setSelectedCategory(categoryParam as Category);
        // Scroll to tools section
        setTimeout(() => {
          const toolsSection = document.getElementById('content');
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
    const toolsSection = document.getElementById('content');
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
      document.getElementById('content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setErrorMessage("Please enter an email address.");
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
      return;
    }

    setNewsletterStatus('submitting');
    try {
      await addDoc(collection(db, 'newsletter_emails'), {
        email: newsletterEmail,
        subscribedAt: serverTimestamp()
      });
      
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    } catch (error: any) {
      console.error("Error subscribing:", error);
      setErrorMessage(error.message || 'Failed to subscribe. Please try again.');
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    }
  };

  const seoTitle = selectedCategory === 'All' 
    ? "AI Master Tools — #1 Directory to Discover & Compare 500+ AI Tools (2026)" 
    : `Best ${selectedCategory} AI Tools (2026) | AI Master Tools`;

  const seoDesc = selectedCategory === 'All'
    ? "Browse 500+ AI tools across 50+ categories. Find the perfect free and premium AI software for writing, coding, productivity, design, and more."
    : `Discover and compare the best ${selectedCategory} AI tools. Read reviews, check pricing, and find the perfect AI software for your workflow.`;

  return (
    <>
      <div 
        className={`md:hidden fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md pt-[70px] pb-3 px-4 z-40 transition-transform duration-300 border-b border-gray-200 shadow-sm ${isSearchSticky ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input 
            ref={mobileSearchInputRef}
            type="text" 
            placeholder="Search tools..." 
            className="w-full h-12 pl-10 pr-12 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <div className="absolute right-2 flex items-center">
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="p-1 mr-1 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
            <React.Suspense fallback={<div className="w-8 h-8"></div>}>
              <VoiceSearch onTranscript={handleVoiceTranscript} />
            </React.Suspense>
          </div>
        </div>
      </div>

      <SEO 
        title={seoTitle} 
        description={seoDesc} 
        keywords={['AI tools directory', 'compare AI tools', 'best AI software', 'AI tool suggestions', 'AI Master Tools', 'Akshay Mahajan', 'Prompt Engineering', 'AI ML Engineering', 'best AI tools list 2026', 'free AI tools Hindi', 'ChatGPT alternative free']}
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
      <section id="home" className="relative pt-32 pb-16 md:pt-44 md:pb-20 bg-white">
        <div className="container-custom text-center relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl sm:text-[4rem] leading-[1.1] md:text-[5rem] md:leading-[1] font-extrabold text-slate-900 mb-6 tracking-tight font-sans">
            Find the best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI tools</span>
          </h1>
          
          <p className="text-lg md:text-[20px] text-slate-500 mb-10 max-w-2xl mx-auto font-medium">
            Discover, compare, and leverage 500+ AI tools to boost your productivity, creativity, and development.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <div className="relative flex items-center shadow-sm hover:shadow-md transition-shadow rounded-2xl border border-gray-200 bg-white p-1.5 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500">
              <Search className="absolute left-5 text-gray-400" size={20} strokeWidth={2.5} />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder='Search tools, categories, or use cases...'
                className="w-full h-14 pl-14 pr-12 bg-transparent border-none focus:ring-0 outline-none text-slate-900 placeholder-slate-400 text-[17px] font-medium"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
              
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-16 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
              
              <button 
                onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute right-1.5 top-1.5 bottom-1.5 hidden sm:flex items-center px-6 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                Search
              </button>
            </div>
            
            {/* Quick search tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <span className="text-sm font-medium text-slate-400 mr-2 mt-1">Try:</span>
              {["Video generator", "Coding assistant", "SEO text", "Logo maker"].map((query, i) => (
                <button 
                  key={i}
                  onClick={() => { setSearchTerm(query); setVisibleCount(6); }}
                  className="px-3 py-1.5 rounded-full bg-slate-50 border border-gray-100 text-slate-600 text-[13px] font-medium hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Layout Content: Categories Sidebar and Tools List */}
      <section id="content" className="py-12 md:py-16 relative bg-white">
        <div className="container-custom max-w-[1300px] mx-auto">
          
          {/* Horizontal Category Cards */}
          <div className="mb-10 w-full relative">
             <div className="flex flex-nowrap md:flex-wrap gap-4 overflow-x-auto md:overflow-visible hide-scrollbar pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                 <CategoryCard
                   name="All Categories"
                   icon="ti-layout-grid"
                   bg="#F1EFE8"
                   color="#444441"
                   count={MOCK_TOOLS.length}
                   isSelected={selectedCategory === 'All'}
                   onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                 />
                 {CATEGORIES.map(cat => {
                   return (
                     <CategoryCard
                       key={cat.id}
                       name={cat.name}
                       icon={cat.icon}
                       bg={cat.bg || "#f8f9fa"}
                       color={cat.color || "#444441"}
                       count={cat.count}
                       isSelected={selectedCategory === cat.id}
                       onClick={() => handleCategoryClick(cat.id as Category)}
                     />
                   );
                 })}
             </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Main Area - Tools List */}
            <div className="flex-1 flex flex-col min-w-0">
            
            {/* List */}
            <div className="flex flex-col gap-4">
              {displayedTools.length > 0 ? (
                displayedTools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.03}s`, animationFillMode: 'both' }}
                  >
                    <ToolCard 
                      tool={tool} 
                      rank={index + 1}
                      priority={index < 5}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <Search size={40} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium text-slate-800 mb-2">No results found.</p>
                  <p className="text-slate-500 mb-6">Try adjusting your search criteria.</p>
                  <button onClick={() => {setSearchTerm(''); setSelectedCategory('All');}} className="px-6 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors">Clear Filters</button>
                </div>
              )}
            </div>

            {processedTools.length > visibleCount && (
              <div className="mt-10 text-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  className="px-8 py-3 rounded-xl bg-white border border-gray-200 shadow-sm text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        {showChatTooltip && (
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 relative max-w-[240px]">
            <button 
              onClick={() => setShowChatTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
            <p className="text-[14px] text-gray-800 font-medium leading-snug pr-5">
              Hi! What do you want to optimize with AI today?
            </p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
          </div>
        )}
        <button 
          onClick={() => navigate('/find')}
          className="w-14 h-14 bg-[#4ab2fc] hover:bg-blue-500 transition-colors rounded-full flex items-center justify-center shadow-lg text-white group"
          title="Find AI Tools"
        >
          <Sparkles size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Blog Section */}
      <BlogSection />

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 relative bg-white border-b border-gray-100">
        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-0">
          <div style={{
            background: "#534AB7",
            borderRadius: "20px",
            padding: "52px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Background circles (depth dots) */}
            <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "#fff", opacity: 0.06 }} />
            <div style={{ position: "absolute", bottom: "-80px", right: "-20px", width: "250px", height: "250px", borderRadius: "50%", background: "#fff", opacity: 0.06 }} />
            
            <div style={{ position: "relative", zIndex: 10 }}>
              {/* Badge */}
              <div style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "24px"
              }}>
                Join 50,000+ Creators
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Get the best AI tools <span style={{ color: "#d4b8ff" }}>weekly</span>
              </h2>
              <p className="text-white/90 text-sm md:text-base mb-10 max-w-xl mx-auto">
                Sign up for our curated newsletter with the latest AI tools, prompt engineering tips, and industry insights.
              </p>

              {/* Form container */}
              <form onSubmit={handleNewsletterSubmit} style={{
                display: "flex",
                gap: "8px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "8px",
                borderRadius: "12px",
                maxWidth: "460px",
                margin: "0 auto",
                marginBottom: "40px"
              }}>
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#fff",
                    padding: "0 16px",
                    fontSize: "15px"
                  }}
                  className="placeholder-white/60"
                />
                <button 
                  type="submit" 
                  disabled={newsletterStatus === 'submitting'}
                  style={{
                    background: "#fff",
                    color: "#534AB7",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  {newsletterStatus === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe →'}
                </button>
              </form>

              {/* Stats border-top */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "48px",
                borderTop: "1px solid rgba(255,255,255,0.12)",
                paddingTop: "24px",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                <div>
                  <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>50k+</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>Subscribers</div>
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>2.5k</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>Tools</div>
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>100%</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>Free</div>
                </div>
              </div>
              
              {newsletterStatus === 'success' && (
                <div style={{ marginTop: "24px", color: "#fff", fontWeight: "600" }}>
                  <Check size={18} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px", marginBottom: "2px" }} /> 
                  Welcome to the future of AI!
                </div>
              )}
              {newsletterStatus === 'error' && (
                <div style={{ marginTop: "24px", color: "#fca5a5", fontWeight: "500" }}>
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
