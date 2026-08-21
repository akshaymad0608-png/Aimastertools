import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check, Star, ExternalLink, Share2, Columns2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Tool } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import { useCompare } from '../context/CompareContext';
import ToolLogo from './ToolLogo';
import { resolveToolLink } from '../lib/affiliate/outbound';

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
  const { isComparing, toggleCompare, isFull } = useCompare();
  const picked = isComparing(tool.id);
  const [copied, setCopied] = useState(false);
  const isBookmarked = bookmarks.includes(tool.id);
  const isVertical = layout === 'vertical';
  const link = resolveToolLink(tool);

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
          {/*
            One thing per row, and every row a fixed number of lines.

            These four — name, rating, price, category — used to share a single
            flex-wrap row, so the length of a tool name decided the layout:
            "Munch Studio" pushed its FREEMIUM badge onto a second line while
            "CapCut" kept its inline.

            Splitting them was not enough. In a 257px column the name itself
            wraps — "Google Analytics 4 (GA4)" takes two lines where "Clay"
            takes one — and everything below it shifted by 21px. Measured on
            the live grid: names 21px and 42px tall, meta rows 23px and 49px,
            so the action rail landed at 203, 229 and 249px on cards sitting
            side by side.

            So the name reserves both lines whether it needs them or not, and
            rating and price get their own row where they always fit. Nothing
            below depends on how long a name happens to be.
          */}
          <div className="flex items-start gap-2.5">
            {typeof rank === 'number' && (
              <span className="label-mono mt-1 shrink-0 tabular-nums">{String(rank).padStart(2, '0')}</span>
            )}
            <h3 className="title-sm line-clamp-2 min-h-[2.75rem] min-w-0 flex-1 text-balance text-[16px] font-semibold leading-tight tracking-[-0.01em] text-[var(--color-text-primary)] @[26rem]:text-[17.5px]">
              <Link
                to={`/tool/${tool.id}`}
                className="after:absolute after:inset-0 after:content-[''] hover:text-[var(--color-primary)]"
              >
                {tool.name}
              </Link>
            </h3>
          </div>

          <div className="mt-1 flex items-center gap-2.5">
            <span className="flex shrink-0 items-center gap-1 text-[12px] font-semibold text-[var(--color-text-secondary)]">
              <Star size={11} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <span className="tabular-nums">{tool.rating.toFixed(1)}</span>
            </span>
            <span className={PRICING_STYLE[tool.pricing] || 'badge'}>{tool.pricing}</span>
          </div>

          {/*
            Reserve both lines whether or not the copy fills them.

            line-clamp-2 caps the maximum but not the minimum, so a one-line
            description pulled everything under it up and the price and category
            row landed at a different height on every card — measured at 140,
            163 and 177px from the card top across one screen. Holding two
            lines' worth of space lines the row up across the grid.
          */}
          <p className="mt-2 line-clamp-2 min-h-[2.85rem] text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
            {tool.description}
          </p>

          {/*
            Category only, and no tags.

            The tags were the other thing wrapping this row — a badge plus a
            category plus two "#slug" chips does not fit 257px, so the row was
            23px on some cards and 49px on others. They were also the clutter
            in the grid, and they linked to /?tag=… which this site's robots.txt
            blocks outright, so nothing was following them anyway. The category
            alone fits on one line at every column width the grid uses.
          */}
          <div className="mt-3 truncate">
            <Link
              to={`/?category=${encodeURIComponent(tool.category)}`}
              className="relative z-10 text-[12px] font-medium text-[var(--color-text-secondary)] underline-offset-4 hover:text-[var(--color-primary)] hover:underline"
            >
              {tool.category}
            </Link>
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

        {/*
          This was a link to `?tool1={id}`. /compare has only ever read `tools`,
          so the compare control on every card in the index opened an empty
          picker with the tool you were looking at nowhere in it.

          It picks the tool now, and the tray at the bottom of the screen hands
          the set to /compare in the parameter it actually parses.
        */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); toggleCompare(tool.id); }}
          aria-pressed={picked}
          disabled={!picked && isFull}
          aria-label={
            picked
              ? `Remove ${tool.name} from the comparison`
              : isFull
                ? `Comparison is full — remove one to add ${tool.name}`
                : `Add ${tool.name} to the comparison`
          }
          className={`hidden h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] border transition-colors @[28rem]:grid ${
            picked
              ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--color-border)] disabled:hover:text-[var(--color-text-secondary)]'
          }`}
        >
          <Columns2 size={16} />
        </button>

        {/*
          Secondary, not primary.

          This is the one control on the card that sends the reader off the
          site, and it was the loudest thing on it — a filled accent bar taking
          every spare pixel, three to a row. The card's own default action is
          already the review: the title is a stretched link covering the whole
          surface. Leaving the exit filled and the destination invisible had the
          hierarchy backwards, and it painted the grid in accent blocks.

          The rel used to be hard-coded to "noopener noreferrer sponsored" here,
          which told Google every one of these 699 links was paid when none of
          them were. resolveToolLink decides it from whether money is actually
          involved, and marks the card when it is.
        */}
        <a
          href={link.href}
          target="_blank"
          rel={link.rel}
          className="btn-secondary h-10 min-w-0 flex-1 whitespace-nowrap px-4 text-[13px] @[34rem]:flex-none"
        >
          Visit site
          {link.isAffiliate && <span className="sr-only"> (affiliate link)</span>}
          <ExternalLink size={13} />
        </a>
      </div>
    </article>
  );
};

export default ToolCard;
