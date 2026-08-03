import React from 'react';
import { Sparkles } from 'lucide-react';
import { MOCK_TOOLS } from '../../data/tools';
import ToolCard from '../ToolCard';

/**
 * A single highly-rated tool, chosen deterministically from today's date so
 * every visitor sees the same pick each day and it rotates automatically.
 * No randomness, no backend.
 */
const pool = MOCK_TOOLS.filter((t) => (t.rating || 0) >= 4.6);
const source = pool.length ? pool : MOCK_TOOLS;

function pickForToday(): typeof MOCK_TOOLS[number] | undefined {
  if (!source.length) return undefined;
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  let h = 2166136261;
  for (let i = 0; i < day.length; i++) {
    h ^= day.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return source[(h >>> 0) % source.length];
}

export const ToolOfTheDay: React.FC = () => {
  const tool = pickForToday();
  if (!tool) return null;

  return (
    <section className="section" aria-labelledby="totd-heading">
      <div className="container-custom">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-6 shadow-[var(--shadow-card)] sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
            <div>
              <p className="eyebrow flex items-center gap-1.5">
                <Sparkles size={13} aria-hidden="true" /> Tool of the day
              </p>
              <h2 id="totd-heading" className="display-md mt-3 text-[var(--color-text-primary)]">
                Today’s pick: <span className="text-gradient">{tool.name}</span>
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
                {tool.description}
              </p>
              <p className="label-mono mt-4">A fresh, top-rated tool every day — check back tomorrow.</p>
            </div>
            <ToolCard tool={tool} layout="vertical" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolOfTheDay;
