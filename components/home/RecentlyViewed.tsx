import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { MOCK_TOOLS } from '../../data/tools';
import { Tool } from '../../types';
import ToolCard from '../ToolCard';

/**
 * Shows the tools this visitor recently opened (tracked in localStorage as
 * `recent_tools` by ToolDetail). Renders nothing until there are at least two,
 * so first-time visitors never see an empty or one-item strip.
 */
export const RecentlyViewed: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem('recent_tools') || '[]');
      const resolved = ids
        .map((id) => MOCK_TOOLS.find((t) => t.id === id))
        .filter((t): t is Tool => Boolean(t))
        .slice(0, 6);
      setTools(resolved);
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  if (tools.length < 2) return null;

  return (
    <section className="section section-alt" aria-labelledby="recent-heading">
      <div className="container-custom">
        <p className="eyebrow flex items-center gap-1.5">
          <Clock size={13} aria-hidden="true" /> Recently viewed
        </p>
        <h2 id="recent-heading" className="display-md mt-3 text-[var(--color-text-primary)]">
          Pick up where you left off
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={`recent-${tool.id}`} tool={tool} layout="vertical" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
