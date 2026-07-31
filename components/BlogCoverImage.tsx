import React, { useState } from 'react';

interface BlogCoverImageProps {
  category: string;
  title: string;
  imageUrl?: string;
  variant: 'featured' | 'thumbnail' | 'card';
  alt?: string;
}

/**
 * Blog cover: a real topic photo when the post has one, with generated cover
 * art as the layer beneath it.
 *
 * The photo (post.imageUrl) is what readers want to see. The deterministic SVG
 * pattern is kept as a base layer so the card is never blank while the image
 * loads, and as a graceful fallback if the URL ever 404s — instead of a broken
 * image icon, the reader sees a clean, unique-per-title cover. Best of both:
 * real imagery normally, never a broken tile.
 */

// FNV-1a. Small, fast, and stable across builds — the same title always
// produces the same cover, which matters because covers appear in listings
// and on the post itself and must not disagree.
const hash = (s: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

const PATTERNS = ['rules', 'grid', 'arcs', 'stack'] as const;

/**
 * CSS custom properties do not work in SVG *presentation attributes* —
 * `fill="var(--color-primary)"` is parsed as an SVG <paint> value, and var()
 * substitution only applies to CSS declarations. Browsers drop it and fall
 * back to black. That is why these covers looked empty: the shapes were
 * painting near-black at 7–40% opacity on a light surface.
 *
 * Passing the same value through `style` puts it in the CSS cascade, where
 * var() resolves properly and the colour also follows the active theme.
 */
const paint = (color: string, opacity: number) => ({ fill: color, opacity });
const stroke = (color: string, opacity: number, width: number) => ({
  stroke: color,
  strokeWidth: width,
  opacity,
  fill: 'none',
});

export const BlogCoverImage: React.FC<BlogCoverImageProps> = ({
  category,
  title,
  imageUrl,
  variant,
  alt,
}) => {
  // If the photo fails to load, fall back to the generated cover underneath.
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = !!imageUrl && !imgFailed;

  const h = hash(`${title}::${category}`);
  const pattern = PATTERNS[h % PATTERNS.length];
  const rotate = (h >> 8) % 24;
  const density = 5 + ((h >> 12) % 4);
  const useAccent = ((h >> 16) & 1) === 1;
  const ink = useAccent ? 'var(--color-accent)' : 'var(--color-primary)';

  const heights: Record<BlogCoverImageProps['variant'], string> = {
    featured: 'aspect-[16/9]',
    card: 'aspect-[16/10]',
    thumbnail: 'aspect-square',
  };

  return (
    <div
      role="img"
      aria-label={alt || `${category}: ${title}`}
      className={`relative w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] ${heights[variant]}`}
    >
      <svg
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <g transform={`rotate(${rotate - 12} 160 90)`} opacity="0.9">
          {pattern === 'rules' &&
            Array.from({ length: density * 3 }).map((_, i) => (
              <rect
                key={i}
                x={-40}
                y={i * 12}
                width={400}
                height={2.5}
                style={paint(ink, 0.14 + (i % 4) * 0.09)}
              />
            ))}

          {pattern === 'grid' &&
            Array.from({ length: density * 2 }).map((_, i) => (
              <g key={i}>
                <rect x={i * 26} y={-40} width={1.8} height={280} style={paint(ink, 0.22)} />
                <rect x={-40} y={i * 22} width={400} height={1.8} style={paint(ink, 0.18)} />
              </g>
            ))}

          {pattern === 'arcs' &&
            Array.from({ length: density }).map((_, i) => (
              <circle
                key={i}
                cx={70}
                cy={90}
                r={22 + i * 24}
                style={stroke(ink, 0.5 - i * 0.05, 1.8)}
              />
            ))}

          {pattern === 'stack' &&
            Array.from({ length: density }).map((_, i) => (
              <rect
                key={i}
                x={30 + i * 9}
                y={26 + i * 9}
                width={150}
                height={128}
                rx={4}
                style={stroke(ink, 0.55 - i * 0.07, 1.8)}
              />
            ))}
        </g>
      </svg>

      {/* Real topic photo, layered over the generated cover. On error we hide it
          and the SVG below becomes the graceful fallback. */}
      {showPhoto && (
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* The category is the only label — the title sits beside the cover already */}
      <span
        className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-3 p-3"
        style={{
          backgroundImage:
            'linear-gradient(to top, var(--color-surface), color-mix(in srgb, var(--color-surface) 0%, transparent))',
        }}
      >
        <span className="label-mono truncate">{category}</span>
      </span>
    </div>
  );
};

export default BlogCoverImage;
