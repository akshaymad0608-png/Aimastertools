import React, { useMemo, useState } from 'react';
import { Copy, Search, Check, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PROMPT_LIBRARY } from '../data/prompts';
import { breadcrumbSchema } from '../utils/seo';

export default function Prompts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = useMemo(
    () => ['All', ...new Set(PROMPT_LIBRARY.map((p) => p.category).filter(Boolean))],
    [],
  );
  const platforms = useMemo(
    () => ['All', ...new Set(PROMPT_LIBRARY.map((p) => p.platform).filter(Boolean))],
    [],
  );

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return PROMPT_LIBRARY.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.promptText.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesPlatform = selectedPlatform === 'All' || p.platform === selectedPlatform;
      return matchesSearch && matchesCategory && matchesPlatform;
    });
  }, [searchTerm, selectedCategory, selectedPlatform]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* clipboard blocked — the prompt text is on screen and selectable anyway */
    }
  };

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={`${PROMPT_LIBRARY.length} AI Prompts — Copy-Paste Templates for ChatGPT & Claude`}
        description="A working library of prompt templates with the full text shown, not hidden behind a signup. Filter by task and by model."
        url="/prompts"
        keywords={[
          'AI prompts',
          'ChatGPT prompts',
          'Claude prompts',
          'Midjourney prompts',
          'prompt engineering templates',
          'free AI prompts 2026',
        ]}
        schema={[breadcrumbSchema([{ label: 'Prompts', path: '/prompts' }])]}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Prompts' }]} />

        <PageHeader
          eyebrow="Prompt library"
          title={
            <>
              The tool is half of it. <em>The prompt is the rest.</em>
            </>
          }
          lede="Full prompt text, shown in the open. Copy it, edit the bracketed parts, and keep what works."
          meta={<span className="label-mono tabular-nums">{PROMPT_LIBRARY.length} prompts</span>}
        />

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="relative max-w-md">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />
            <label htmlFor="prompt-search" className="sr-only">
              Search prompts
            </label>
            <input
              id="prompt-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search prompts…"
              className="h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-cardBg)] pl-10 pr-4 text-[14px] text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="label-mono mr-1">Task</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                aria-pressed={selectedCategory === c}
                className={`link-chip ${
                  selectedCategory === c ? '!border-[var(--color-primary)] !text-[var(--color-primary)]' : ''
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="label-mono mr-1">Model</span>
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                aria-pressed={selectedPlatform === p}
                className={`link-chip ${
                  selectedPlatform === p ? '!border-[var(--color-primary)] !text-[var(--color-primary)]' : ''
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <p className="label-mono mt-5 tabular-nums">
          {filtered.length} of {PROMPT_LIBRARY.length} prompts
        </p>

        <ul className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filtered.map((prompt) => {
            const isOpen = expanded === prompt.id;
            const copied = copiedId === prompt.id;
            return (
              <li key={prompt.id} className="flex">
                <article className="card flex w-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="title-sm text-[17px] text-[var(--color-text-primary)]">
                        {prompt.title}
                      </h2>
                      <p className="label-mono mt-1.5">
                        {prompt.category} · {prompt.platform}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(prompt.id, prompt.promptText)}
                      aria-label={copied ? 'Prompt copied' : `Copy the ${prompt.title} prompt`}
                      className="btn-secondary h-9 shrink-0 px-3.5 text-[12.5px]"
                    >
                      {copied ? (
                        <>
                          <Check size={13} className="text-[var(--color-success)]" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={13} /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                    {prompt.description}
                  </p>

                  <pre
                    className="mt-4 max-h-52 overflow-auto whitespace-pre-wrap rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-[12.5px] leading-relaxed text-[var(--color-text-primary)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {prompt.promptText}
                  </pre>

                  {prompt.exampleResultText && (
                    <div className="pt-3 mt-4 border-t border-[var(--color-border)]">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : prompt.id)}
                        aria-expanded={isOpen}
                        className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--color-primary)]"
                      >
                        <ChevronDown
                          size={14}
                          aria-hidden="true"
                          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                        {isOpen ? 'Hide' : 'Show'} example output
                      </button>
                      {isOpen && (
                        <pre
                          className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border-strong)] p-4 text-[12.5px] leading-relaxed text-[var(--color-text-secondary)]"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {prompt.exampleResultText}
                        </pre>
                      )}
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] px-6 py-16 text-center">
            <p className="title-sm text-[17px] text-[var(--color-text-primary)]">No prompts match</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedPlatform('All');
              }}
              className="btn-secondary mt-5 h-10 px-5 text-[13px]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
