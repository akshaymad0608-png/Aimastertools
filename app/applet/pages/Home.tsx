import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Check, Loader2, Sparkles, Star, X
} from 'lucide-react';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import { CATEGORIES, MOCK_TOOLS } from '../constants';
import { CategoryCard } from '../components/CategoryCard';
import { Category } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import { doc, setDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

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

  const isNew = (dateStr: string) => {
    // Simple mock logic for "New" badge
    return dateStr.includes("Oct");
  };

  return (
    <section id="blog" className="py-16 md:py-24 relative bg-white border-y border-gray-100">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-0">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a2e" }}>Latest Insights</h2>
            <p style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>Stay updated with the latest in AI and prompt engineering.</p>
          </div>
          <Link to="/blog" style={{ fontSize: "13px", color: "#534AB7", textDecoration: "none", whiteSpace: "nowrap", fontWeight: 600 }}>
            View all posts →
          </Link>
        </div>

        {/* Top 3-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }} className="md:grid-cols-[1.6fr_1fr_1fr]">

          {/* Featured card */}
          <Link to={`/blog/${featured.slug || featured.id}`} style={{
            border: "1px solid #e5e5e5", borderRadius: "16px",
            overflow: "hidden", cursor: "pointer", background: "#fff",
            transition: "all 0.2s", textDecoration: "none", display: 'flex', flexDirection: 'column'
          }}
          className="md:col-span-1 col-span-full group hover:shadow-lg hover:-translate-y-1"
          >
            <div style={{
              width: "100%", height: "200px",
              background: `linear-gradient(135deg, ${featured.catBg}, ${featured.catColor})`,
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
            }}>
              {isNew(featured.date) && <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">NEW</div>}
              <div style={{ fontSize: "64px", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.25))", transition: "transform 0.3s" }} className="group-hover:scale-110">
                {featured.imgEmoji}
              </div>
            </div>
            <div style={{ padding: "20px", flex: 1, display: 'flex', flexDirection: 'column' }}>
              <CategoryBadge label={featured.category} bg={featured.catBg} color={featured.catColor} />
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", lineHeight: "1.4", marginBottom: "8px" }}>
                {featured.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "16px", flex: 1 }}>
                {featured.excerpt}
              </p>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">AM</div>
                  <span className="text-[12px] font-medium text-slate-700">Akshay M.</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11px", color: "#888" }}>{featured.date}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Side column 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} className="col-span-1">
            {sideLeft.map(post => (
              <Link to={`/blog/${post.slug || post.id}`} key={post.id} style={{
                border: "1px solid #e5e5e5", borderRadius: "14px",
                overflow: "hidden", cursor: "pointer", background: "#fff", flex: 1,
                transition: "all 0.2s", textDecoration: "none", display: 'flex', flexDirection: 'column'
              }}
              className="group hover:shadow-md hover:-translate-y-1"
              >
                <div style={{
                  width: "100%", height: "100px",
                  background: `linear-gradient(135deg, ${post.catBg}, ${post.catColor})`,
                  display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
                }}>
                  {isNew(post.date) && <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">NEW</div>}
                  <div style={{ fontSize: "40px", filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.2))", transition: "transform 0.3s" }} className="group-hover:scale-110">{post.imgEmoji}</div>
                </div>
                <div style={{ padding: "14px 16px", flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <CategoryBadge label={post.category} bg={post.catBg} color={post.catColor} />
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", lineHeight: "1.35", marginBottom: "8px" }}>{post.title}</div>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600">JD</div>
                      <span className="text-[11px] font-medium text-slate-600">Jane D.</span>
                    </div>
                    <div style={{ fontSize: "10px", color: "#888" }}>{post.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Side column 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} className="col-span-1">
            {sideRight.map(post => (
              <Link to={`/blog/${post.slug || post.id}`} key={post.id} style={{
                border: "1px solid #e5e5e5", borderRadius: "14px",
                overflow: "hidden", cursor: "pointer", background: "#fff", flex: 1,
                transition: "all 0.2s", textDecoration: "none", display: 'flex', flexDirection: 'column'
              }}
              className="group hover:shadow-md hover:-translate-y-1"
              >
                <div style={{
                  width: "100%", height: "100px",
                  background: `linear-gradient(135deg, ${post.catBg}, ${post.catColor})`,
                  display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
                }}>
                  {isNew(post.date) && <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">NEW</div>}
                  <div style={{ fontSize: "40px", filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.2))", transition: "transform 0.3s" }} className="group-hover:scale-110">{post.imgEmoji}</div>
                </div>
                <div style={{ padding: "14px 16px", flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <CategoryBadge label={post.category} bg={post.catBg} color={post.catColor} />
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", lineHeight: "1.35", marginBottom: "8px" }}>{post.title}</div>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600">SM</div>
                      <span className="text-[11px] font-medium text-slate-600">Sarah M.</span>
                    </div>
                    <div style={{ fontSize: "10px", color: "#888" }}>{post.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom horizontal cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginTop: "16px" }} className="md:grid-cols-3">
          {bottom.map(post => (
            <Link to={`/blog/${post.slug || post.id}`} key={post.id} style={{
              border: "1px solid #e5e5e5", borderRadius: "14px",
              overflow: "hidden", cursor: "pointer", background: "#fff",
              display: "flex", transition: "all 0.2s", textDecoration: "none",
              minHeight: "100px"
            }}
            className="group hover:shadow-md hover:-translate-y-1"
            >
              <div style={{
                width: "100px", height: "100%", flexShrink: 0,
                background: `linear-gradient(135deg, ${post.catBg}, ${post.catColor})`,
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
              }}>
                <div style={{ fontSize: "32px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))", transition: "transform 0.3s" }} className="group-hover:scale-110">{post.imgEmoji}</div>
              </div>
              <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                <CategoryBadge label={post.category} bg={post.catBg} color={post.catColor} />
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#1a1a2e", lineHeight: "1.35", marginBottom: "6px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.title}</div>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600">ED</div>
                      <span className="text-[10px] font-medium text-slate-600">Editor</span>
                    </div>
                    <div style={{ fontSize: "9px", color: "#888" }}>{post.date}</div>
                </div>
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

  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedCategory('All');
  };

  const handleVoiceTranscript = (transcript: string) => {
    setSearchTerm(transcript);
    setSelectedCategory('All');
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
    if (categoryParam) {
      const categoryExists = CATEGORIES.some(c => c.id === categoryParam);
      if (categoryExists) {
        setSelectedCategory(categoryParam as Category);
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
    setVisibleCount(8);
    const toolsSection = document.getElementById('content');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const displayedCategories = useMemo(() => {
    let cats = CATEGORIES;
    if (searchTerm) {
      const terms = searchTerm.toLowerCase().split(' ').filter(String);
      const matchingTools = MOCK_TOOLS.filter(tool => {
        const toolText = `${tool.name} ${tool.description} ${tool.category} ${(tool.tags || []).join(' ')}`.toLowerCase();
        return terms.every(term => toolText.includes(term));
      });
      
      const matchingCategoryIds = new Set(matchingTools.map(t => t.category));
      
      cats = cats.filter(cat => {
        const catText = `${cat.name} ${cat.id}`.toLowerCase();
        return terms.every(term => catText.includes(term)) || matchingCategoryIds.has(cat.id);
      });
    }
    return showAllCategories || searchTerm ? cats : cats.slice(0, 6);
  }, [showAllCategories, searchTerm]);

  const filteredTools = useMemo(() => {
    const terms = searchTerm.toLowerCase().split(' ').filter(String);
    return MOCK_TOOLS.filter(tool => {
      const toolText = `${tool.name} ${tool.description} ${tool.category} ${(tool.tags || []).join(' ')}`.toLowerCase();
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

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting'>('idle');
  
  const [toastMessage, setToastMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      showToast('error', "Please enter an email address.");
      return;
    }

    setNewsletterStatus('submitting');
    try {
      await addDoc(collection(db, 'newsletter_emails'), {
        email: newsletterEmail,
        subscribedAt: serverTimestamp()
      });
      
      setNewsletterStatus('idle');
      setNewsletterEmail('');
      showToast('success', "Welcome to the future of AI!");
    } catch (error: any) {
      console.error("Error subscribing:", error);
      showToast('error', error.message || 'Failed to subscribe. Please try again.');
      setNewsletterStatus('idle');
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
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes mesh-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-mesh {
          background: radial-gradient(at 40% 20%, hsla(28,100%,74%,0.15) 0px, transparent 50%),
                      radial-gradient(at 80% 0%, hsla(189,100%,56%,0.15) 0px, transparent 50%),
                      radial-gradient(at 0% 50%, hsla(355,100%,93%,0.15) 0px, transparent 50%),
                      radial-gradient(at 80% 50%, hsla(340,100%,76%,0.15) 0px, transparent 50%),
                      radial-gradient(at 0% 100%, hsla(22,100%,77%,0.15) 0px, transparent 50%),
                      radial-gradient(at 80% 100%, hsla(242,100%,70%,0.15) 0px, transparent 50%),
                      radial-gradient(at 0% 0%, hsla(343,100%,76%,0.15) 0px, transparent 50%);
          background-size: 200% 200%;
          animation: mesh-gradient 10s ease infinite;
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; border-right-color: transparent; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        .typewriter-text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #534AB7;
          animation: typewriter 2s steps(40, end) forwards, blink .75s step-end 3;
          display: inline-block;
          vertical-align: bottom;
        }
        @keyframes float-dot {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.5; }
        }
        .floating-dot {
          animation: float-dot 4s ease-in-out infinite;
        }
      `}} />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] px-6 py-3 rounded-full shadow-2xl font-semibold text-sm animate-fade-in-up flex items-center border ${
          toastMessage.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'
        }`}>
          {toastMessage.type === 'success' && <Check size={16} className="mr-2" strokeWidth={3} />}
          {toastMessage.text}
        </div>
      )}

      <div 
        className={`md:hidden fixed top-[60px] left-0 w-full bg-white/95 backdrop-blur-md pt-3 pb-3 px-4 z-[60] transition-transform duration-300 border-b border-gray-200 shadow-sm ${isSearchSticky ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <form onSubmit={(e) => { e.preventDefault(); document.getElementById('content')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); mobileSearchInputRef.current?.blur(); }} className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input 
            ref={mobileSearchInputRef}
            type="text" 
            placeholder="Search tools..." 
            className="w-full h-12 pl-10 pr-12 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute right-2 flex items-center">
            <React.Suspense fallback={<div className="w-8 h-8"></div>}>
              <VoiceSearch onTranscript={handleVoiceTranscript} />
            </React.Suspense>
          </div>
        </form>
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
      <section id="home" className="relative pt-32 pb-16 md:pt-44 md:pb-20 bg-white hero-mesh">
        <div className="container-custom text-center relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl sm:text-[4rem] leading-[1.1] md:text-[5rem] md:leading-[1] font-extrabold text-slate-900 mb-6 tracking-tight font-sans">
            Find the best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 typewriter-text">AI tools</span>
          </h1>
          
          <p className="text-lg md:text-[20px] text-slate-500 mb-10 max-w-2xl mx-auto font-medium">
            Discover, compare, and leverage 500+ AI tools to boost your productivity, creativity, and development.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-6 animate-fade-in-up">
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                document.getElementById('content')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
              }}
              className="relative flex items-center shadow-sm hover:shadow-md transition-shadow rounded-2xl border border-gray-200 bg-white p-1.5 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500"
            >
              <Search className="absolute left-5 text-gray-400" size={20} strokeWidth={2.5} />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder='Search tools, categories, or use cases...'
                className="w-full h-14 pl-14 pr-24 sm:pr-[150px] bg-transparent border-none focus:ring-0 outline-none text-slate-900 placeholder-slate-400 text-[17px] font-medium"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span className="absolute right-20 sm:right-[120px] text-xs font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 hidden sm:inline-block">⌘K</span>
              <button 
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 hidden sm:flex items-center px-6 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-6 mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            {/* Trusted By */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden" style={{ background: `hsl(${i * 60 + 200}, 80%, 75%)`, zIndex: 10 - i }}>
                    <span className="text-[10px] font-bold text-white/90">U{i}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 font-medium tracking-tight">Trusted by 50,000+ developers, designers & marketers</p>
              </div>
            </div>

            {/* Action Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                <Check size={14} className="text-indigo-500" strokeWidth={3} /> 500+ Tools
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                <Check size={14} className="text-emerald-500" strokeWidth={3} /> 50+ Categories
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                <Check size={14} className="text-amber-500" strokeWidth={3} /> Free Forever
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Layout Content: Categories Sidebar and Tools List */}
      <section id="content" className="py-12 md:py-16 relative bg-white border-t border-gray-100">
        <div className="container-custom max-w-[1300px] mx-auto">
          
          {/* Horizontal Category Cards */}
          <div className="mb-12 w-full relative">
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden" />
             <div className="flex flex-nowrap md:flex-wrap gap-4 overflow-x-auto md:overflow-visible hide-scrollbar pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory" style={{ scrollPaddingLeft: '1rem' }}>
                 <CategoryCard
                   name="All Tools"
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
                       isTrending={cat.name === 'Image & Art Generation' || cat.name === 'Code & Development'}
                       onClick={() => handleCategoryClick(cat.id as Category)}
                     />
                   );
                 })}
             </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
              <div className="text-[15px] font-medium text-slate-500">
                Showing <span className="text-slate-900 font-bold">{processedTools.length}</span> tools in <span className="text-slate-900 font-bold">{selectedCategory}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
                  {(['Featured', 'Newest', 'Trending'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
                <select 
                  className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#534AB7]/20 font-medium cursor-pointer w-full sm:w-auto mt-2 sm:mt-0"
                  value={selectedPricing}
                  onChange={(e) => setSelectedPricing(e.target.value)}
                >
                  <option value="All">All Pricing</option>
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Paid">Paid</option>
                  <option value="Usage Based">Usage Based</option>
                  <option value="Open Source">Open Source</option>
                </select>
              </div>
            </div>

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
                  <p className="text-slate-500 mb-6">Try adjusting your search criteria or pricing filter.</p>
                  <button onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedPricing('All');}} className="px-6 py-2 rounded-xl bg-[#534AB7]/10 text-[#534AB7] font-semibold hover:bg-[#534AB7]/20 transition-colors">Clear All Filters</button>
                </div>
              )}
            </div>

            {processedTools.length > visibleCount && (
              <div className="mt-10 text-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  className="px-8 py-3 rounded-xl bg-white border border-gray-200 shadow-sm text-slate-700 font-semibold hover:bg-slate-50 hover:-translate-y-0.5 transition-all"
                >
                  Load More Results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end gap-3 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        {showChatTooltip && (
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 relative min-w-[200px] max-w-[240px]">
            <p className="text-[14px] text-gray-800 font-medium leading-snug pr-2">
              Hi! What do you want to optimize with AI today?
            </p>
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-4 bg-white border-t border-r border-gray-100 transform rotate-45"></div>
          </div>
        )}
        <button 
          onClick={() => navigate('/find')}
          className="w-14 h-14 bg-[#534AB7] hover:bg-[#433b9b] transition-all duration-300 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(83,74,183,0.4)] text-white group"
          title="Find AI Tools"
        >
          <Sparkles size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Blog Section */}
      <BlogSection />

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 relative bg-white border-b border-gray-100 overflow-hidden">
        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-0 relative">
          
          <div 
            className="px-6 py-10 md:px-10 md:py-14"
            style={{
              background: "#534AB7",
              borderRadius: "24px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background elements */}
            <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "#fff", opacity: 0.05 }} />
            <div style={{ position: "absolute", bottom: "-80px", right: "-20px", width: "250px", height: "250px", borderRadius: "50%", background: "#fff", opacity: 0.05 }} />
            <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-white/20 rounded-full floating-dot" style={{ animationDelay: '0s' }} />
            <div className="absolute top-[40%] right-[10%] w-4 h-4 bg-white/20 rounded-full floating-dot" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[20%] left-[25%] w-2.5 h-2.5 bg-white/30 rounded-full floating-dot" style={{ animationDelay: '2s' }} />
            
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

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                Get the best AI tools <span style={{ color: "#d4b8ff" }}>weekly</span>
              </h2>
              <p className="text-white/90 text-sm md:text-[17px] mb-10 max-w-xl mx-auto line-height-[1.6]">
                Sign up for our curated newsletter with the latest AI tools, prompt engineering tips, and industry insights.
              </p>

              {/* Form container */}
              <form onSubmit={handleNewsletterSubmit} style={{
                display: "flex",
                gap: "8px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "8px",
                borderRadius: "14px",
                maxWidth: "460px",
                margin: "0 auto",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
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
                  className="placeholder-white/70 font-medium"
                />
                <button 
                  type="submit" 
                  disabled={newsletterStatus === 'submitting'}
                  style={{
                    background: "#ffffff",
                    color: "#534AB7",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.2s"
                  }}
                  className="hover:-translate-y-[1px] hover:shadow-md"
                >
                  {newsletterStatus === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : 'Get Weekly Updates →'}
                </button>
              </form>
              <p className="mt-4 mb-10 text-[13px] text-white/70 font-medium">🔒 No spam. Unsubscribe anytime.</p>

              {/* Stats border-top */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "48px",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                paddingTop: "32px",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                <div>
                  <div style={{ color: "#fff", fontSize: "28px", fontWeight: "800", marginBottom: "4px", letterSpacing: "-0.5px" }}>50k+</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 500 }}>Subscribers</div>
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "28px", fontWeight: "800", marginBottom: "4px", letterSpacing: "-0.5px" }}>2.5k</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 500 }}>Tools</div>
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "28px", fontWeight: "800", marginBottom: "4px", letterSpacing: "-0.5px" }}>100%</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 500 }}>Free forever</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
