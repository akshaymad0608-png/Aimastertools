import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

/**
 * The hero illustration: soft pink and silver spheres around a phone that
 * shows the tool finder.
 *
 * Drawn here in SVG and CSS rather than shipped as a picture, so it costs no
 * request, stays sharp at any size, and follows the theme. The phone is a
 * real link into /find, not a screenshot of one.
 */

const Sphere: React.FC<{ id: string; cx: number; cy: number; r: number; tone: 'pink' | 'silver' | 'pearl' }> = ({
  id,
  cx,
  cy,
  r,
  tone,
}) => {
  const stops =
    tone === 'pink'
      ? ['#fde7ef', '#f4b3c9', '#d9789c']
      : tone === 'silver'
        ? ['#ffffff', '#d8d9df', '#9a9ca6']
        : ['#ffffff', '#f1eef1', '#cfc9cf'];
  return (
    <>
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={stops[0]} />
          <stop offset="55%" stopColor={stops[1]} />
          <stop offset="100%" stopColor={stops[2]} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
      <ellipse cx={cx - r * 0.32} cy={cy - r * 0.38} rx={r * 0.22} ry={r * 0.13} fill="#fff" opacity={0.75} />
    </>
  );
};

export const HeroArt: React.FC = () => (
  <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px] text-[var(--color-text-primary)]">
    <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hero-cube" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d6d7dd" />
        </linearGradient>
        <filter id="hero-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* floor shadow */}
      <ellipse cx="250" cy="352" rx="190" ry="22" fill="#0c0c0e" opacity="0.07" filter="url(#hero-soft)" />

      {/* thread line drifting across, as in a product shot */}
      <path d="M8 250 C 60 200, 90 300, 140 250 S 220 190, 250 240" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />

      <Sphere id="s1" cx={150} cy={170} r={92} tone="silver" />
      <Sphere id="s2" cx={255} cy={110} r={58} tone="pink" />
      <Sphere id="s3" cx={90} cy={300} r={40} tone="pink" />
      <Sphere id="s4" cx={215} cy={300} r={52} tone="pearl" />
      <Sphere id="s5" cx={440} cy={80} r={26} tone="pink" />
      <Sphere id="s6" cx={60} cy={110} r={18} tone="silver" />
      <Sphere id="s7" cx={452} cy={300} r={32} tone="silver" />

      {/* a small rounded cube */}
      <g transform="translate(300 250) rotate(-8)">
        <rect x="0" y="0" width="58" height="58" rx="12" fill="url(#hero-cube)" />
        <rect x="8" y="8" width="18" height="18" rx="5" fill="#f4b3c9" />
        <rect x="32" y="32" width="18" height="18" rx="5" fill="#f4b3c9" />
      </g>
    </svg>

    {/* The phone */}
    <div className="absolute right-[6%] top-[6%] w-[44%] min-w-[170px] rotate-[6deg] rounded-[30px] border-[7px] border-[#16161a] bg-white shadow-[0_30px_60px_-20px_rgba(12,12,14,.45)]">
      <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-[#16161a]" />
      <div className="px-4 pb-6 pt-4 text-[#0c0c0e]">
        <div className="relative mx-auto mb-4 h-24 w-24">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fde7ef] to-[#e4e4ea]" />
          <div className="absolute left-3 top-3 h-8 w-8 rounded-full bg-gradient-to-br from-white to-[#f4b3c9]" />
          <div className="absolute bottom-3 right-3 h-9 w-9 rounded-xl bg-gradient-to-br from-white to-[#c9cad1]" />
        </div>
        <p className="text-[10px] font-medium text-[#6a6a73]">3 questions</p>
        <Link
          to="/find"
          className="mt-1 block font-[family-name:var(--font-display)] text-[24px] font-extrabold leading-[1.05] underline decoration-2 underline-offset-4"
        >
          Find a tool
        </Link>
        <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0c0c0e] text-white">
          <Sparkles size={15} aria-hidden="true" />
        </span>
      </div>
    </div>
  </div>
);

export default HeroArt;
