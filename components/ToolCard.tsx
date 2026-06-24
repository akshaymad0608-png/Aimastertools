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
  layout?: 'horizontal' | 'vertical';
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, rank, priority = false, layout = 'horizontal' }) => {
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
      className={`group relative flex bg-[var(--color-cardBg)] rounded-[20px] border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)]/40 transition-colors gap-5 overflow-hidden shadow-sm ${
        layout === 'vertical' ? 'flex-col h-full' : 'flex-col md:flex-row items-stretch md:items-center'
      }`}
      style={{ borderLeft: `5px solid ${tool.brandColor || 'var(--color-primary)'}` }}
    >
      
      {/* Tool logo and meta information */}
      <div className={`flex flex-1 items-start w-full min-w-0 ${layout === 'vertical' ? 'flex-col gap-4' : 'gap-4.5'}`}>
        
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

      {/* Button cluster on the right/bottom */}
      <div className={`flex shrink-0 relative pt-3 md:pt-0 ${
        layout === 'vertical' 
          ? 'flex-col items-stretch w-full border-t border-[var(--color-border)]/50 gap-3 mt-auto' 
          : 'flex-col md:flex-row items-center justify-between md:justify-end w-full md:w-auto gap-2.5 md:overflow-visible border-t border-[var(--color-border)]/50 md:border-t-0'
      }`}>
        
        {/* Bookmark and Share action strip */}
        <div className={`flex gap-2.5 w-full ${layout === 'vertical' ? 'flex-row' : 'md:w-auto'}`}>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark(tool.id);
            }}
            className={`flex items-center justify-center w-11 h-11 shrink-0 rounded-xl border transition-all cursor-pointer ${
              isBookmarked 
                ? 'border-blue-500/20 bg-blue-500/10 text-blue-500' 
                : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-cardBg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shadow-sm'
            }`}
            title="Bookmark Tool"
          >
            <Bookmark size={17} className={`${isBookmarked ? 'fill-blue-500' : ''}`} strokeWidth={isBookmarked ? 2.5 : 2} />
          </button>
          
          <Link 
            to={`/compare?tool1=${tool.id}`}
            className={`flex-1 flex items-center justify-center gap-1.5 h-11 px-3 sm:px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-cardBg)] text-[var(--color-text-primary)] shadow-sm cursor-pointer transition-colors font-bold text-xs whitespace-nowrap ${layout !== 'vertical' ? 'md:flex-none' : ''}`}
            title="Compare Tool"
          >
            Compare
          </Link>
          
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-1.5 h-11 px-3 sm:px-4 rounded-xl bg-[var(--color-text-primary)] text-[var(--color-background)] shadow-sm hover:opacity-90 transition-all font-bold text-xs whitespace-nowrap ${layout !== 'vertical' ? 'md:flex-none' : ''}`}
          >
            Visit <ExternalLink size={13} />
          </a>
        </div>
      </div>

    </motion.div>
  );
};

export default ToolCard;
