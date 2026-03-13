import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ExternalLink, Star, Plus, Lock } from 'lucide-react';
import { MOCK_TOOLS } from '../constants';
import { Tool } from '../types';
import SEO from '../components/SEO';
import { usePro } from '../context/ProContext';

const Compare: React.FC = () => {
  const { isPro } = usePro();
  const navigate = useNavigate();
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);

  const selectedTools = useMemo(() => {
    return selectedToolIds.map(id => MOCK_TOOLS.find(t => t.id === id)).filter(Boolean) as Tool[];
  }, [selectedToolIds]);

  const availableTools = useMemo(() => {
    if (!searchQuery) return MOCK_TOOLS.filter(t => !selectedToolIds.includes(t.id)).slice(0, 10);
    const query = searchQuery.toLowerCase();
    return MOCK_TOOLS.filter(t => 
      !selectedToolIds.includes(t.id) && 
      (t.name.toLowerCase().includes(query) || t.category.toLowerCase().includes(query))
    ).slice(0, 10);
  }, [searchQuery, selectedToolIds]);

  const handleAddTool = (id: string) => {
    if (selectedToolIds.length < 3) {
      setSelectedToolIds([...selectedToolIds, id]);
      setIsSelecting(false);
      setSearchQuery('');
    }
  };

  const handleRemoveTool = (id: string) => {
    setSelectedToolIds(selectedToolIds.filter(tId => tId !== id));
  };

  if (!isPro) {
    return (
      <>
        <SEO 
          title="Compare AI Tools | AI Master Tools" 
          description="Compare the best AI tools side-by-side. Analyze features, pricing, and ratings to find the perfect artificial intelligence software for your needs."
          keywords={["compare AI tools", "AI software comparison", "best AI tools", "AI tool features", "AI pricing comparison"]}
        />
        <div className="pt-24 pb-16 md:pt-32 md:pb-24 container-custom mx-auto px-6 relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          
          <div className="glass-panel border border-[var(--color-border)] rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"></div>
            
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-6 border border-[var(--color-primary)]/20 shadow-inner">
              <Lock size={32} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">Pro Feature Locked</h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              Side-by-side tool comparisons are exclusively available for Pro members. Upgrade your account to analyze features, pricing, and ratings of multiple AI tools at once.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/pricing')}
                className="btn-primary text-base px-8 py-3 shadow-lg shadow-[var(--color-primary)]/25"
              >
                Upgrade to Pro
              </button>
              <button 
                onClick={() => navigate('/')}
                className="btn-secondary text-base px-8 py-3"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Compare AI Tools | AI Master Tools" 
        description="Compare the best AI tools side-by-side. Analyze features, pricing, and ratings to find the perfect artificial intelligence software for your needs."
        keywords={["compare AI tools", "AI software comparison", "best AI tools", "AI tool features", "AI pricing comparison"]}
      />
      
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 container-custom mx-auto px-6 relative min-h-screen overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">Compare AI Tools</h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Select up to 3 AI tools to compare their features, pricing, and ratings side-by-side. Find the perfect solution for your workflow.
          </p>
        </div>

        {/* Selection Area */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {selectedTools.map(tool => (
              <div key={tool.id} className="glass-panel border border-[var(--color-border)] rounded-xl p-4 flex items-center gap-4 min-w-[250px] relative shadow-md">
                <button 
                  onClick={() => handleRemoveTool(tool.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                  aria-label="Remove tool"
                >
                  <X size={14} />
                </button>
                <img src={tool.imageUrl} alt={tool.name} className="w-12 h-12 rounded-lg object-cover border border-[var(--color-border)]" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)]">{tool.name}</h3>
                  <span className="text-xs text-[var(--color-text-secondary)]">{tool.category}</span>
                </div>
              </div>
            ))}

            {selectedToolIds.length < 3 && !isSelecting && (
              <button 
                onClick={() => setIsSelecting(true)}
                className="glass-panel border border-dashed border-[var(--color-primary)]/50 rounded-xl p-4 flex items-center justify-center gap-2 min-w-[250px] h-[82px] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
              >
                <Plus size={20} /> Add Tool to Compare
              </button>
            )}

            {isSelecting && (
              <div className="glass-panel border border-[var(--color-border)] rounded-xl p-4 w-full sm:min-w-[300px] relative z-20">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">Search Tools</h3>
                  <button onClick={() => setIsSelecting(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                    <X size={16} />
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="Type to search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] mb-3"
                  autoFocus
                />
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {availableTools.length > 0 ? (
                    availableTools.map(tool => (
                      <button 
                        key={tool.id}
                        onClick={() => handleAddTool(tool.id)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--color-surface)] text-sm flex items-center gap-3 transition-colors"
                      >
                        <img src={tool.imageUrl} alt="" className="w-6 h-6 rounded object-cover" referrerPolicy="no-referrer" />
                        <span className="truncate flex-grow text-[var(--color-text-primary)]">{tool.name}</span>
                        <span className="text-xs text-[var(--color-text-muted)]">{tool.category}</span>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-4 text-sm text-[var(--color-text-muted)]">No tools found.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedTools.length > 0 ? (
          <div className="glass-panel border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[var(--color-surface)]/50 border-b border-[var(--color-border)]">
                  <th className="p-6 font-semibold text-[var(--color-text-secondary)] w-1/4">Features</th>
                  {selectedTools.map(tool => (
                    <th key={tool.id} className="p-6 w-1/4 border-l border-[var(--color-border)]/50">
                      <div className="flex flex-col items-center text-center">
                        <img src={tool.imageUrl} alt={tool.name} className="w-16 h-16 rounded-xl object-cover border border-[var(--color-border)] mb-3 shadow-md" referrerPolicy="no-referrer" />
                        <h3 className="font-bold text-lg text-[var(--color-text-primary)]">{tool.name}</h3>
                      </div>
                    </th>
                  ))}
                  {/* Fill empty columns if less than 3 tools selected */}
                  {Array.from({ length: 3 - selectedTools.length }).map((_, i) => (
                    <th key={`empty-th-${i}`} className="p-6 w-1/4 border-l border-[var(--color-border)]/50"></th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]/50">
                {/* Category Row */}
                <tr className="hover:bg-[var(--color-surface)]/20 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">Category</td>
                  {selectedTools.map(tool => (
                    <td key={tool.id} className="p-6 border-l border-[var(--color-border)]/50 text-center">
                      <span className="inline-block bg-[var(--color-surface)] px-3 py-1 rounded-full text-sm border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                        {tool.category}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedTools.length }).map((_, i) => (
                    <td key={`empty-cat-${i}`} className="p-6 border-l border-[var(--color-border)]/50"></td>
                  ))}
                </tr>

                {/* Pricing Row */}
                <tr className="hover:bg-[var(--color-surface)]/20 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">Pricing Model</td>
                  {selectedTools.map(tool => (
                    <td key={tool.id} className="p-6 border-l border-[var(--color-border)]/50 text-center">
                      <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full border ${
                        tool.pricing === 'Free' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        tool.pricing === 'Paid' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {tool.pricing}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedTools.length }).map((_, i) => (
                    <td key={`empty-price-${i}`} className="p-6 border-l border-[var(--color-border)]/50"></td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr className="hover:bg-[var(--color-surface)]/20 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">Rating</td>
                  {selectedTools.map(tool => (
                    <td key={tool.id} className="p-6 border-l border-[var(--color-border)]/50 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                        <span className="font-bold text-[var(--color-text-primary)]">{tool.rating}</span>
                        <span className="text-xs text-[var(--color-text-muted)]">/ 5.0</span>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedTools.length }).map((_, i) => (
                    <td key={`empty-rating-${i}`} className="p-6 border-l border-[var(--color-border)]/50"></td>
                  ))}
                </tr>

                {/* Description Row */}
                <tr className="hover:bg-[var(--color-surface)]/20 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)] align-top">Description</td>
                  {selectedTools.map(tool => (
                    <td key={tool.id} className="p-6 border-l border-[var(--color-border)]/50 align-top">
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {tool.description}
                      </p>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedTools.length }).map((_, i) => (
                    <td key={`empty-desc-${i}`} className="p-6 border-l border-[var(--color-border)]/50"></td>
                  ))}
                </tr>

                {/* Tags Row */}
                <tr className="hover:bg-[var(--color-surface)]/20 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)] align-top">Key Features (Tags)</td>
                  {selectedTools.map(tool => (
                    <td key={tool.id} className="p-6 border-l border-[var(--color-border)]/50 align-top">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {tool.tags?.map((tag, i) => (
                          <span key={i} className="text-xs bg-[var(--color-surface)] text-[var(--color-text-muted)] px-2 py-1 rounded border border-[var(--color-border)]">
                            {tag}
                          </span>
                        ))}
                        {(!tool.tags || tool.tags.length === 0) && (
                          <span className="text-sm text-[var(--color-text-muted)]">-</span>
                        )}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedTools.length }).map((_, i) => (
                    <td key={`empty-tags-${i}`} className="p-6 border-l border-[var(--color-border)]/50"></td>
                  ))}
                </tr>

                {/* Action Row */}
                <tr className="bg-[var(--color-surface)]/30">
                  <td className="p-6"></td>
                  {selectedTools.map(tool => (
                    <td key={tool.id} className="p-6 border-l border-[var(--color-border)]/50 text-center">
                      <div className="flex flex-col gap-3">
                        <Link 
                          to={`/tool/${tool.id}`}
                          className="w-full py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
                        >
                          Read Review
                        </Link>
                        <a 
                          href={tool.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 rounded-lg text-sm font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-all flex items-center justify-center gap-2"
                        >
                          Visit Site <ExternalLink size={14} />
                        </a>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedTools.length }).map((_, i) => (
                    <td key={`empty-action-${i}`} className="p-6 border-l border-[var(--color-border)]/50"></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 glass-panel border border-[var(--color-border)] rounded-2xl">
            <div className="inline-flex p-4 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-4">
              <Check size={32} className="text-[var(--color-text-muted)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">No Tools Selected</h3>
            <p className="text-[var(--color-text-secondary)]">
              Click the "Add Tool to Compare" button above to start comparing AI tools.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Compare;
