import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Tool, Category } from '../../types';
import ToolCard from '../ToolCard';

interface ExploreDirectoryProps {
  isCurationActive: boolean;
  processedToolsLength: number;
  activeTab: 'Featured' | 'Newest' | 'Trending';
  setActiveTab: (tab: 'Featured' | 'Newest' | 'Trending') => void;
  selectedPricing: string;
  setSelectedPricing: (pricing: string) => void;
  displayedTools: Tool[];
  hasMore: boolean;
  onLoadMore: () => void;
  onReset: () => void;
}

export const ExploreDirectory: React.FC<ExploreDirectoryProps> = ({
  isCurationActive,
  processedToolsLength,
  activeTab,
  setActiveTab,
  selectedPricing,
  setSelectedPricing,
  displayedTools,
  hasMore,
  onLoadMore,
  onReset
}) => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Toolbar title containing Active states and selectors */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-5 pt-4">
        <div className="text-[15px] font-bold text-[var(--color-text-primary)]">
          {isCurationActive ? (
            <div className="flex items-center gap-1.5 text-lg font-extrabold uppercase tracking-tight text-[var(--color-primary)]">
              <Sparkles size={16} />
              <span>Explore Full Database</span>
            </div>
          ) : (
            <span>Showing <span className="text-[var(--color-primary)]">{processedToolsLength}</span> matching tools</span>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-[var(--color-surface)] p-1 rounded-xl w-full sm:w-auto border border-[var(--color-border)]/65">
            {(['Featured', 'Newest', 'Trending'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg cursor-pointer transition-colors ${activeTab === tab ? 'bg-[var(--color-background)] text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <select 
            className="bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-xs sm:text-sm font-bold rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 cursor-pointer w-full sm:w-auto"
            value={selectedPricing}
            onChange={(e) => setSelectedPricing(e.target.value)}
          >
            <option value="All">All Pricing</option>
            <option value="Free">Free</option>
            <option value="Freemium">Freemium</option>
            <option value="Paid">Paid</option>
            <option value="Usage Based">Usage Based</option>
            <option value="Open Source">Open Source</option>
          </select>
        </div>
      </div>

      {/* List block rendering */}
      <div className="flex flex-col gap-4">
        {displayedTools.length > 0 ? (
          displayedTools.map((tool, index) => (
            <div
              key={`explore-${tool.id}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.02}s`, animationFillMode: 'both' }}
            >
              <ToolCard 
                tool={tool} 
                rank={index + 1}
                priority={index < 4}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-[var(--color-cardBg)] rounded-3xl border border-[var(--color-border)] shadow-sm">
            <Search size={36} className="mx-auto mb-4 text-[var(--color-text-muted)] animate-bounce" />
            <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1">No matches found</p>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Try broadening your search term or updating pricing caps.</p>
            <button 
              onClick={onReset} 
              className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-sm hover:bg-[var(--color-primary)]/20 transition-all cursor-pointer"
            >
              Reset Directory
            </button>
          </div>
        )}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button 
            onClick={onLoadMore}
            className="px-8 py-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] shadow-sm text-sm text-[var(--color-text-primary)] font-bold hover:bg-[var(--color-surface)] hover:-translate-y-0.5 pointer duration-200 cursor-pointer active:scale-98 transition-all"
          >
            Load More AI Tools
          </button>
        </div>
      )}
    </div>
  );
};
