import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import ToolCard from '../components/ToolCard';
import { CollectionCard } from '../components/CollectionCard';
import { FAQSection } from '../components/home/FAQSection';
import { COLLECTIONS } from '../data/collections';
import { MOCK_TOOLS } from '../data/tools';
import { NewsletterSection } from '../components/home/NewsletterSection';

const CollectionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const collection = useMemo(() => {
    return COLLECTIONS.find(c => c.slug === slug);
  }, [slug]);

  const tools = useMemo(() => {
    if (!collection) return [];
    return collection.toolIds
      .map(id => MOCK_TOOLS.find(t => t.id === id))
      .filter(t => t !== undefined) as typeof MOCK_TOOLS;
  }, [collection]);
  
  const relatedCollections = useMemo(() => {
    if (!collection || !collection.relatedCollectionIds) return [];
    return collection.relatedCollectionIds
      .map(id => COLLECTIONS.find(c => c.id === id))
      .filter(c => c !== undefined) as typeof COLLECTIONS;
  }, [collection]);

  if (!collection) {
    return (
      <div className="page-top min-h-screen bg-[var(--color-background)] flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Collection not found</h1>
        <Link to="/collections" className="text-[var(--color-primary)] hover:underline">
          Browse all collections
        </Link>
      </div>
    );
  }

  // JSON-LD Schema
  const schema = {
"@context": "https://schema.org",
"@type": "CollectionPage",
"mainEntity": {
"@type": "ItemList",
"itemListElement": tools.map((tool, index) => ({
"@type": "ListItem",
"position": index + 1,
"url": `https://aimastertools.space/tool/${tool.id}`
      }))
    }
  };

  const faqSchema = collection.faqs && collection.faqs.length > 0 ? {
"@context": "https://schema.org",
"@type": "FAQPage",
"mainEntity": collection.faqs.map(faq => ({
"@type": "Question",
"name": faq.question,
"acceptedAnswer": {
"@type": "Answer",
"text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="page-top min-h-screen bg-[var(--color-background)] pb-16">
      <SEO 
        title={collection.metaTitle}
        description={collection.metaDescription}
        url={typeof window !== 'undefined' ? window.location.href : ''}
      >
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </SEO>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs items={[
            { label: 'Collections', path: '/collections' },
            { label: collection.title }
          ]} />
        </div>
        
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold mb-6 border border-[var(--color-primary)]/20">
            <Layers size={16} className="mr-2" />
            Curated Collection
          </div>
          
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] tracking-tight mb-6 leading-tight">
            {collection.title}
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
            {collection.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center">
              <CheckCircle2 className="text-[var(--color-primary)] mr-3" size={24} />
              The Tools ({tools.length})
            </h2>
            
            <div className="space-y-6 mb-16">
              {tools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} rank={index + 1} layout="horizontal" />
              ))}
            </div>
            
            {collection.faqs && collection.faqs.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {collection.faqs.map((faq, index) => (
                    <details key={index} className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[var(--color-text-primary)]">
                        {faq.question}
                        <ChevronDown className="transform group-open:rotate-180 transition-transform duration-300 text-[var(--color-text-muted)]" size={20} />
                      </summary>
                      <div className="p-6 text-[var(--color-text-secondary)] leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
            
            {collection.ctaText && collection.ctaUrl && (
              <div className="from-[var(--color-primary)]/20 p-8 rounded-[var(--radius-lg)] border border-[var(--color-primary)]/30 text-center mb-12">
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                  Ready to discover more?
                </h3>
                <Link to={collection.ctaUrl} className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[var(--color-primary-fill)] rounded-full hover:bg-[var(--color-primary-dark)] hover:shadow-[var(--shadow-card)] hover:shadow-[var(--color-primary)]/30 transition-all duration-300">
                  {collection.ctaText}
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-6 shadow-[var(--shadow-lift)] shadow-black/5">
                <h3 className="title-sm text-lg font-bold text-[var(--color-text-primary)] mb-6 border-b border-[var(--color-border)] pb-4">
                  Related Collections
                </h3>
                <div className="space-y-4">
                  {relatedCollections.map(related => (
                    <Link 
                      key={related.id} 
                      to={`/collections/${related.slug}`}
                      className="group block"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mr-3 group-hover:scale-110 transition-transform">
                          <Layers size={14} />
                        </div>
                        <h4 className="title-sm text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <Link to="/collections" className="mt-6 block text-center w-full py-3 px-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-sm)] text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-primary-fill)] hover:text-white hover:border-[var(--color-primary)] transition-all">
                  View All Collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NewsletterSection showToast={() => {}} />
    </div>
  );
};

export default CollectionDetail;
