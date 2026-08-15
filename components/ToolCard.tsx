import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check, Star, ExternalLink, Share2, Columns2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Tool } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import ToolLogo from './ToolLogo';

interface ToolCardProps {
  tool: Tool;
  rank?: number;
  priority?: boolean;
  layout?: 'horizontal' | 'vertical';
}

/** Pricing is the first thing people filter on, so it gets its own colour key. */
const PRICING_STYLE: Record<string, string> = {
  Free: 'badge badge-primary',
  'Open Source': 'badge badge-primary',
  Freemium: 'badge badge-accent',
  Paid: 'badge',
  'Usage Based': 'badge',
};

const ToolCard: React.FC<ToolCardProps> = ({ tool, rank, layout = 'horizontal' }) => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [copied, setCopied] = useState(false);
  const isBookmarked = bookmarks.includes(tool.id);
  const isVertical = layout === 'vertical';

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/tool/${tool.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: tool.name, text: `${tool.name} on AI Master Tools`, url });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link. Copy it from the address bar instead.");
    }
  };

  return (
    <article
      className={`cq spine card group relative flex overflow-hidden ${
        isVertical ? 'h-full flex-col' : 'flex-col @[34rem]:flex-row @[34rem]:items-center'
      }`}
      style={{ ['--spine-color' as any]: tool.brandColor || 'var(--color-primary)' }}
    >
      <div className={`flex min-w-0 flex-1 gap-4 p-4 pl-5 @[26rem]:p-5 @[26rem]:pl-6 ${isVertical ? 'flex-col' : ''}`}>
        {/* Mark */}
        <div className="relative shrink-0">
          <Link
            to={`/tool/${tool.id}`}
            tabIndex={-1}
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1 @[26rem]:h-13 @[26rem]:w-13"
          >
            <ToolLogo domain={tool.domain} brandColor={tool.brandColor} name={tool.name} className="h-full w-full" />
          </Link>
          {tool.featured && (
            <span
              title="Editor's pick"
              className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full border-2 border-[var(--color-cardBg)] bg-[var(--color-primary-fill)] text-white"
            >
              <Check size={9} strokeWidth={4} />
            </span>
          )}
        </div>

        {/* Record */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            {typeof rank === 'number' && (
              <span className="label-mono tabular-nums">{String(rank).padStart(2, '0')}</span>
            )}
            <h3 className="title-sm min-w-0 text-balance text-[16px] font-semibold leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] @[26rem]:text-[17.5px]">
              <Link
                to={`/tool/${tool.id}`}
                className="after:absolute after:inset-0 after:content-[''] hover:text-[var(--color-primary)]"
              >
                {tool.name}
              </Link>
            </h3>

            <span className="flex items-center gap-1 text-[12px] font-semibold text-[var(--color-text-secondary)]">
              <Star size={11} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <span className="tabular-nums">{tool.rating.toFixed(1)}</span>
            </span>

            <span className={PRICING_STYLE[tool.pricing] || 'badge'}>{tool.pricing}</span>
          </div>

          <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
            {tool.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link
              to={`/?category=${encodeURIComponent(tool.category)}`}
              className="relative z-10 text-[12px] font-medium text-[var(--color-text-secondary)] underline-offset-4 hover:text-[var(--color-primary)] hover:underline"
            >
              {tool.category}
            </Link>
            {tool.tags?.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                to={`/?tag=${tag.toLowerCase()}`}
                className="relative z-10 text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Action rail */}
      <div
        className={`relative z-10 flex shrink-0 items-center gap-2 border-[var(--color-border)] p-4 @[26rem]:p-5 ${
          isVertical ? 'mt-auto w-full border-t' : 'border-t @[34rem]:border-l @[34rem]:border-t-0'
        }`}
      >
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); toggleBookmark(tool.id); }}
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? `Remove ${tool.name} from saved` : `Save ${tool.name}`}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] border transition-colors ${
            isBookmarked
              ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
          }`}
        >
          <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
        </button>

        <button
          type="button"
          onClick={handleShare}
          aria-label={`Copy link to ${tool.name}`}
          className="hidden h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] @[22rem]:grid"
        >
          {copied ? <Check size={16} className="text-[var(--color-success)]" /> : <Share2 size={16} />}
        </button>

        <Link
          to={`/compare?tool1=${tool.id}`}
          aria-label={`Compare ${tool.name} with another tool`}
          className="hidden h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] @[28rem]:grid"
        >
          <Columns2 size={16} />
        </Link>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn-primary h-10 min-w-0 flex-1 whitespace-nowrap px-4 text-[13px] @[34rem]:flex-none"
        >
          Visit site
          <ExternalLink size={13} />
        </a>
      </div>
    </article>
  );
};

export default ToolCard;
