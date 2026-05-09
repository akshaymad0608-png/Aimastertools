import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check, ChevronUp } from 'lucide-react';
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

  return (
    <div className="group relative flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-lg hover:-translate-y-[2px] transition-all gap-4">
      
      <div className="flex flex-1 items-start gap-5 w-full">
        {/* Logo Container */}
        <div className="relative shrink-0 text-decoration-none">
          <Link to={`/tool/${tool.id}`} className="block w-14 h-14 bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-0.5 z-0 transition-transform group-hover:scale-105">
            <ToolLogo domain={tool.domain} brandColor={tool.brandColor} name={tool.name} className="w-full h-full" />
          </Link>
          {/* Blue Checkmark */}
          <div className="absolute -top-1.5 -right-1.5 bg-blue-500 rounded-full text-white p-[3px] border-2 border-white z-10 flex items-center justify-center shadow-sm pointer-events-none">
            <Check size={10} strokeWidth={4} />
          </div>
        </div>

        {/* Title, Description, Tags */}
        <div className="flex flex-col justify-center min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <Link to={`/tool/${tool.id}`} className="block group-hover:text-blue-600 transition-colors truncate">
              <h3 className="text-[20px] font-extrabold text-slate-800 leading-tight tracking-tight truncate">{tool.name}</h3>
            </Link>
          </div>
          <p className="text-[15px] text-slate-500 line-clamp-1 mb-3">
            {tool.description}
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <Link to={`/?category=${tool.category.toLowerCase()}`} className="text-[14px] text-[#5cb3ff] hover:text-blue-500 transition-colors font-medium lowercase whitespace-nowrap">
              #{tool.category.replace(/\s+/g, '-').toLowerCase()}
            </Link>
            {tool.tags?.slice(0, 2).map((tag, i) => (
              <Link to={`/?tag=${tag.toLowerCase()}`} key={i} className="text-[14px] text-[#5cb3ff] hover:text-blue-500 transition-colors font-medium lowercase whitespace-nowrap">
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons on the Right */}
      <div className="flex items-center justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(tool.id);
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] h-[56px] rounded-xl border transition-colors ${
            isBookmarked 
              ? 'border-blue-200 bg-blue-50 text-blue-600' 
              : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 shadow-sm hover:shadow'
          }`}
        >
          <Bookmark size={18} className={`mb-0.5 mt-0.5 ${isBookmarked ? 'fill-blue-600' : ''}`} strokeWidth={isBookmarked ? 2.5 : 2} />
          <span className="text-[12px] font-bold leading-none">{isBookmarked ? saveCount + 1 : saveCount}</span>
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsUpvoted(!isUpvoted);
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] h-[56px] rounded-xl border transition-colors ${
            isUpvoted
              ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
              : 'border-emerald-100 bg-white hover:border-emerald-200 hover:bg-emerald-50 text-emerald-500 shadow-sm hover:shadow'
          }`}
        >
          <ChevronUp size={20} className={`mb-0 mt-0.5 ${isUpvoted ? 'text-emerald-600' : 'text-emerald-500'}`} strokeWidth={isUpvoted ? 3.5 : 2.5} />
          <span className="text-[12px] font-bold leading-none">{isUpvoted ? upvoteCount + 1 : upvoteCount}</span>
        </button>
      </div>

    </div>
  );
};

export default ToolCard;
