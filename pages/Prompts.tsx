import React, { useState } from 'react';
import { Copy, Search, Tag, Sparkles, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

import { Prompt } from '../types';
import { PROMPT_LIBRARY } from '../data/prompts';

const CATEGORIES = Array.from(new Set(PROMPT_LIBRARY.map(p => p.category)));
const PLATFORMS = Array.from(new Set(PROMPT_LIBRARY.map(p => p.platform)));

export default function Prompts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = PROMPT_LIBRARY.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'All' || prompt.platform === selectedPlatform;
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen">
      <SEO 
        title="Prompt Library | AI Master Tools" 
        description="Discover our curated library of the best AI prompts for ChatGPT, Midjourney, Claude and more. Copy and paste to get better results instantly." 
      />

      <div className="container-custom mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 font-bold text-xs uppercase tracking-wider mb-4 border border-blue-500/20">
            <Sparkles size={14} /> Power Up Your AI
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-text-primary)] mb-6 tracking-tight">
            The Ultimate Prompt Library
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Copy and paste these human-tested prompts to get better results from your favorite AI tools instantly.
          </p>
        </div>

        {/* Prompt Engineering Insights */}
        <div className="mb-12 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[var(--color-text-primary)]">
            <Sparkles className="text-[var(--color-primary)]" /> Mastering Prompt Engineering
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            As a prompt engineer, you know that the quality of your input directly determines the quality of the AI's output. Below are the core frameworks used in our advanced prompt collection.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[var(--color-cardBg)] p-4 rounded-xl border border-[var(--color-border)]">
              <h3 className="font-bold mb-2">Zero-Shot vs Few-Shot</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Providing context through examples drastically reduces hallucinatory output and ensures structured responses.</p>
            </div>
             <div className="bg-[var(--color-cardBg)] p-4 rounded-xl border border-[var(--color-border)]">
              <h3 className="font-bold mb-2">Chain-of-Thought (CoT)</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Forcing the AI to explain its reasoning step-by-step before arriving at a final answer prevents logic failures.</p>
            </div>
             <div className="bg-[var(--color-cardBg)] p-4 rounded-xl border border-[var(--color-border)]">
              <h3 className="font-bold mb-2">Persona Injection</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Defining a strict role (e.g., "Senior Python Developer") primes the model's latent space for domain-specific accuracy.</p>
            </div>
             <div className="bg-[var(--color-cardBg)] p-4 rounded-xl border border-[var(--color-border)]">
              <h3 className="font-bold mb-2">The Megaprompt</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Combining Context, Goal, Role, Constraints, and Output Format into a single, highly structured modular template.</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 sm:p-6 mb-10 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={20} />
            <input 
              type="text" 
              placeholder="Search prompts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium cursor-pointer"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select 
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium cursor-pointer hidden sm:block"
            >
              <option value="All">All Platforms</option>
              {PLATFORMS.map(plat => <option key={plat} value={plat}>{plat}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map(prompt => (
              <div key={prompt.id} className="bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col shadow-sm hover:border-[var(--color-primary)]/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md text-xs font-bold text-[var(--color-text-secondary)] flex items-center gap-1">
                      <Tag size={12} /> {prompt.category}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold bg-opacity-10 
                      ${prompt.platform === 'ChatGPT' ? 'bg-green-500 text-green-500' : 
                        prompt.platform === 'Midjourney' ? 'bg-purple-500 text-purple-500' : 
                        prompt.platform === 'Claude' ? 'bg-orange-500 text-orange-500' : 
                        'bg-blue-500 text-blue-500'}`}
                    >
                      {prompt.platform}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{prompt.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 flex-grow">{prompt.description}</p>
                
                <div className="relative group">
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 pr-12 text-sm text-[var(--color-text-primary)] font-mono overflow-auto max-h-[150px] scrollbar-hide">
                    {prompt.promptText}
                  </div>
                  <button 
                    onClick={() => handleCopy(prompt.id, prompt.promptText)}
                    className="absolute top-2 right-2 p-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                    aria-label="Copy prompt"
                  >
                    {copiedId === prompt.id ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)]">
              <Search className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">No prompts found</h3>
              <p className="text-[var(--color-text-secondary)]">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
