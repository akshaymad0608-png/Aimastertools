import { BlogCoverImage } from './BlogCoverImage';
import Reveal from './Reveal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS as blogPosts } from '../data/blogs';
import { 
  Clock, ArrowRight, Bot, GraduationCap, Brain, Palette, Code, Layout, Calendar 
} from 'lucide-react';

// Color and design mappings for high fidelity custom tags
/**
 * Category labels take the single accent rather than a hue each.
 *
 * Five hard-coded colours for five categories is the colour-coded template
 * look, and it fought the warm palette the moment blue and teal landed on
 * paper. It was also a standing contrast problem: each label paints on a tint
 * of its own colour, that tint follows the theme, and one value per label
 * cannot clear 4.5:1 in both — correcting amber, orange and teal for the light
 * tint (2.92, 2.57, 3.39) broke all three against the dark card.
 *
 * The tokens already solve both. The label says which category it is; it does
 * not need a colour to say it twice.
 */

// Mini avatar styles matching the specific authors
/**
 * 8px white initials on a Tailwind -500 fill: teal measured 2.42:1, orange
 * 2.89:1, purple 4.12:1. Same hues, darkened until white clears 4.5:1 on them.
 */
// Only the site's owner writes here; four invented bylines used to sit beside him.
const AUTHOR_AVATARS: Record<string, { initials: string; bg: string }> = {
"Akshay Mahajan": { initials: "AM", bg: "bg-[#9b4ee3]" }
};

/**
 * Thumbnails use the same generated cover as /blog. They previously loaded
 * Unsplash URLs that several posts shared, behind a pastel icon fallback that
 * belonged to the old palette.
 */
const SidebarThumbnail: React.FC<{ category: string; title: string; imageUrl?: string }> = ({ category, title, imageUrl }) => (
  <div className="w-[64px] h-[64px] shrink-0 overflow-hidden">
    <BlogCoverImage category={category} title={title} imageUrl={imageUrl} variant="thumbnail" alt={title} />
  </div>
);

export const BlogSection: React.FC = () => {
  // Featured card and sidebar both come straight from data/blogs.ts. This used
  // to be a hard-coded list of post ids with invented categories, read times
  // and dates that did not match the posts they linked to.
  const chatbotPost = blogPosts[0];
  const trendingCards = blogPosts
    .filter((p) => p.id !== chatbotPost?.id)
    .slice(0, 4)
    .map((p) => ({ ...p, author: 'Akshay Mahajan' }));

  return (
    <section id="blog" className="section relative overflow-hidden bg-[var(--color-background)]">
      {/* Subtle single-tone backdrop (premium — restraint over glow) */}
      <div className="absolute top-0 left-1/3 w-[520px] h-[420px] rounded-full blur-3xl pointer-events-none opacity-[0.07]" style={{ background: '#c4381c' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] dark:text-[var(--color-primary)]">
              Latest Insights
            </p>
            <h2 className="display-md text-[var(--color-text-primary)]">
              Learn AI tools, workflows &amp; comparisons
            </h2>
            <p className="mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
              Stay updated with expert reviews, tool comparisons, and prompt engineering tutorials.
            </p>
          </div>
          <Link 
            to="/blog" 
            className="group font-bold text-[var(--color-primary)] dark:text-[var(--color-primary)] hover:text-[var(--color-primary)] dark:text-[var(--color-primary)] inline-flex items-center gap-1.5 shrink-0 transition"
          >
            <span>View All Insights</span>
            <span className="inline-block transition group-hover:translate-x-1 font-semibold">→</span>
          </Link>
        </div>

        {/* Layout Grid: Left Side Featured Card + Right Side Sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* LEFT SIDE — Featured Article Card (col-span-8) */}
          <div className="lg:col-span-8">
            <Reveal>
              <Link
                to={`/blog/${chatbotPost.slug || chatbotPost.id}`}
                className="group flex flex-col bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden shadow-sm hover:border-[var(--color-primary)] transition-all duration-300"
              >
                
                {/* HERO BANNER */}
                <div className="relative w-full h-[260px] sm:h-[320px] overflow-hidden flex flex-col items-center justify-center px-6 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                  <BlogCoverImage
                    category={chatbotPost.category}
                    title={chatbotPost.title}
                    imageUrl={chatbotPost.imageUrl}
                    variant="featured"
                    alt={chatbotPost.title}
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[var(--color-background)]/90 backdrop-blur-sm rounded-md border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider leading-none z-10 shadow-sm">
                    <span className="text-[var(--color-primary)] animate-pulse text-[8px]">●</span>
                    <span>FEATURED INSIGHT</span>
                  </div>
                </div>
                {/* Substantive Article Metadata and Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col bg-[var(--color-cardBg)]">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex text-[10px] font-bold px-2.5 py-1 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] uppercase tracking-widest">
                      {chatbotPost.category}
                    </span>
                    <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock size={12} />
                      <span>{chatbotPost.readTime} · {chatbotPost.date}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold leading-snug tracking-tight mb-3">
                    <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {chatbotPost.title}
                    </span>
                  </h3>
                  
                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-6 font-medium">
                    {chatbotPost.excerpt}
                  </p>

                  {/* Author footer */}
                  <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-5 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-primary-fill)] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        AM
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--color-text-primary)]">Akshay Mahajan</div>
                        <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">FOUNDER</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm font-bold text-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-all">
                      <span>Read Insight</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>

              </Link>
            </Reveal>
          </div>

          {/* RIGHT SIDE — Trending Insights Sidebar (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h4 className="title-sm text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mt-1 mb-1 font-mono">
              Trending Insights
            </h4>
            
            {trendingCards.map((post, index) => {

              const authorConfig = AUTHOR_AVATARS[post.author] || { initials: "AI", bg: "bg-[#5f2924]" };

              return (
                <Reveal key={post.id} delay={index * 80}>
                  <Link 
                    to={`/blog/${post.slug || post.id}`}
                    className="group flex gap-4 bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 shadow-sm hover:shadow-[var(--shadow-card)] hover:border-[var(--color-primary)] transition-all duration-300"
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
                              color: 'var(--badge-text-color)',
                              backgroundColor: 'var(--color-primary-soft)'
                            }}
                          >
                            {post.category}
                          </span>
                          <span className="text-[10px] font-medium text-[var(--color-text-muted)] shrink-0 font-mono">
                            {post.readTime}
                          </span>
                        </div>

                        {/* Title text */}
                        <h5 className="title-sm text-[14px] sm:text-[15px] font-bold leading-snug tracking-tight mb-1 line-clamp-2">
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
                </Reveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
