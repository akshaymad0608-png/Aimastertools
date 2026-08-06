import React, { useState } from 'react';
import { Search, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { TOOL_COUNT, CATEGORY_COUNT, FREE_TOOL_COUNT, LAST_UPDATED_LABEL } from '../utils/stats';

interface HeroSectionProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  onChipClick?: (val: string) => void;
}

/* A big, site-related hero visual: a wall of real AI-tool logos — the actual
 * products in the directory — rather than a borrowed stock photo. */
const HERO_LOGOS: Array<{ name: string; domain: string }> = [
  { name: 'ChatGPT', domain: 'openai.com' },
  { name: 'Claude', domain: 'anthropic.com' },
  { name: 'Midjourney', domain: 'midjourney.com' },
  { name: 'Perplexity', domain: 'perplexity.ai' },
  { name: 'GitHub Copilot', domain: 'github.com' },
  { name: 'Canva', domain: 'canva.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Runway', domain: 'runwayml.com' },
  { name: 'ElevenLabs', domain: 'elevenlabs.io' },
  { name: 'Cursor', domain: 'cursor.com' },
  { name: 'Leonardo', domain: 'leonardo.ai' },
  { name: 'Hugging Face', domain: 'huggingface.co' },
  { name: 'Adobe', domain: 'adobe.com' },
  { name: 'Suno', domain: 'suno.com' },
];

const LogoTile: React.FC<{ name: string; domain: string; delay: number; reduce: boolean }> = ({
  name,
  domain,
  delay,
  reduce,
}) => {
  const [src, setSrc] = useState(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
  const [failed, setFailed] = useState(false);
  const onError = () => {
    if (src.includes('duckduckgo')) setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
    else setFailed(true);
  };
  if (failed) return null;
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="grid aspect-square place-items-center rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
      title={name}
    >
      <img
        src={src}
        alt={name}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={onError}
        className="h-[54%] w-[54%] object-contain"
      />
    </motion.div>
  );
};

