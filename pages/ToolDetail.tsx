import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Star, Share2, Calendar, Tag, Check, Globe, Twitter, Linkedin, Facebook, Sparkles } from 'lucide-react';
import { MOCK_TOOLS } from '../constants';
import { Tool } from '../types';
import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';
import { useBookmarks } from '../context/BookmarkContext';
import { usePro } from '../context/ProContext';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { isPro } = usePro();

  useEffect(() => {
    // In a real app, you would fetch from API
    const foundTool = MOCK_TOOLS.find(t => t.id === id);
    setTool(foundTool || null);
    window.scrollTo(0, 0);
  }, [id]);

  const relatedTools = useMemo(() => {
    if (!tool) return [];
    
    return MOCK_TOOLS
      .filter(t => t.id !== tool.id)
      .map(t => {
        let score = 0;
        if (t.category === tool.category) score += 5;
        
        const sharedTags = t.tags?.filter(tag => tool.tags?.includes(tag)) || [];
        score += sharedTags.length * 2;
        
        return { ...t, score };
      })
      .filter(t => t.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [tool]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Tool Not Found</h2>
          <Link to="/" className="text-[var(--color-primary)] hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={tool.name} 
        description={tool.description}
        image={tool.imageUrl}
        keywords={[tool.category, ...(tool.tags || []), 'AI Tool', 'Artificial Intelligence']}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": tool.name,
            "description": tool.description,
            "applicationCategory": tool.category,
            "operatingSystem": "Web, Windows, macOS",
            "url": tool.url,
            "image": tool.imageUrl,
            "offers": {
              "@type": "Offer",
              "price": tool.pricing === "Free" ? "0" : tool.pricing === "Freemium" ? "0" : "10",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": tool.rating,
              "reviewCount": "150"
            }
          })}
        </script>
      </SEO>
      
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 container-custom mx-auto px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10 rounded-full -z-10 pointer-events-none"></div>

        <a href="/#tools" className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-8 transition-colors font-medium group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Directory
        </a>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="glass-panel border border-[var(--color-border)] rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-5 rounded-full -z-10"></div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden flex-shrink-0 border border-[var(--color-border)] bg-[var(--color-cardBg)] shadow-md">
                   <img src={tool.imageUrl} alt={tool.name} width="112" height="112" decoding="async" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      tool.pricing === 'Free' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      tool.pricing === 'Paid' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {tool.pricing}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1 bg-[var(--color-surface)] px-3 py-1 rounded-full border border-[var(--color-border)]">
                      <Calendar size={12} /> Added {tool.dateAdded}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight">{tool.name}</h1>
                    {tool.featured && (
                      <span className="flex items-center gap-1 text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20" title="Verified Tool">
                        <Check size={14} /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Image/Screenshot Section */}
            <div className="rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-2xl aspect-video">
              <img src={tool.imageUrl} alt={`${tool.name} screenshot`} width="800" height="450" decoding="async" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
            </div>

            {/* Detailed Description */}
            <div className="glass-panel border border-[var(--color-border)] rounded-3xl p-6 md:p-10 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)] flex items-center gap-2">
                <span className="w-1 h-8 bg-[var(--color-primary)] rounded-full"></span>
                About {tool.name}
              </h2>
              <div className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed">
                <p className="mb-6 text-lg">
                  {tool.description}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              
              <div className="mt-10 pt-10 border-t border-[var(--color-border)]">
                <h3 className="text-xl font-bold mb-6 text-[var(--color-text-primary)]">Key Features</h3>
                <ul className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)] bg-[var(--color-surface)]/50 p-4 rounded-xl border border-[var(--color-border)]">
                      <div className="mt-1 bg-[var(--color-primary)]/20 p-1.5 rounded-full">
                        <Check size={14} className="text-[var(--color-primary)]" />
                      </div>
                      <span>Feature point {i} description goes here. Detailed enough to explain the benefit.</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tool.tags && tool.tags.length > 0 && (
                <div className="mt-10 pt-10 border-t border-[var(--color-border)]">
                  <h3 className="text-xl font-bold mb-6 text-[var(--color-text-primary)]">Common Use Cases</h3>
                  <div className="flex flex-wrap gap-3">
                    {tool.tags.map((tag, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-2 rounded-xl text-sm text-[var(--color-text-secondary)]">
                        <Sparkles size={14} className="text-[var(--color-primary)]" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-panel border border-[var(--color-border)] rounded-3xl p-6 md:p-8 sticky top-28 shadow-xl">
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={i < Math.floor(tool.rating) ? "fill-[var(--color-accent)] text-[var(--color-accent)]" : "text-[var(--color-text-muted)] opacity-30"} 
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-[var(--color-text-primary)] ml-2">{tool.rating}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      btn.classList.toggle('text-[var(--color-primary)]');
                      btn.classList.toggle('border-[var(--color-primary)]');
                      btn.classList.toggle('bg-[var(--color-primary)]/10');
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 hover:bg-[var(--color-surface)] rounded-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]"
                    title="Upvote"
                    aria-label={`Upvote ${tool.name}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    <span className="font-bold">{Math.floor(tool.rating * 123)}</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      // Could add a toast here
                    }}
                    className="flex items-center justify-center min-h-[44px] min-w-[44px] hover:bg-[var(--color-surface)] rounded-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]"
                    title="Share"
                    aria-label={`Share ${tool.name}`}
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <a 
                href={tool.url && tool.url !== '#' ? tool.url : `https://www.google.com/search?q=${encodeURIComponent(tool.name + ' AI Tool')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary w-full flex justify-center items-center gap-2 mb-6 py-4 text-lg shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 rounded-xl"
              >
                Visit Website <ExternalLink size={18} />
              </a>

              <div className="space-y-5">
                <div className="flex justify-between items-center text-sm py-3 border-b border-[var(--color-border)] border-dashed">
                  <span className="text-[var(--color-text-secondary)]">Category</span>
                  <span className="text-[var(--color-primary)] font-medium flex items-center gap-1.5 bg-[var(--color-primary)]/10 px-3 py-1 rounded-lg border border-[var(--color-primary)]/20">
                    <Tag size={14} /> {tool.category}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm py-3 border-b border-[var(--color-border)] border-dashed">
                  <span className="text-[var(--color-text-secondary)]">Pricing Model</span>
                  <span className={`font-medium px-3 py-1 rounded-lg border ${
                    tool.pricing === 'Free' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    tool.pricing === 'Paid' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>{tool.pricing}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-3 border-b border-[var(--color-border)] border-dashed">
                  <span className="text-[var(--color-text-secondary)]">Website</span>
                  <a 
                    href={tool.url && tool.url !== '#' ? tool.url : `https://www.google.com/search?q=${encodeURIComponent(tool.name + ' AI Tool')}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[var(--color-primary)] hover:underline flex items-center gap-1"
                  >
                    <Globe size={14} /> {tool.url && tool.url !== '#' ? new URL(tool.url).hostname : 'Search on Google'}
                  </a>
                </div>
                <div className="flex justify-between items-center text-sm py-3">
                  <span className="text-[var(--color-text-secondary)]">Last Updated</span>
                  <span className="text-[var(--color-text-primary)] font-medium">Today</span>
                </div>
                
                {tool.tags && tool.tags.length > 0 && (
                  <div className="pt-6 border-t border-[var(--color-border)]">
                    <span className="text-[var(--color-text-secondary)] text-xs font-bold uppercase tracking-wider block mb-4">Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-[var(--color-surface)] text-[var(--color-text-secondary)] px-3 py-1.5 rounded-md border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-[var(--color-border)] mt-2">
                  <span className="text-[var(--color-text-secondary)] text-xs font-bold uppercase tracking-wider block mb-4">Share</span>
                  <div className="flex gap-3">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${tool.name} on AIMasterTools!`)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/20 rounded-lg py-2 flex justify-center items-center transition-all hover:scale-105"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={18} />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/20 rounded-lg py-2 flex justify-center items-center transition-all hover:scale-105"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/20 rounded-lg py-2 flex justify-center items-center transition-all hover:scale-105"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sponsored Tool Widget */}
            {!isPro && (
              <div className="glass-panel border border-[var(--color-primary)]/30 rounded-3xl p-6 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider border-b border-l border-[var(--color-primary)]/30">
                  Sponsored
                </div>
                <div className="absolute -left-10 -top-10 w-32 h-32 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
                
                <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-[var(--color-accent)]" /> Featured Tool
                </h2>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=100" alt="Sponsored AI Tool" width="48" height="48" decoding="async" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)] text-sm">NexusAI Pro</h3>
                    <div className="flex items-center gap-1 text-[10px] text-[var(--color-text-secondary)] mt-1">
                      <Star size={10} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                      <span>4.9 (2k+ reviews)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-[var(--color-text-secondary)] mb-5 line-clamp-2">
                  Automate your entire workflow with next-generation AI agents. Try it free for 14 days.
                </p>
                
                <a href="#" className="w-full py-2.5 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all text-sm font-bold flex items-center justify-center gap-2">
                  Try NexusAI Free <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-[var(--color-text-primary)] flex items-center gap-3">
                  <Sparkles className="text-[var(--color-accent)]" /> 
                  Related <span className="text-gradient">Tools</span>
                </h2>
                <p className="text-[var(--color-text-secondary)] mt-2">
                  Discover other AI tools similar to {tool.name}
                </p>
              </div>
              <Link to={`/?category=${tool.category}`} className="text-[var(--color-primary)] hover:underline font-semibold flex items-center gap-2">
                View all {tool.category} <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedTools.map((relatedTool) => (
                <ToolCard 
                  key={relatedTool.id} 
                  tool={relatedTool} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ToolDetail;

