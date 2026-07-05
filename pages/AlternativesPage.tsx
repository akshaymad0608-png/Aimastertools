import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MOCK_TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import { ChevronRight, GitCompare } from 'lucide-react';

const AlternativesPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // E.g., "chatgpt-alternatives" -> "ChatGPT"
  const toolName = slug ? slug.replace('-alternatives', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Tool';
  
  // Find tools in the same category or similar tags
  const alternatives = useMemo(() => {
    // Highly simplified mock logic for finding alternatives.
    // In reality, this would search tags or category of the target tool.
    return MOCK_TOOLS.slice(0, 8); // Just show top 8 for demo purposes
  }, [slug]);

  return (
    <div className="pt-24 pb-20 bg-[var(--color-background)] min-h-screen">
      <Helmet>
        <title>Best {toolName} Alternatives in 2024 - Free & Paid - AIMasterTools</title>
        <meta name="description" content={`Find the best ${toolName} alternatives. Compare free and paid competitors to ${toolName} for your workflow.`} />
        <meta name="keywords" content={`${toolName} alternatives, tools like ${toolName}, ${toolName} competitors, free ${toolName} alternative`} />
      </Helmet>

      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8 animate-fade-in-up">
          <Link to="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/alternatives" className="hover:text-[var(--color-text-primary)] transition-colors">Alternatives</Link>
          <ChevronRight size={14} />
          <span className="text-[var(--color-text-primary)] font-medium">{toolName}</span>
        </div>

        {/* Header */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-sm mb-4">
            <GitCompare size={16} />
            Alternatives & Competitors
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            Best {toolName} Alternatives
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
            Looking for something better than {toolName}? Explore these top-rated alternatives, featuring free options, better pricing, and advanced features.
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          {alternatives.map((tool, idx) => (
            <ToolCard key={tool.id} tool={tool} rank={idx + 1} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AlternativesPage;
