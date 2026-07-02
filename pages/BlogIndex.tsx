import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { BLOG_POSTS as blogPosts } from '../data/blogs';
import SEO from '../components/SEO';
import { BlogCoverImage } from '../components/BlogCoverImage';

// Elegant responsive Category badges matching central color mapping
const CategoryBadge = ({ label }: { label: string }) => (
  <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-md bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/20 uppercase tracking-widest shadow-sm">
    {label}
  </span>
);

const BlogIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Curated premium mock authors for maximum design consistency
  const getAuthorByPostId = (idStr: string) => {
    const id = parseInt(idStr) || 1;
    const list = [
      { name: "Akshay Mahajan", initials: "AM", role: "Founder & Lead", bg: "bg-blue-500/10 text-blue-500 ring-blue-500/20" },
      { name: "Sarah Collins", initials: "SC", role: "AI Strategist", bg: "bg-rose-500/10 text-rose-500 ring-rose-500/20" },
      { name: "Arjun Mehta", initials: "AM", role: "NLP Engineer", bg: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" },
      { name: "Lina Vance", initials: "LV", role: "UX Designer", bg: "bg-violet-500/10 text-violet-500 ring-violet-500/20" },
      { name: "Marcus Thorne", initials: "MT", role: "Cloud Architect", bg: "bg-amber-500/10 text-amber-500 ring-amber-500/20" },
    ];
    return list[id % list.length];
  };

  return (
    <div className="pt-32 pb-16 md:pt-40 lg:pt-44 md:pb-24 min-h-screen bg-[var(--color-background)]">
      <SEO 
        title="AI Master Tools Blog - Insights, Guides & Prompt Engineering" 
        description="Stay updated with the latest in AI, tool reviews, and prompt engineering tutorials by Akshay Mahajan." 
        keywords={["ai blog", "prompt engineering", "ai tool reviews", "best ai tools", "free ai tools", "ai tools list", "ai for video creation"]}
      />
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb Trail */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] font-medium transition-colors mb-6 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2.5 mb-2.5 text-xs font-black uppercase tracking-widest text-[var(--color-primary)] font-mono">
            <BookOpen size={14} />
            <span>AIMasterTools Knowledge Cloud</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight">
            AI Insights & Guides
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl font-medium">
            Deep dives, tutorials, and the latest news in AI tools and prompt engineering curated weekly.
          </p>
        </div>

        {/* Improved Premium 3-Column Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const author = getAuthorByPostId(post.id);
            return (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug || post.id}`}
                className="group flex flex-col bg-[var(--color-cardBg)] rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                {/* Visual Cover fallbacks based on category with Zoom Effect */}
                <div className="relative w-full overflow-hidden shrink-0">
                  <BlogCoverImage 
                    category={post.category} 
                    title={post.title} 
                    imageUrl={(post as any).imageUrl}
                    variant="card"
                    alt={post.title}
                  />
                  
                  {/* Subtle date tag watermark */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/50 backdrop-blur-md px-2 py-1 rounded text-[9.5px] font-bold text-white/90">
                    {post.date}
                  </div>
                </div>

                {/* Card Content parameters */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <CategoryBadge label={post.category} />
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)]">
                      <Clock size={12} />
                      <span>{post.readTime || '5 min read'}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors tracking-tight leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* High Quality Author Block & Action triggers */}
                  <div className="flex items-center justify-between border-t border-[var(--color-border)]/60 pt-4 mt-auto">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ring-2 ring-current/10 ${author.bg} flex items-center justify-center font-bold text-xs`}>
                        {author.initials}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--color-text-primary)]">{author.name}</div>
                        <div className="text-[9.5px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{author.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] group-hover:translate-x-1 duration-200 transition-transform">
                      <span>Read</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;
