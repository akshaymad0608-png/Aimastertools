import React from 'react';
import { ExternalLink, Columns2 } from 'lucide-react';
import type { Product, ProductCategory } from '../../types/shopping';
import { resolveAffiliateLink } from '../../lib/shopping/affiliate';
import { trackAffiliateClick } from '../../lib/shopping/analytics';

interface ProductCardProps {
  product: Product;
  category?: ProductCategory;
  /** Where the click happened, recorded with the event. */
  sourcePage?: string;
  onCompare?: (id: string) => void;
  isComparing?: boolean;
  compareDisabled?: boolean;
}

const formatPrice = (value: number, currency = 'INR') => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

/**
 * A product, rendered from whatever is actually known about it.
 *
 * Every commerce field here is conditional, and the conditions are the feature.
 * This site has no live Amazon feed, so most records will arrive with a name, a
 * category and a link and nothing else. The card handles that by showing less,
 * never by filling the gap:
 *
 *   No price, or a price with no date  ->  "Check latest price on Amazon"
 *   No rating                          ->  no stars, no placeholder
 *   No image                           ->  no broken frame
 *
 * A price is only ever shown beside the date it was read, because a number with
 * no timestamp is a claim about right now that nobody checked. Amazon's terms
 * take the same view.
 *
 * Discounts are computed from mrp and price and shown only when both are
 * present and the maths is sane — never typed in as a badge.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  category,
  sourcePage,
  onCompare,
  isComparing = false,
  compareDisabled = false,
}) => {
  const link = resolveAffiliateLink(product, category);
  const updated = product.lastUpdated ? formatDate(product.lastUpdated) : null;

  // A price is only real if we can also say when it was true.
  const showPrice = typeof product.price === 'number' && Boolean(updated);
  const showRating = typeof product.rating === 'number';

  const discount =
    showPrice &&
    typeof product.mrp === 'number' &&
    product.mrp > (product.price as number)
      ? Math.round(((product.mrp - (product.price as number)) / product.mrp) * 100)
      : null;

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden">
      {product.imageUrl && (
        <div className="aspect-[4/3] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col p-5">
        {product.brand && <p className="label-mono">{product.brand}</p>}

        <h3 className="title-sm mt-2 line-clamp-2 min-h-[2.75rem] text-[16px] text-[var(--color-text-primary)]">
          {product.name}
        </h3>

        {(showPrice || showRating) && (
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {showPrice && (
              <>
                <span className="font-mono text-[20px] font-medium tabular-nums text-[var(--color-text-primary)]">
                  {formatPrice(product.price as number, product.currency)}
                </span>
                {typeof product.mrp === 'number' && product.mrp > (product.price as number) && (
                  <span className="font-mono text-[13px] tabular-nums text-[var(--color-text-muted)] line-through">
                    {formatPrice(product.mrp, product.currency)}
                  </span>
                )}
                {discount !== null && (
                  <span className="badge badge-primary tabular-nums">{discount}% off</span>
                )}
              </>
            )}
            {showRating && (
              <span className="text-[13px] text-[var(--color-text-secondary)]">
                <span className="tabular-nums">{(product.rating as number).toFixed(1)}</span>
                {typeof product.reviewCount === 'number' && (
                  <>
                    {' '}
                    <span className="tabular-nums text-[var(--color-text-muted)]">
                      ({product.reviewCount.toLocaleString('en-IN')})
                    </span>
                  </>
                )}
              </span>
            )}
          </div>
        )}

        {product.keyFeatures && product.keyFeatures.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {product.keyFeatures.slice(0, 3).map((f) => (
              <li key={f} className="flex gap-2 text-[13.5px] leading-snug text-[var(--color-text-secondary)]">
                <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]" />
                <span className="min-w-0">{f}</span>
              </li>
            ))}
          </ul>
        )}

        {product.aiVerdict && (
          <p className="mt-4 rounded-[var(--radius-sm)] border-l-2 border-[var(--color-primary)] bg-[var(--color-surface)] px-3 py-2.5 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
            {product.aiVerdict}
          </p>
        )}

        <div className="mt-auto pt-4">
          {updated ? (
            <p className="text-[12px] text-[var(--color-text-muted)]">
              Details last checked {updated}
            </p>
          ) : (
            /* No timestamp means no price claim. Say what the reader should do
               instead of showing a number nobody stands behind. */
            <p className="text-[12px] text-[var(--color-text-muted)]">
              Price changes often — check before you buy.
            </p>
          )}

          <div className="mt-3 flex items-center gap-2">
            {onCompare && (
              <button
                type="button"
                onClick={() => onCompare(product.id)}
                aria-pressed={isComparing}
                disabled={!isComparing && compareDisabled}
                aria-label={isComparing ? `Remove ${product.name} from the comparison` : `Add ${product.name} to the comparison`}
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] border transition-colors ${
                  isComparing
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40'
                }`}
              >
                <Columns2 size={16} />
              </button>
            )}

            {link ? (
              <a
                href={link.href}
                target="_blank"
                rel={link.rel}
                onClick={() =>
                  trackAffiliateClick({
                    productId: product.id,
                    category: product.category,
                    trackingId: link.tag,
                    sourcePage,
                  })
                }
                className="btn-primary h-10 min-w-0 flex-1 whitespace-nowrap px-4 text-[13px]"
              >
                {showPrice ? 'Check price' : 'Check latest price'}
                {link.isAmazon ? ' on Amazon' : ''}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            ) : (
              /* No stored link means no button. A dead CTA is worse than none. */
              <span className="flex-1 text-[13px] text-[var(--color-text-muted)]">
                Link unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
