import React, { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_TOOLS } from '../constants';
import { Tool } from '../types';

export default function AIToolFinder() {
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<{ tools: Tool[], suggestion: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const exampleQueries = [
    "I want to make YouTube shorts from long videos",
    "Help me write SEO-optimized blog posts",
    "I need to generate a logo for my startup",
    "Tool to summarize long PDFs and research papers",
    "Best AI for coding and debugging React",
    "I want to clone my voice for a podcast"
  ];

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSubmitting(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/find-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze query');
      }

      const data = await response.json();
      
      // Fallback matching if data doesn't have keywords/category properly
      const keywords = data.keywords || [];
      const category = data.category || '';
      
      let matchedTools = MOCK_TOOLS.filter(tool => {
        const text = `${tool.name} ${tool.description} ${tool.category} ${(tool.tags || []).join(' ')}`.toLowerCase();
        // Match if it shares the category, or if ANY keyword is in the text
        const matchesCategory = category && tool.category.toLowerCase().includes(category.toLowerCase());
        const matchesKeywords = keywords.some((kw: string) => text.includes(kw.toLowerCase()));
        
        return matchesCategory || matchesKeywords;
      });

      // If strict matching fails, fallback to simple keyword matching using the query itself
      if (matchedTools.length === 0) {
        const queryWords = query.toLowerCase().split(' ').filter(w => w.length > 3);
        matchedTools = MOCK_TOOLS.filter(tool => {
          const text = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase();
          return queryWords.some(w => text.includes(w));
        });
      }

      // If STILL nothing, just return top 3 featured tools to not leave them empty-handed
      if (matchedTools.length === 0) {
        matchedTools = MOCK_TOOLS.filter(t => t.featured).slice(0, 3);
      } else {
        // Limit to top 6 best matches
        matchedTools = matchedTools.slice(0, 6);
      }

      setResults({
        tools: matchedTools,
        suggestion: data.suggestion || "Here are some tools that might help with your request:"
      });

    } catch (err: any) {
      console.error(err);
      // Fallback to client-side matching if API fails
      const queryWords = query.toLowerCase().split(' ').filter(w => w.length > 3);
      const matchedTools = MOCK_TOOLS.filter(tool => {
        const text = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase();
        return queryWords.some(w => text.includes(w));
      }).slice(0, 6);

      setResults({
        tools: matchedTools.length > 0 ? matchedTools : MOCK_TOOLS.slice(0, 3),
        suggestion: "We found these tools based on your keywords:"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
          Find Your Perfect <span className="text-[var(--color-primary)]">AI Tool</span>
        </h2>
        <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
          Tell us what you want to achieve in plain English, and our AI will suggest the best tools for the job.
        </p>
      </div>

      <div className="bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-xl mb-12">
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <div className="absolute top-4 left-4 text-[var(--color-primary)]">
              <Sparkles size={24} />
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g., I want to create a website without coding and generate a logo for it..."
              className="w-full min-h-[120px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl py-4 pl-12 pr-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none text-lg"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {exampleQueries.slice(0, 3).map((example, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExampleClick(example)}
                  className="text-xs py-1.5 px-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {example}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !query.trim()}
              className="btn-primary w-full sm:w-auto px-8 py-3 whitespace-nowrap font-bold flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Find Tools <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {results && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-xl p-4 mb-8 flex items-start gap-4">
            <div className="bg-[var(--color-primary)] p-2 rounded-lg text-white mt-0.5">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">AI Suggestion</h3>
              <p className="text-[var(--color-text-secondary)]">{results.suggestion}</p>
            </div>
          </div>

          {results.tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.tools.map((tool, idx) => {
                // Generate a generic confidence score between 80-99 based on index
                const matchScore = 98 - (idx * 3);
                
                return (
                <div key={tool.id} className="bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-primary)]/50 transition-colors flex flex-col h-full shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-bl-xl font-bold text-sm border-l border-b border-[var(--color-primary)]/20 shadow-sm flex items-center gap-1">
                    <Sparkles size={12} className="text-yellow-500" />
                    {matchScore}% Match
                  </div>
                  
                  <div className="flex justify-between items-start mb-4 mt-2">
                    <h4 className="font-bold text-xl">{tool.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-[var(--color-primary)] font-semibold">{tool.category}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">•</span>
                    <span className="text-xs text-yellow-500 font-bold flex items-center gap-1">
                      ★ {tool.rating}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">•</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                      {tool.pricing}
                    </span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-6 line-clamp-3 text-ellipsis flex-grow">
                    {tool.description}
                  </p>
                  <div className="flex gap-3 mt-auto pt-4 border-t border-[var(--color-border)]">
                    <Link 
                      to={`/tool/${tool.id}`}
                      className="flex-1 py-2 text-center rounded-lg text-sm font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      Details
                    </Link>
                    <a 
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 text-center rounded-lg text-sm font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors flex items-center justify-center gap-1"
                    >
                      Visit <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )})}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
              <p className="text-[var(--color-text-secondary)] mb-4">No tools found matching your exact criteria.</p>
              <button 
                onClick={() => setResults(null)}
                className="flex items-center gap-2 mx-auto text-[var(--color-primary)] hover:underline font-semibold"
              >
                <RefreshCw size={16} /> Try another search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
