import React from 'react';
import { Link } from 'react-router-dom';
import { X, Columns2, ArrowRight } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { MOCK_TOOLS } from '../data/tools';

/**
 * A tray that follows you while you browse, holding what you have picked.
 *
 * The comparison pages were the strongest thing this directory owns and the
 * hardest thing to reach: to compare two tools you had to leave whatever you
 * were reading, open /compare, and find both again in a picker. Picking them
 * where you see them is the whole feature.
 *
 * It hands off through `?tools=a,b,c`, which /compare already parses on mount,
 * so nothing about that page had to change.
 */
export const CompareTray: React.FC = () => {
  const { compare, removeCompare, clearCompare, max } = useCompare();

  if (compare.length === 0) return null;

  const picked = compare
    .map((id) => MOCK_TOOLS.find((t) => t.id === id))
    .filter((t): t is (typeof MOCK_TOOLS)[number] => Boolean(t));

  // An id in storage whose tool has since been removed should not strand the
  // tray with a slot that cannot be cleared.
  if (picked.length === 0) return null;

  const ready = picked.length >= 2;

  return (
    <div
      role="region"
      aria-label="Tools picked for comparison"
      className="fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] md:bottom-5"
    >
      <div className="container-custom">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-[var(--color-border-strong)] bg-[var(--color-elevated)] px-4 py-3 shadow-[var(--shadow-lift)] md:rounded-[var(--radius-md)] md:border">
          <p className="label-mono shrink-0">
            <span className="tabular-nums">{picked.length}</span> of{' '}
            <span className="tabular-nums">{max}</span> picked
          </p>

          <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {picked.map((tool) => (
              <li key={tool.id}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cardBg)] py-1 pl-3 pr-1 text-[13px] text-[var(--color-text-primary)]">
                  <span className="max-w-[10rem] truncate">{tool.name}</span>
                  <button
                    type="button"
                    onClick={() => removeCompare(tool.id)}
                    aria-label={`Remove ${tool.name} from the comparison`}
                    className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
                  >
                    <X size={12} aria-hidden="true" />
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="h-9 rounded-[var(--radius-sm)] px-3 text-[13px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
            >
              Clear
            </button>
            {ready ? (
              <Link
                to={`/compare?tools=${picked.map((t) => t.id).join(',')}`}
                className="btn-primary h-9 whitespace-nowrap px-4 text-[13px]"
              >
                Compare {picked.length} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ) : (
              /* Not a disabled button — a disabled control that never explains
                 itself is just a dead end. */
              <span className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border-strong)] px-4 text-[13px] text-[var(--color-text-secondary)]">
                <Columns2 size={14} aria-hidden="true" /> Pick one more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareTray;
