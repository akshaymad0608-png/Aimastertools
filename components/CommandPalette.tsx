import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, X, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TOOLS } from '../constants';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Toggle with Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter tools
  const filteredTools = MOCK_TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase()) ||
    tool.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 50);

  const handleSelect = (toolId: string) => {
    navigate(`/tool/${toolId}`);
    setIsOpen(false);
  };

  // Keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredTools.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredTools.length) % filteredTools.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        handleSelect(filteredTools[selectedIndex].id);
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Mobile/Desktop) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full shadow-xl flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300 group"
        aria-label="Open Command Palette"
      >
        <Command size={24} className="group-hover:scale-110 transition-transform" />
        <span className="absolute -top-10 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Cmd + K
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
            >
              {/* Header / Input */}
              <div className="flex items-center px-4 py-4 border-b border-[var(--color-border)]">
                <Search size={20} className="text-[var(--color-text-muted)] mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search for AI tools..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
                />
                <div className="flex items-center gap-2">
                  <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                    <span className="text-[10px]">ESC</span>
                  </kbd>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-[var(--color-surface)] rounded-md transition-colors"
                  >
                    <X size={18} className="text-[var(--color-text-secondary)]" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="overflow-y-auto p-2">
                {filteredTools.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-2 py-1.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                      Suggestions
                    </div>
                    {filteredTools.map((tool, index) => (
                      <button
                        key={tool.id}
                        onClick={() => handleSelect(tool.id)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg text-left transition-colors ${
                          index === selectedIndex 
                            ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' 
                            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                        }`}
                      >
                        <div className={`p-2 rounded-md ${index === selectedIndex ? 'bg-[var(--color-primary)]/20' : 'bg-[var(--color-surface)]'}`}>
                          {tool.category === 'Coding' ? <Zap size={18} /> : 
                           tool.category === 'Image' ? <Search size={18} /> :
                           <Command size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{tool.name}</div>
                          <div className="text-xs text-[var(--color-text-muted)] truncate opacity-80">
                            {tool.description}
                          </div>
                        </div>
                        {index === selectedIndex && (
                          <ArrowRight size={16} className="opacity-50" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-[var(--color-text-muted)]">
                    <p>No tools found for "{query}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex justify-between items-center text-xs text-[var(--color-text-muted)]">
                <div className="flex gap-4">
                  <span><span className="font-bold">↑↓</span> to navigate</span>
                  <span><span className="font-bold">↵</span> to select</span>
                </div>
                <span>{MOCK_TOOLS.length} tools indexed</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
