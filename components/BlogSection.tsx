import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS as blogPosts } from '../data/blogs';
import { motion } from 'framer-motion';
import { 
  Clock, ArrowRight, Bot, GraduationCap, Brain, Palette, Code, Layout, Calendar 
} from 'lucide-react';

// Color and design mappings for high fidelity custom tags
const CATEGORY_COLORS: Record<string, string> = {
  "EDUCATION": "#d97706",
  "RESEARCH": "#0d9488",
  "DESIGN": "#f97316",
  "CODING": "#2563eb",
  "AI CHATBOTS": "#8b5cf6"
};

// Mini avatar styles matching the specific authors
const AUTHOR_AVATARS: Record<string, { initials: string; bg: string }> = {
  "Sarah Collins": { initials: "SC", bg: "bg-pink-500" },
  "Arjun Mehta": { initials: "AM", bg: "bg-purple-500" },
  "Lina Vance": { initials: "LV", bg: "bg-teal-500" },
  "Marcus Thorne": { initials: "MT", bg: "bg-orange-500" },
  "Akshay Mahajan": { initials: "AM", bg: "bg-purple-500" }
};

// Custom responsive sidebar thumbnail with error fallback handling
const SidebarThumbnail: React.FC<{ category: string; title: string; imageUrl?: string }> = ({
  category,
  title,
  imageUrl
}) => {
  const [error, setError] = useState(false);
  const normalizedCat = category?.toUpperCase().trim() || 'AI';

  const getFallbackConfig = (cat: string) => {
    if (cat.includes('EDUCATION')) {
      return { bg: 'bg-amber-100', icon: GraduationCap, accent: 'text-amber-700' };
    }
    if (cat.includes('RESEARCH')) {
      return { bg: 'bg-teal-100', icon: Brain, accent: 'text-teal-700' };
    }
    if (cat.includes('DESIGN')) {
      return { bg: 'bg-orange-100', icon: Palette, accent: 'text-orange-700' };
    }
    if (cat.includes('CODING')) {
      return { bg: 'bg-blue-100', icon: Code, accent: 'text-blue-700' };
    }
    return { bg: 'bg-purple-100', icon: Bot, accent: 'text-purple-700' };
  };

  const config = getFallbackConfig(normalizedCat);
  const IconComponent = config.icon;

  if (error || !imageUrl) {
    return (
      <div className={`w-[64px] h-[64px] rounded-lg relative overflow-hidden flex items-center justify-center select-none shrink-0 border border-[var(--color-border)] ${config.bg}`}>
        <IconComponent size={24} className={`${config.accent} relative z-10 opacity-70`} />
      </div>
    );
  }

  return (
    <div className="w-[64px] h-[64px] rounded-lg overflow-hidden shrink-0 relative border border-[var(--color-border)] bg-[var(--color-background)]">
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};

export const BlogSection: React.FC = () => {
  const [heroImageError, setHeroImageError] = useState(false);
  // Extract specific blog post categories to align with requested layout
  const chatbotPost = blogPosts.find(p => p.category?.toLowerCase().includes('chatbot')) || blogPosts[0];
  
  // Custom sidebar posts with their corresponding beautiful topic-related Unsplash images
  const sidebarData = [
    {
      postId: 2,
      category: "EDUCATION",
      readTime: "5 min read",
      author: "Arjun Mehta",
      date: "Apr 28, 2026",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=128&h=128&fit=crop"
    },
    {
      postId: 3,
      category: "RESEARCH",
      readTime: "8 min read",
      author: "Lina Vance",
      date: "Apr 21, 2026",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=128&h=128&fit=crop"
    },
    {
      postId: 4,
      category: "DESIGN",
      readTime: "4 min read",
      author: "Marcus Thorne",
      date: "May 1, 2026",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=128&h=128&fit=crop"
    },
    {
      postId: 5,
      category: "CODING",
      readTime: "4 min read",
      author: "Akshay Mahajan",
      date: "Apr 15, 2026",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=128&h=128&fit=crop"
    }
  ];

  // Map the static sidebar config back to our real post objects in blogs.ts
  const trendingCards = sidebarData.map(item => {
    const postFromDb = blogPosts.find(p => p.id === String(item.postId));
    return {
      ...item,
      id: item.postId,
      title: postFromDb?.title || "AI Insight Post",
      slug: postFromDb?.slug || `${item.postId}`
    };
  });

  return (
    <section id="blog" className="relative bg-slate-50 dark:bg-[#09090b] py-20">
      {/* Premium ambient backdrop glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-900/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/10 dark:bg-purple-900/20 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Latest Insights
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl leading-tight">
              <span className="text-slate-900 dark:text-white">Learn AI tools, workflows & comparisons</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
              Stay updated with expert reviews, tool comparisons, and prompt engineering tutorials.
            </p>
          </div>
          <Link 
            to="/blog" 
            className="group font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:text-blue-300 inline-flex items-center gap-1.5 shrink-0 transition"
          >
            <span>View All Insights</span>
            <span className="inline-block transition group-hover:translate-x-1 font-extrabold">→</span>
          </Link>
        </div>

        {/* Layout Grid: Left Side Featured Card + Right Side Sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* LEFT SIDE — Featured Article Card (col-span-8) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to={`/blog/${chatbotPost.slug || chatbotPost.id}`}
                className="group flex flex-col bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm hover:border-[var(--color-primary)] transition-all duration-300"
              >
                
                {/* HERO BANNER */}
                <div className="relative w-full h-[260px] sm:h-[320px] overflow-hidden flex flex-col items-center justify-center px-6 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                  {chatbotPost.imageUrl && !heroImageError ? (
                    <img src={chatbotPost.imageUrl} alt={chatbotPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" onError={() => setHeroImageError(true)} />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-text-primary) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                      <div className="relative z-10 w-24 h-24 rounded-2xl bg-[var(--color-cardBg)]/80 backdrop-blur-md border border-[var(--color-border)] flex flex-col items-center justify-center shadow-xl mb-4 group-hover:scale-110 transition-transform duration-500">
                        <Bot size={40} className="text-[var(--color-primary)] mb-2" />
                        <div className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">AI INSIGHT</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[var(--color-background)]/90 backdrop-blur-sm rounded-md border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider leading-none z-10 shadow-sm">
                    <span className="text-[var(--color-primary)] animate-pulse text-[8px]">●</span>
                    <span>FEATURED INSIGHT</span>
                  </div>
                </div>
                {/* Substantive Article Metadata and Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col bg-[var(--color-cardBg)]">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex text-[10px] font-bold px-2.5 py-1 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] uppercase tracking-widest">
                      AI CHATBOTS
                    </span>
                    <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock size={12} />
                      <span>7 MIN READ · MAY 5, 2026</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug tracking-tight mb-3">
                    <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {chatbotPost.title}
                    </span>
                  </h3>
                  
                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-6 font-medium">
                    {chatbotPost.excerpt}
                  </p>

                  {/* Sarah Collins Author Footer */}
                  <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-5 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        SC
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--color-text-primary)]">Sarah Collins</div>
                        <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">AI STRATEGIST</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm font-bold text-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-all">
                      <span>Read Insight</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>

              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE — Trending Insights Sidebar (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mt-1 mb-1 font-mono">
              Trending Insights
            </h4>
            
            {trendingCards.map((post, index) => {
              const categoryColor = CATEGORY_COLORS[post.category] || "#8b5cf6";
              const authorConfig = AUTHOR_AVATARS[post.author] || { initials: "AI", bg: "bg-slate-500" };

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Link 
                    to={`/blog/${post.slug || post.id}`}
                    className="group flex gap-4 bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-2xl p-4 shadow-sm hover:shadow-lg hover:border-[var(--color-primary)] transition-all duration-300"
                  >
                    {/* Consistent 64x64px square image thumbnail with smart error fallback */}
                    <SidebarThumbnail 
                      category={post.category} 
                      title={post.title} 
                      imageUrl={post.imageUrl} 
                    />

                    {/* Meta and Information block */}
                    <div className="flex flex-col justify-between min-w-0 flex-1">
                      <div>
                        {/* Upper row header row with custom tag colors */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span 
                            className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
                            style={{ 
                              color: categoryColor, 
                              backgroundColor: `${categoryColor}15`
                            }}
                          >
                            {post.category}
                          </span>
                          <span className="text-[10px] font-medium text-[var(--color-text-muted)] shrink-0 font-mono">
                            {post.readTime}
                          </span>
                        </div>

                        {/* Title text */}
                        <h5 className="text-[14px] sm:text-[15px] font-bold leading-snug tracking-tight mb-1 line-clamp-2">
                          <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                            {post.title}
                          </span>
                        </h5>
                      </div>

                      {/* Mini Author Row block with gradients */}
                      <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-[var(--color-border)]">
                        <div className={`w-5 h-5 rounded-full ${authorConfig.bg} text-white flex items-center justify-center font-bold text-[8px] shadow-sm`}>
                          {authorConfig.initials}
                        </div>
                        <span className="text-[10px] font-medium text-[var(--color-text-secondary)] truncate font-sans">
                          {post.author}
                        </span>
                        <span className="text-[9px] text-[var(--color-text-muted)] ml-auto shrink-0 font-mono font-medium">
                          {post.date}
                        </span>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
