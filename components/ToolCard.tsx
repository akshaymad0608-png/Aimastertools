import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, Bookmark, ArrowRight, Share2, Check } from 'lucide-react';
import { Tool } from '../types';
import { useBookmarks } from '../context/BookmarkContext';

interface ToolCardProps {
  tool: Tool;
  rank?: number;
  priority?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, rank, priority = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/tool/${tool.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const bookmarked = isBookmarked(tool.id);

  // Check if tool is new (added in the last 30 days)
  const isNew = () => {
    const addedDate = new Date(tool.dateAdded);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - addedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <div className="group relative flex flex-col h-full glass-panel rounded-2xl border border-[var(--color-border)] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:-translate-y-2 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-cardBg)]/90">
      {/* Rank Badge */}
      {rank && (
        <div className="absolute top-4 left-4 z-20 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg border border-white/10 backdrop-blur-md">
          #{rank} Trending
        </div>
      )}

      {/* New Badge */}
      {!rank && isNew() && (
        <div className="absolute top-4 left-4 z-20 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg border border-white/10 backdrop-blur-md animate-pulse">
          New
        </div>
      )}

      {/* Action Buttons (Bookmark & Share & Upvote) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex gap-1.5 sm:gap-2">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Simulate upvote
            const btn = e.currentTarget;
            btn.classList.toggle('text-[var(--color-primary)]');
            btn.classList.toggle('border-[var(--color-primary)]');
            btn.classList.toggle('bg-[var(--color-primary)]/10');
          }}
          className="flex items-center gap-1 px-2 py-1 bg-[var(--color-cardBg)]/80 backdrop-blur-md rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-all border border-[var(--color-border)] hover:border-[var(--color-primary)]"
          title="Upvote"
          aria-label={`Upvote ${tool.name}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          <span className="text-xs font-bold">{Math.floor(tool.rating * 123)}</span>
        </button>
        <button 
          onClick={handleShare}
          className="p-2 bg-[var(--color-cardBg)]/80 backdrop-blur-md rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-all border border-[var(--color-border)] hover:border-[var(--color-primary)]"
          title="Copy Link"
          aria-label={`Copy link for ${tool.name}`}
        >
          {isCopied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(tool.id);
          }}
          className="p-2 bg-[var(--color-cardBg)]/80 backdrop-blur-md rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-all border border-[var(--color-border)] hover:border-[var(--color-primary)]"
          title="Bookmark"
          aria-label={bookmarked ? `Remove ${tool.name} from bookmarks` : `Bookmark ${tool.name}`}
        >
          <Bookmark size={16} className={bookmarked ? "fill-[var(--color-primary)] text-[var(--color-primary)]" : ""} />
        </button>
      </div>

      {/* Image Section */}
      <div className="relative w-full aspect-video overflow-hidden bg-[var(--color-cardBg)] border-b border-[var(--color-border)]">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-cardBg)] to-transparent opacity-60 z-10"></div>
        <img 
          src={tool.imageUrl} 
          alt={tool.name} 
          width="400"
          height="208"
          decoding="async"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
        
        {/* Pricing Badge */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
          <span className={`px-3 py-1 text-xs font-bold rounded-md border backdrop-blur-md ${
            tool.pricing === 'Free' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
            tool.pricing === 'Paid' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
            'bg-amber-500/20 text-amber-400 border-amber-500/30'
          }`}>
            {tool.pricing}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-4 sm:p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider">
             <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></span>
             {tool.category}
          </div>
          <div className="flex items-center gap-1 bg-[var(--color-surface)] px-2 py-0.5 rounded-md border border-[var(--color-border)]">
            <Star size={12} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
            <span className="text-xs font-bold text-[var(--color-text-primary)]">{tool.rating}</span>
          </div>
        </div>

        <Link to={`/tool/${tool.id}`} className="block group-hover:text-[var(--color-primary)] transition-colors">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 line-clamp-1">{tool.name}</h3>
        </Link>
        
        <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-2 leading-relaxed flex-grow">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {tool.tags?.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-xs bg-[var(--color-surface)] text-[var(--color-text-muted)] px-2.5 py-1 rounded-md border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors">
              {tag}
            </span>
          ))}
          {tool.tags && tool.tags.length > 2 && (
            <span className="text-xs text-[var(--color-text-muted)] px-1 py-1">+ {tool.tags.length - 2}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--color-border)]">
          <Link 
            to={`/tool/${tool.id}`}
            className="p-2.5 rounded-lg text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
            aria-label="View Details"
          >
            <ArrowRight size={18} />
          </Link>
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-center text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 group/btn"
          >
            Visit Website <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
