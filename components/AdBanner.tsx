import React from 'react';
import { ExternalLink, Rocket } from 'lucide-react';
import { usePro } from '../context/ProContext';

const AdBanner: React.FC = () => {
  const { isPro } = usePro();

  if (isPro) {
    return null;
  }

  return (
    <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 my-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 bg-[var(--color-background)] text-[var(--color-text-muted)] text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider border-b border-l border-[var(--color-border)]">
        Sponsored
      </div>
      
      <div className="flex items-center gap-6 z-10 w-full md:w-auto">
        <div className="w-16 h-16 rounded-[var(--radius-sm)] bg-[var(--color-cardBg)] flex items-center justify-center flex-shrink-0 border border-[var(--color-border)]">
          <Rocket className="text-[var(--color-primary)]" size={32} />
        </div>
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-2 transition-colors">
            Boost Your AI Startup
          </h4>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base">
            Reach 100,000+ AI enthusiasts, founders, and developers. Feature your tool today.
          </p>
        </div>
      </div>
      
      <button className="btn-secondary px-8 py-3 text-sm md:text-base whitespace-nowrap z-10 flex items-center gap-2 w-full md:w-auto justify-center">
        Advertise with us <ExternalLink size={16} />
      </button>
    </div>
  );
};

export default AdBanner;
