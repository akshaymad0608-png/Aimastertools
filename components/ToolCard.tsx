import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check, Star, ExternalLink, Share2 } from 'lucide-react';
import { Tool } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import ToolLogo from './ToolLogo';
import { motion } from 'framer-motion';

interface ToolCardProps {
  tool: Tool;
  rank?: number;
  priority?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, rank, priority = false }) => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [copyFeedback, setCopyFeedback] = useState(false);
  
  const isBookmarked = bookmarks.includes(tool.id);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/tool/${tool.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: `Check out ${tool.name} on AI Master Tools!`,
          url: url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed', err);
        }
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const pricingColors: Record<string, string> = {
    'Free': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400',
    'Freemium': 'bg-blue-500/10 text-blue-500 border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400',
    'Paid': 'bg-rose-500/10 text-rose-500 border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400',
    'Usage Based': 'bg-purple-500/10 text-purple-500 border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400',
    'Open Source': 'bg-amber-500/10 text-amber-500 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400'
  };

  const pricingClass = pricingColors[tool.pricing] || pricingColors['Freemium'];

  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col md:flex-row items-stretch md:items-center bg-[var(--color-cardBg)] rounded-[20px] border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)]/40 transition-colors gap-5 overflow-hidden shadow-sm"
      style={{ borderLeft: `5px solid ${tool.brandColor || 'var(--color-primary)'}` }}
    >
      
      {/* Tool logo and meta information */}
      <div className="flex flex-1 items-start gap-4.5 w-full min-w-0">
        
        {/* Logo container block with subtle glows and checkmark */}
        <div className="relative shrink-0">
          <Link 
            to={`/tool/${tool.id}`} 
            className="block w-14 h-14 sm:w-16 sm:h-16 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden flex items-center justify-center p-0.5 z-0 transition-transform group-hover:scale-105"
          >
            <ToolLogo domain={tool.domain} brandColor={tool.brandColor} name={tool.name} className="w-full h-full" />
          </Link>
          
          {tool.featured && (
            <div className="absolute -top-1.5 -right-1.5 bg-blue-600 rounded-full text-white p-[3px] border-2 border-[var(--color-cardBg)] z-10 flex items-center justify-center shadow-lg pointer-events-none animate-pulse">
              <Check size={9} strokeWidth={4} />
            </div>
          )}
        </div>

        {/* Dynamic Title, description, rating and category rows */}
        <div className="flex flex-col flex-1 min-w-0">
          
          {/* Header Row: Title, pricing badge, rating capsule */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <Link to={`/tool/${tool.id}`} className="block group-hover:text-[var(--color-primary)] transition-colors truncate max-w-full">
              <h3 className="text-[18px] sm:text-[20px] font-black text-[var(--color-text-primary)] leading-tight tracking-tight truncate flex items-center gap-2">
                {rank && rank <= 3 && (
                  <span className="inline-block bg-gradient-to-r from-orange-500 through-red-500 to-pink-500 text-transparent bg-clip-text font-black text-[16px] italic pr-0.5">#{rank}</span>
                )}
                {tool.name}
              </h3>
            </Link>
            
            {/* Rating cap */}
            <div className="flex items-center bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full select-none">
              <Star size={11} className="text-amber-500 fill-amber-500 mr-1" />
              <span className="text-[11px] font-bold text-amber-500">{tool.rating.toFixed(1)}</span>
            </div>
            
            {/* Pricing Tag */}
            <div className={`px-2 py-0.5 text-[11px] font-bold border rounded-full uppercase tracking-wider ${pricingClass}`}>
              {tool.pricing}
            </div>
          </div>

          {/* Description Block */}
          <p className="text-[14px] text-[var(--color-text-secondary)] line-clamp-2 md:line-clamp-1 mb-3.5 leading-relaxed">
            {tool.description}
          </p>

          {/* Footer Interactive tags */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link 
              to={`/?category=${tool.category.toLowerCase()}`} 
              className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 transition-colors"
            >
              {tool.category}
            </Link>
            
            {tool.tags?.slice(0, 2).map((tag, i) => (
              <Link 
                to={`/?tag=${tag.toLowerCase()}`} 
                key={i} 
                className="text-xs text-blue-500 hover:text-[var(--color-primary)] font-semibold lowercase transition-colors"
              >
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Button cluster on the right */}
      <div className="flex items-center justify-between md:justify-end gap-2.5 w-full md:w-auto shrink-0 relative md:overflow-visible border-t border-[var(--color-border)]/50 pt-3 md:pt-0 md:border-t-0">
        
        {/* Bookmark and Share action strip */}
        <div className="flex gap-2.5 md:group-hover:opacity-0 md:group-hover:pointer-events-none transition-all duration-300">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark(tool.id);
            }}
            className={`flex items-center justify-center w-11 h-11 rounded-xl border transition-all cursor-pointer ${
              isBookmarked 
                ? 'border-blue-500/20 bg-blue-500/10 text-blue-500' 
                : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-cardBg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shadow-sm'
            }`}
            title="Bookmark Tool"
          >
            <Bookmark size={17} className={`${isBookmarked ? 'fill-blue-500' : ''}`} strokeWidth={isBookmarked ? 2.5 : 2} />
          </button>
          
          <button 
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-cardBg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shadow-sm cursor-pointer transition-colors"
            title="Share Tool"
          >
            {copyFeedback ? (
              <Check size={17} className="text-emerald-500" strokeWidth={2.5} />
            ) : (
              <Share2 size={17} strokeWidth={2} />
            )}
          </button>
        </div>
        
        {/* Visit CTA button with hover sliding overlay in Desktop */}
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 md:flex-none md:absolute md:right-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-x-4 md:group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center justify-center pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto"
        >
          <div className="flex items-center justify-center gap-2 h-11 px-5 w-full md:w-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:shadow-[0_4px_15px_rgba(99,102,241,0.35)] transition-all text-sm font-bold">
            Visit Tool
            <ExternalLink size={13} />
          </div>
        </a>
      </div>

    </motion.div>
  );
};

export default ToolCard;
