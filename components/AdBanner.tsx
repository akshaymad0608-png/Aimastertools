import React from 'react';
import { ExternalLink, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePro } from '../context/ProContext';

const AdBanner: React.FC = () => {
  const { isPro } = usePro();

  if (isPro) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-cardBg)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 my-12 relative overflow-hidden group shadow-lg">
      <div className="absolute top-0 right-0 bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider border-b border-l border-[var(--color-primary)]/30">
        Sponsored
      </div>
      
      {/* Background Glow */}
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
      
      <div className="flex items-center gap-6 z-10 w-full md:w-auto">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0 border border-[var(--color-primary)]/30 shadow-[var(--shadow-neon)]">
          <Rocket className="text-[var(--color-primary)]" size={32} />
        </div>
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)] transition-all duration-300">
            Boost Your AI Startup
          </h4>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base">
            Reach 100,000+ AI enthusiasts, founders, and developers. Feature your tool today.
          </p>
        </div>
      </div>
      
      <Link to="/submit" className="btn-primary px-8 py-3 text-sm md:text-base whitespace-nowrap z-10 flex items-center gap-2 w-full md:w-auto justify-center">
        Advertise with us <ExternalLink size={16} />
      </Link>
    </div>
  );
};

export default AdBanner;
