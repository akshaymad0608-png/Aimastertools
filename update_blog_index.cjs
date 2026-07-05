const fs = require('fs');
let code = fs.readFileSync('pages/BlogIndex.tsx', 'utf8');

const featuredPostSection = `
        {/* Featured Post (First Post) */}
        {blogPosts.length > 0 && (
          <div className="mb-16">
            <Link 
              to={\`/blog/\${blogPosts[0].slug || blogPosts[0].id}\`}
              className="group flex flex-col lg:flex-row bg-[var(--color-cardBg)] rounded-3xl border border-[var(--color-border)] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 relative"
            >
              {/* Image Side */}
              <div className="lg:w-3/5 relative h-64 sm:h-80 lg:h-auto overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
                <BlogCoverImage 
                  category={blogPosts[0].category} 
                  title={blogPosts[0].title} 
                  imageUrl={blogPosts[0].imageUrl}
                  variant="featured"
                  alt={blogPosts[0].title}
                />
              </div>
              
              {/* Content Side */}
              <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <CategoryBadge label={blogPosts[0].category || 'FEATURED'} />
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-text-muted)]">
                    <Clock size={14} />
                    <span>{blogPosts[0].readTime || '5 min read'}</span>
                  </div>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-primary)] transition-colors tracking-tight leading-tight">
                  {blogPosts[0].title}
                </h2>
                
                <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
                  {blogPosts[0].excerpt}
                </p>
                
                {/* Author Block & Read More */}
                <div className="flex items-center justify-between border-t border-[var(--color-border)]/60 pt-6 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className={\`w-10 h-10 rounded-full ring-2 ring-current/10 \${getAuthorByPostId(blogPosts[0].id).bg} flex items-center justify-center font-bold text-sm\`}>
                      {getAuthorByPostId(blogPosts[0].id).initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--color-text-primary)]">{getAuthorByPostId(blogPosts[0].id).name}</div>
                      <div className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{getAuthorByPostId(blogPosts[0].id).role}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)] group-hover:translate-x-1 duration-200 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <h3 className="text-2xl font-bold mb-8 text-[var(--color-text-primary)]">Latest Articles</h3>
        {/* Improved Premium 3-Column Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
`;

code = code.replace(
  /\{\/\* Improved Premium 3-Column Blog Cards Grid \*\/\}[\s\S]*?<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">/,
  featuredPostSection
);

code = code.replace(
  /\{blogPosts\.map\(\(post\) => \{/,
  '{blogPosts.slice(1).map((post) => {'
);

fs.writeFileSync('pages/BlogIndex.tsx', code, 'utf8');
console.log('Added featured post section to BlogIndex.tsx');
