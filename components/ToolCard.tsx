import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check, ChevronUp, Star, ExternalLink } from 'lucide-react';
import { Tool } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import ToolLogo from './ToolLogo';

interface ToolCardProps {
  tool: Tool;
  rank?: number;
  priority?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, rank, priority = false }) => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [isUpvoted, setIsUpvoted] = useState(false);
  
  // Generate a consistent save count and upvote count
  const saveCount = Math.floor(tool.rating * tool.id.charCodeAt(0) * 1.5) || Math.floor(tool.rating * 153);
  const upvoteCount = saveCount;
  
  const isBookmarked = bookmarks.includes(tool.id);

  const pricingColors: Record<string, string> = {
    'Free': 'bg-green-100 text-green-700 border-green-200',
    'Freemium': 'bg-blue-100 text-blue-700 border-blue-200',
    'Paid': 'bg-gray-100 text-gray-700 border-gray-200',
    'Usage Based': 'bg-purple-100 text-purple-700 border-purple-200',
    'Open Source': 'bg-orange-100 text-orange-700 border-orange-200'
  };

  const pricingClass = pricingColors[tool.pricing] || pricingColors['Freemium'];

  return (
    <div className="group relative flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgb(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-[2px] transition-all gap-4 overflow-hidden" style={{ borderLeft: `4px solid ${tool.brandColor || '#534AB7'}` }}>
      
      <div className="flex flex-1 items-start gap-5 w-full">
        {/* Logo Container */}
        <div className="relative shrink-0 text-decoration-none">
          <Link to={`/tool/${tool.id}`} className="block w-14 h-14 bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-0.5 z-0 transition-transform group-hover:scale-105">
            <ToolLogo domain={tool.domain} brandColor={tool.brandColor} name={tool.name} className="w-full h-full" />
          </Link>
          {/* Blue Checkmark */}
          {tool.featured && (
            <div className="absolute -top-1.5 -right-1.5 bg-blue-500 rounded-full text-white p-[3px] border-2 border-white z-10 flex items-center justify-center shadow-sm pointer-events-none">
              <Check size={10} strokeWidth={4} />
            </div>
          )}
        </div>

        {/* Title, Description, Tags */}
        <div className="flex flex-col justify-center min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Link to={`/tool/${tool.id}`} className="block group-hover:text-blue-600 transition-colors truncate max-w-full">
              <h3 className="text-[20px] font-extrabold text-slate-800 leading-tight tracking-tight truncate">{tool.name}</h3>
            </Link>
            <div className="flex items-center bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-full">
              <Star size={12} className="text-amber-500 fill-amber-500 mr-1" />
              <span className="text-[11px] font-bold text-amber-700">{tool.rating.toFixed(1)}</span>
            </div>
            <div className={`px-2 py-0.5 text-[11px] font-semibold border rounded-full ${pricingClass}`}>
              {tool.pricing}
            </div>
          </div>
          <p className="text-[14px] text-slate-500 line-clamp-2 sm:line-clamp-1 mb-3">
            {tool.description}
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <Link to={`/?category=${tool.category.toLowerCase()}`} className="text-[12px] text-[#5cb3ff] hover:text-blue-500 transition-colors font-medium lowercase whitespace-nowrap">
              #{tool.category.replace(/\s+/g, '-').toLowerCase()}
            </Link>
            {tool.tags?.slice(0, 2).map((tag, i) => (
              <Link to={`/?tag=${tag.toLowerCase()}`} key={i} className="text-[12px] text-[#5cb3ff] hover:text-blue-500 transition-colors font-medium lowercase whitespace-nowrap">
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons on the Right */}
      <div className="flex items-center justify-end gap-2 w-full sm:w-auto mt-3 sm:mt-0 shrink-0 relative transition-transform">
        <div className="flex gap-2 sm:group-hover:opacity-0 transition-opacity duration-300">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark(tool.id);
            }}
            className={`flex flex-col items-center justify-center min-w-[44px] h-[44px] rounded-xl border transition-colors ${
              isBookmarked 
                ? 'border-blue-200 bg-blue-50 text-blue-600' 
                : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 shadow-sm hover:shadow'
            }`}
          >
            <Bookmark size={16} className={`mb-[1px] ${isBookmarked ? 'fill-blue-600' : ''}`} strokeWidth={isBookmarked ? 2.5 : 2} />
            <span className="text-[10px] font-bold leading-none">{isBookmarked ? saveCount + 1 : saveCount}</span>
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsUpvoted(!isUpvoted);
            }}
            className={`flex flex-col items-center justify-center min-w-[44px] h-[44px] rounded-xl border transition-colors ${
              isUpvoted
                ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                : 'border-emerald-100 bg-white hover:border-emerald-200 hover:bg-emerald-50 text-emerald-500 shadow-sm hover:shadow'
            }`}
          >
            <ChevronUp size={18} className={`mb-[1px] ${isUpvoted ? 'text-emerald-600' : 'text-emerald-500'}`} strokeWidth={isUpvoted ? 3.5 : 2.5} />
            <span className="text-[10px] font-bold leading-none">{isUpvoted ? upvoteCount + 1 : upvoteCount}</span>
          </button>
        </div>
        
        {/* Visit Site Button (Slide in on Hover) */}
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute right-0 opacity-0 group-hover:opacity-100 sm:translate-x-4 sm:group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center justify-center pointer-events-none group-hover:pointer-events-auto"
        >
          <div className="flex items-center gap-1.5 h-[44px] px-4 rounded-xl bg-[#534AB7] hover:bg-[#433b9b] text-white shadow-sm transition-colors text-sm font-semibold">
            Visit Site
            <ExternalLink size={14} />
          </div>
        </a>
      </div>

    </div>
  );
};

export default ToolCard;
