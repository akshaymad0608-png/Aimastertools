import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { breadcrumbSchema } from '../utils/seo';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <>
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(items))}</script>
    </Helmet>

    <nav aria-label="Breadcrumb">
      <ol
        className="flex flex-wrap items-center gap-x-2 gap-y-1"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
      >
        <li>
          <Link to="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-[var(--color-border-strong)]">
                /
              </span>
              {item.path && !isLast ? (
                <Link to={item.path} className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="line-clamp-1 text-[var(--color-text-primary)]">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  </>
);

export default Breadcrumbs;
