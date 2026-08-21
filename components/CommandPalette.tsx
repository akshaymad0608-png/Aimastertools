import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { MOCK_TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';

/**
 * Cmd/Ctrl+K from anywhere on the site.
 *
 * With 672 tools, 49 categories and a dozen sections, the fastest route to a
 * record was: get to the homepage, find the search field, type, scroll. The
 * shortcut that existed only focused the hero input, and only on the homepage —
 * on a tool page or a guide it did nothing at all.
 *
 * Deliberately not a search page. It navigates: every row is a destination,
 * Enter goes there, and it closes. Anything that needs filtering, sorting or
 * comparing still belongs in the directory.
 */

type Row =
  | { kind: 'tool'; id: string; label: string; hint: string; to: string }
  | { kind: 'category'; id: string; label: string; hint: string; to: string }
  | { kind: 'page'; id: string; label: string; hint: string; to: string };

const PAGES: Row[] = [
  { kind: 'page', id: 'p-home', label: 'Directory', hint: 'Every tool in the index', to: '/' },
  { kind: 'page', id: 'p-categories', label: 'Categories', hint: 'Browse by the job each tool does', to: '/categories' },
  { kind: 'page', id: 'p-compare', label: 'Compare two tools', hint: 'Side by side', to: '/compare' },
  { kind: 'page', id: 'p-find', label: 'Find a tool', hint: 'Answer a few questions', to: '/find' },
  { kind: 'page', id: 'p-free', label: 'Free tools', hint: 'Everything with a free tier', to: '/free' },
  { kind: 'page', id: 'p-earn', label: 'Earn online', hint: 'Ways to get paid for this', to: '/earn' },
  { kind: 'page', id: 'p-prompts', label: 'Prompts', hint: 'Ready to copy', to: '/prompts' },
  { kind: 'page', id: 'p-workflows', label: 'Workflows', hint: 'Multi-tool, step by step', to: '/workflows' },
  { kind: 'page', id: 'p-collections', label: 'Collections', hint: 'Curated sets', to: '/collections' },
  { kind: 'page', id: 'p-blog', label: 'Blog', hint: 'Guides and comparisons', to: '/blog' },
  { kind: 'page', id: 'p-bookmarks', label: 'Saved tools', hint: 'Your bookmarks', to: '/bookmarks' },
  { kind: 'page', id: 'p-about', label: 'About', hint: 'How the index is compiled', to: '/about' },
];

const LIMIT = { tool: 7, category: 4, page: 4 } as const;

export const CommandPalette: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
    returnFocusTo.current?.focus();
  }, []);

  // Built once. 672 records is small enough to scan per keystroke, but not
  // small enough to rebuild the searchable strings each time.
  const haystack = useMemo(
    () =>
      MOCK_TOOLS.map((t) => ({
        row: {
          kind: 'tool' as const,
          id: t.id,
          label: t.name,
          hint: t.category,
          to: `/tool/${t.id}`,
        },
        text: `${t.name} ${t.category} ${t.description}`.toLowerCase(),
        name: t.name.toLowerCase(),
      })),
    [],
  );

  const categoryRows = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        row: {
          kind: 'category' as const,
          id: c.id,
          label: c.name,
          hint: `${c.count} ${c.count === 1 ? 'tool' : 'tools'}`,
          to: `/category/${c.slug}`,
        },
        text: c.name.toLowerCase(),
      })),
    [],
  );

  const results: Row[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PAGES.slice(0, 6);

    // A name that starts with the query beats one that merely contains it,
    // which is the difference between typing "cla" and getting Claude or
    // getting the first tool whose description happens to say "classify".
    const tools = haystack
      .filter((h) => h.text.includes(q))
      .sort((a, b) => {
        const as = a.name.startsWith(q) ? 0 : a.name.includes(q) ? 1 : 2;
        const bs = b.name.startsWith(q) ? 0 : b.name.includes(q) ? 1 : 2;
        return as - bs;
      })
      .slice(0, LIMIT.tool)
      .map((h) => h.row);

    const cats = categoryRows.filter((c) => c.text.includes(q)).slice(0, LIMIT.category).map((c) => c.row);
    const pages = PAGES.filter((p) => p.label.toLowerCase().includes(q)).slice(0, LIMIT.page);

    return [...tools, ...cats, ...pages];
  }, [query, haystack, categoryRows]);

  useEffect(() => setActive(0), [query]);

  // Open on Cmd/Ctrl+K from anywhere, including from inside a text field —
  // that is the one shortcut people expect to work regardless of focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        returnFocusTo.current = document.activeElement as HTMLElement | null;
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (results.length ? (i + 1) % results.length : 0)); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0)); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      const row = results[active];
      if (row) { close(); navigate(row.to); }
      return;
    }
    // Nothing else can leave: the palette is the only thing on screen.
    if (e.key === 'Tab') e.preventDefault();
  };

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="presentation">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={close}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the index"
        onKeyDown={onKeyDown}
        className="absolute inset-x-3 top-[12vh] mx-auto max-w-xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-cardBg)] shadow-[var(--shadow-lift)] sm:inset-x-0"
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4">
          <Search size={17} aria-hidden="true" className="shrink-0 text-[var(--color-text-muted)]" />
          <label htmlFor="cmdk-input" className="sr-only">Search tools, categories and pages</label>
          <input
            id="cmdk-input"
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={results[active] ? `cmdk-row-${results[active].id}` : undefined}
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, categories, pages…"
            className="h-14 min-w-0 flex-1 bg-transparent text-[16px] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
          />
          <kbd className="label-mono shrink-0 rounded border border-[var(--color-border)] px-1.5 py-0.5">esc</kbd>
        </div>

        <ul id="cmdk-list" ref={listRef} role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-[14px] text-[var(--color-text-secondary)]">
              Nothing matches “{query}”.
            </li>
          )}
          {results.map((row, i) => (
            <li
              key={row.id}
              id={`cmdk-row-${row.id}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => { close(); navigate(row.to); }}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 ${
                i === active ? 'bg-[var(--color-primary-soft)]' : ''
              }`}
            >
              <span className="min-w-0">
                <span className={`block truncate text-[14.5px] font-medium ${i === active ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>
                  {row.label}
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] text-[var(--color-text-secondary)]">
                  {row.hint}
                </span>
              </span>
              {/* .label-mono is muted, which measures 4.22:1 once the row is
                  highlighted and its tint lifts the floor. --badge-text-color
                  is the value already solved against exactly that tint. */}
              <span
                className="label-mono shrink-0"
                style={i === active ? { color: 'var(--badge-text-color)' } : undefined}
              >
                {row.kind}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 border-t border-[var(--color-border)] px-4 py-2.5 text-[var(--color-text-muted)]">
          <span className="label-mono flex items-center gap-1.5">
            <ArrowUp size={11} aria-hidden="true" /><ArrowDown size={11} aria-hidden="true" /> move
          </span>
          <span className="label-mono flex items-center gap-1.5">
            <CornerDownLeft size={11} aria-hidden="true" /> open
          </span>
          <span className="label-mono ml-auto">{results.length} result{results.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
