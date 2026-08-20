import React from 'react';
import { Link } from 'react-router-dom';
import CategoryIcon from './CategoryIcon';

interface CategoryCardProps {
  name: string;
  icon?: string;
  bg?: string;
  color?: string;
  count?: number;
  /**
   * Where this card goes. Pass it whenever the card navigates.
   *
   * Cards that navigate used to be buttons with onClick={() => navigate(...)},
   * which is not a link: a crawler cannot follow it, middle-click and
   * open-in-new-tab do nothing, and a screen reader announces a button rather
   * than a destination. /categories rendered 48 of them and therefore had zero
   * links to any category page — which orphaned the categories, the ~624 tool
   * pages they lead to, and the alternatives pages those lead to in turn.
   *
   * Cards used as filter toggles keep onClick and stay buttons; that is a real
   * button, not a link pretending to be one.
   */
  to?: string;
  onClick?: () => void;
  isSelected?: boolean;
  isTrending?: boolean;
  description?: string;
  emoji?: string;
}

/**
 * A catalogue drawer label. The category's own colour survives on the icon
 * only — the imported pastel background fills turned the grid into a paint
 * chart and fought the bone paper.
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  color,
  count,
  to,
  onClick,
  isSelected,
  isTrending,
  description,
}) => {
  const shell = `group flex h-full w-[230px] snap-start flex-col rounded-[var(--radius-md)] border p-5 text-left transition-all duration-200 md:w-auto ${
    isSelected
      ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
      : 'border-[var(--color-border)] bg-[var(--color-cardBg)] shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-lift)]'
  }`;

  // A card that navigates is a link; a card that toggles a filter is a button.
  const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    to ? (
      <Link to={to} className={shell}>
        {children}
      </Link>
    ) : (
      <button type="button" onClick={onClick} aria-pressed={isSelected} className={shell}>
        {children}
      </button>
    );

  return (
    <Shell>
      <div className="flex items-start justify-between gap-2">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          <CategoryIcon name={name} color={color} size={19} />
        </span>
        {isTrending && <span className="badge badge-accent">Hot</span>}
      </div>

      <h3
        className={`title-sm mt-4 text-[15.5px] transition-colors ${
          isSelected
            ? 'text-[var(--color-primary)]'
            : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]'
        }`}
      >
        {name}
      </h3>

      {description && (
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-[var(--color-border)] pt-3.5 [margin-top:1rem]">
        <span className="label-mono tabular-nums">
          {count ?? 0} {count === 1 ? 'tool' : 'tools'}
        </span>
        <span
          aria-hidden="true"
          className={`text-[13px] transition-transform duration-200 group-hover:translate-x-1 ${
            isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
          }`}
        >
          &rarr;
        </span>
      </div>
    </Shell>
  );
};

export default CategoryCard;
