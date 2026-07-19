import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * One masthead for every interior page. Before this, each page invented its
 * own pill-badge-and-centred-headline arrangement, which is why the site read
 * as a stack of unrelated landing pages rather than one catalogue.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  lede,
  meta,
  action,
  children,
}) => (
  <header className="border-b border-[var(--color-border)] pb-8 pt-6">
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display-lg mt-4 text-[var(--color-text-primary)]">{title}</h1>
        {lede && (
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[var(--color-text-secondary)]">
            {lede}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
    {meta && <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">{meta}</div>}
    {children}
  </header>
);

export default PageHeader;
