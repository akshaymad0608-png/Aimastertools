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

// Mini avatar gradient styles matching the specific authors
const AUTHOR_AVATARS: Record<string, { initials: string; gradient: string }> = {
  "Sarah Collins": { initials: "SC", gradient: "from-pink-500 to-rose-600" },
  "Arjun Mehta": { initials: "AM", gradient: "from-purple-500 to-indigo-600" },
  "Lina Vance": { initials: "LV", gradient: "from-teal-400 to-cyan-600" },
  "Marcus Thorne": { initials: "MT", gradient: "from-orange-500 to-red-650" },
  "Akshay Mahajan": { initials: "AM", gradient: "from-purple-500 to-indigo-600" }
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
      return { gradient: 'from-amber-600 to-amber-900', icon: GraduationCap, accent: 'text-amber-200' };
    }
    if (cat.includes('RESEARCH')) {
      return { gradient: 'from-teal-600 to-teal-900', icon: Brain, accent: 'text-teal-200' };
    }
    if (cat.includes('DESIGN')) {
      return { gradient: 'from-orange-500 to-orange-850', icon: Palette, accent: 'text-orange-200' };
    }
    if (cat.includes('CODING')) {
      return { gradient: 'from-blue-600 to-indigo-900', icon: Code, accent: 'text-blue-200' };
    }
    return { gradient: 'from-purple-600 to-indigo-900', icon: Bot, accent: 'text-purple-200' };
  };

  const config = getFallbackConfig(normalizedCat);
  const IconComponent = config.icon;

  if (error || !imageUrl) {
    return (
      <div className="w-[64px] h-[64px] rounded-xl relative overflow-hidden flex items-center justify-center select-none shrink-0 border border-white/5 shadow-inner">
        <div className={`absolute inset-0 bg-gradient-to-tr ${config.gradient} opacity-90`} />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:6px_6px]" />
        <IconComponent size={18} className={`${config.accent} relative z-10`} />
      </div>
    );
  }

  return (
    <div className="w-[64px] h-[64px] rounded-xl overflow-hidden shrink-0 relative border border-white/10 bg-slate-950">
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
};

export const BlogSection: React.FC = () => {
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
    <section id="blog" className="relative bg-[#0d1117] py-20 dark:bg-[#0d1117]">
      {/* Premium ambient backdrop glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-widest text-purple-400">
              Latest Insights
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl leading-tight">
              <span className="text-white">Learn AI tools, workflows & comparisons</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-350">
              Stay updated with expert reviews, tool comparisons, and prompt engineering tutorials.
            </p>
          </div>
          <Link 
            to="/blog" 
            className="group font-bold text-purple-400 hover:text-purple-350 inline-flex items-center gap-1.5 shrink-0 transition"
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
                className="group flex flex-col bg-[#161b22] border border-[#30363d] rounded-[32px] overflow-hidden shadow-2xl hover:border-purple-500/40 transition-all duration-300"
              >
                
                {/* HERO BANNER with custom 135deg gradient */}
                <div className="relative w-full h-[260px] sm:h-[320px] overflow-hidden flex flex-col items-center justify-center px-6">
                  {/* Purple-to-pink gradient */}
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#2d1b8e_0%,#5a2d9e_35%,#8b1a8b_70%,#c0185c_100%)]" />
                  
                  {/* Dot Grid Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1.5px,transparent_1.5px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />
                  
                  {/* Badge & Ref Header line */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black text-white uppercase tracking-widest leading-none">
                    <span className="text-pink-500 animate-pulse text-[8px]">●</span>
                    <span>FEATURED INSIGHT</span>
                  </div>
                  <div className="absolute top-4 right-4 text-[10px] font-mono font-bold text-white/50 tracking-wider">
                    REF_0603 // 2026
                  </div>

                  {/* Center glass-morphic box & logo pill */}
                  <div className="relative flex flex-col items-center justify-center z-10 mt-6 sm:mt-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                      <Bot size={28} className="text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]" />
                    </div>
                    <span className="mt-3 px-2.5 py-0.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-black tracking-widest text-white uppercase font-mono">
                      AI CHATBOTS
                    </span>
                  </div>

                  {/* Dark technical code block bottom overlay */}
                  <div className="absolute left-4 bottom-4 right-4 bg-black/65 backdrop-blur-md rounded-xl p-3 border border-white/10 text-[10px] sm:text-[11px] font-mono text-purple-200 flex flex-col gap-0.5 shadow-xl text-left select-none">
                    <div>
                      <span className="text-pink-400 font-extrabold">assistant_id</span>: <span className="text-blue-300">"cl-2026-pro"</span>
                    </div>
                    <div>
                      <span className="text-emerald-400 font-extrabold">system_prompt</span>: <span className="text-blue-300">"act as super-intelligence..."</span>
                    </div>
                  </div>
                </div>

                {/* Substantive Article Metadata and Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col bg-[#161b22]">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex text-[10px] font-black px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-widest">
                      AI CHATBOTS
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock size={12} className="text-slate-400" />
                      <span>7 MIN READ · MAY 5, 2026</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight mb-3">
                    <span className="text-white group-hover:text-purple-400 transition-colors">
                      {chatbotPost.title}
                    </span>
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-medium">
                    {chatbotPost.excerpt}
                  </p>

                  {/* Sarah Collins Author Footer */}
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-5 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                        SC
                      </div>
                      <div>
                        <div className="text-sm font-black !text-white">Sarah Collins</div>
                        <div className="text-[10px] font-bold text-slate-350 uppercase tracking-wider">AI STRATEGIST</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm font-black text-purple-400 group-hover:text-purple-350 transition-all">
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
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mt-1 mb-1 font-mono">
              Trending Insights
            </h4>
            
            {trendingCards.map((post, index) => {
              const categoryColor = CATEGORY_COLORS[post.category] || "#8b5cf6";
              const authorConfig = AUTHOR_AVATARS[post.author] || { initials: "AI", gradient: "from-slate-650 to-slate-800" };

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="group flex gap-4 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 shadow-sm hover:shadow-lg hover:border-purple-500/30 transition-all duration-300"
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
                            className="text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded"
                            style={{ 
                              color: categoryColor, 
                              backgroundColor: `${categoryColor}15`
                            }}
                          >
                            {post.category}
                          </span>
                          <span className="text-[10px] font-bold text-slate-300 shrink-0 font-mono">
                            {post.readTime}
                          </span>
                        </div>

                        {/* Title text */}
                        <h5 className="text-[14px] sm:text-[15px] font-extrabold leading-snug tracking-tight mb-1 line-clamp-2">
                          <span className="text-white group-hover:text-purple-400 transition-colors">
                            {post.title}
                          </span>
                        </h5>
                      </div>

                      {/* Mini Author Row block with gradients */}
                      <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-slate-800/60">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${authorConfig.gradient} text-white flex items-center justify-center font-black text-[8px] shadow-sm`}>
                          {authorConfig.initials}
                        </div>
                        <span className="text-[10px] font-bold text-slate-200 truncate font-sans">
                          {post.author}
                        </span>
                        <span className="text-[9px] text-slate-400 ml-auto shrink-0 font-mono font-bold">
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
