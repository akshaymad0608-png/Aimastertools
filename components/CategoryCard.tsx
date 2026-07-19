import React from 'react';
import CategoryIcon from './CategoryIcon';

interface CategoryCardProps {
  name: string;
  icon?: string;
  bg?: string;
  color?: string;
  count?: number;
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
  onClick,
  isSelected,
  isTrending,
  description,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`group flex h-full w-[230px] snap-start flex-col rounded-[var(--radius-md)] border p-5 text-left transition-all duration-200 md:w-auto ${
        isSelected
          ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
          : 'border-[var(--color-border)] bg-[var(--color-cardBg)] shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-lift)]'
      }`}
    >
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
    </button>
  );
};

export default CategoryCard;