/**
 * The hero pairs the search desk with a live wall of the tools people actually
 * come here for — a visual that is unmistakably about this site.
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  searchTerm,
  handleSearchChange,
  searchInputRef,
  onChipClick,
}) => {
  const reduce = useReducedMotion();
  const trending = ['Writing', 'Image', 'Video', 'Coding', 'Agents', 'Research', 'Voice'];

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.2, 0.7, 0.3, 1] as const },
        };

  return (
    <section id="home" className="relative overflow-hidden border-b border-[var(--color-border)]">
      {/* Subtle single-hue cobalt glow background (Clean Minimal) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[-16rem] h-[34rem] w-[34rem] rounded-full opacity-[0.16] blur-[130px]" style={{ background: '#2e5cff' }} />
        <div className="absolute right-[6%] top-[-10rem] h-[30rem] w-[30rem] rounded-full opacity-[0.12] blur-[130px]" style={{ background: '#5b7cff' }} />
        <div className="absolute bottom-[-20rem] left-1/2 h-[34rem] w-[46rem] -translate-x-1/2 rounded-full opacity-[0.10] blur-[140px]" style={{ background: '#7c93ff' }} />
      </div>
      <div
        aria-hidden="true"
        className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_35%,transparent_100%)]"
      />

      <div className="page-top-hero container-custom relative z-10 pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...rise(0)} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cardBg)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--color-text-secondary)] shadow-[var(--shadow-card)]">
              <Star size={13} className="text-[var(--color-primary)]" fill="currentColor" />
              {`${TOOL_COUNT}+ AI tools · updated ${LAST_UPDATED_LABEL}`}
            </span>
          </motion.div>

          <motion.h1 {...rise(0.06)} className="display-xl mt-6 text-[var(--color-text-primary)]">
            Every <span className="text-gradient">AI tool</span> worth
            <br className="hidden sm:block" /> knowing, in one place.
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--color-text-secondary)]"
          >
            The independent directory of {TOOL_COUNT}+ AI tools — hand-checked, with real
            pricing, honest pros and cons, and what to use instead. Search by name or by the
            job you need done.
          </motion.p>

          {/* Trust strip — factual authority + freshness signals (GEO: authority, social proof, urgency) */}
          <motion.ul
            {...rise(0.15)}
            className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-[12.5px] font-semibold text-[var(--color-text-secondary)]"
          >
            {[`Hand-checked`, `Updated weekly`, `No pay-to-rank`, `${FREE_TOOL_COUNT} free tools`].map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cardBg)] px-3 py-1"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </motion.ul>

          {/* The search desk */}
          <motion.div {...rise(0.18)} className="relative z-20 mt-9">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group relative flex items-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-cardBg)] shadow-[var(--shadow-lift)] transition-all focus-within:border-[var(--color-primary)] focus-within:shadow-[var(--shadow-glow)]"
            >
              <label htmlFor="hero-search" className="sr-only">Search AI tools</label>
              <Search
                size={20}
                strokeWidth={2.2}
                aria-hidden="true"
                className="pointer-events-none absolute left-5 text-[var(--color-text-muted)] transition-colors group-focus-within:text-[var(--color-primary)]"
              />
              <input
                id="hero-search"
                ref={searchInputRef}
                type="search"
                autoComplete="off"
                placeholder="Try “video generator”, “Claude”, “free logo maker”…"
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-16 w-full border-none bg-transparent pl-14 pr-4 text-[16px] font-medium text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] sm:h-[72px] sm:pr-36 sm:text-[17px]"
              />
              <button type="submit" className="btn-primary absolute right-2.5 hidden h-11 px-5 sm:inline-flex">
                Search <ArrowRight size={15} />
              </button>
            </form>
          </motion.div>

          {/* Quick filters */}
          <motion.div {...rise(0.24)} className="relative z-20 mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="label-mono mr-1">Jump to</span>
            {trending.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => onChipClick?.(query)}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-cardBg)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {query}
              </button>
            ))}
          </motion.div>
        </div>

        {/* BIG hero visual — a wall of the real tools in the directory */}
        <motion.div {...rise(0.3)} className="relative mx-auto mt-14 max-w-4xl">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] opacity-70 blur-2xl" style={{ backgroundImage: 'var(--gradient-primary)' }} />
          <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-5 shadow-[var(--shadow-lift)] sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="label-mono text-[var(--color-text-secondary)]">Popular tools inside</span>
              <span className="hidden text-[12.5px] font-semibold text-[var(--color-primary)] sm:inline">+{TOOL_COUNT - HERO_LOGOS.length} more</span>
            </div>
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 sm:gap-4">
              {HERO_LOGOS.map((l, i) => (
                <LogoTile key={l.domain} name={l.name} domain={l.domain} delay={0.02 * i} reduce={!!reduce} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Catalogue facts */}
        <motion.dl
          {...rise(0.36)}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 divide-x divide-[var(--color-border)] border-y border-[var(--color-border)] sm:grid-cols-4 sm:divide-y-0"
        >
          {[
            [String(TOOL_COUNT), 'Tools indexed'],
            [String(CATEGORY_COUNT), 'Categories'],
            [String(FREE_TOOL_COUNT), 'Free or open source'],
            ['Weekly', 'Link checks'],
          ].map(([value, label], i) => (
            <div key={label} className={`px-4 py-5 text-center ${i < 2 ? 'border-b border-[var(--color-border)] sm:border-b-0' : ''}`}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="stat-value block">{value}</span>
                <span className="label-mono mt-1.5 block">{label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.p {...rise(0.4)} className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
          Not sure what you need?{' '}
          <Link to="/find" className="font-semibold text-[var(--color-primary)] underline underline-offset-4">
            Answer three questions
          </Link>{' '}
          and we will shortlist for you.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
