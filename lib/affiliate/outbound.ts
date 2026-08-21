import type { Tool } from '../../types';

/**
 * Every link that leaves this site for a tool's own website goes through here.
 *
 * It exists because eight files were each deciding for themselves, and they did
 * not agree:
 *
 *   ToolCard          rel="noopener noreferrer sponsored"
 *   ToolDetail (CTA)  rel="noopener noreferrer"
 *   ToolDetail (host) rel="noreferrer"
 *
 * All three were wrong in different ways. `sponsored` tells Google a link is
 * paid, and not one of the 699 tool links was — the card was declaring a
 * commercial relationship that did not exist. The detail page had no `nofollow`
 * at all, so 699 pages handed their ranking straight to the vendors. And a
 * `target="_blank"` link without `noopener` gives the opened page a handle back
 * to this one.
 *
 * A directory's outbound links are also the thing an affiliate programme turns
 * commercial later. Getting the rel wrong at that point is not untidy, it is a
 * disclosure failure. So the rule lives in one place, and it keys off whether
 * money is actually involved:
 *
 *   affiliate link  ->  sponsored nofollow, and the page must disclose
 *   plain listing   ->  nofollow, and nothing to disclose
 *
 * Nothing here ever builds an affiliate URL. A partner link is issued by the
 * programme; constructing one by appending a parameter produces a link that
 * either does not track or breaks the programme's terms. If a tool has no
 * affiliateUrl it gets its plain website link, and that is a complete answer.
 */

export interface OutboundLink {
  href: string;
  /** True only when the destination earns this site money. */
  isAffiliate: boolean;
  rel: string;
  /** Set when the tool has no usable website at all. */
  isFallbackSearch: boolean;
}

const SEARCH = (name: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(`${name} AI tool`)}`;

const usable = (value?: string): string | null => {
  const raw = value?.trim();
  if (!raw || raw === '#') return null;
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' || u.protocol === 'http:' ? raw : null;
  } catch {
    return null;
  }
};

/**
 * Where a tool's outbound button should point, and how it must be marked.
 *
 * Falls back to a search for the tool's name when the record has no working
 * URL, which is what the detail page already did — better than a dead button,
 * and it is never an affiliate link.
 */
export const resolveToolLink = (
  tool: Pick<Tool, 'name' | 'url' | 'affiliateUrl'>,
): OutboundLink => {
  const affiliate = usable(tool.affiliateUrl);
  if (affiliate) {
    return {
      href: affiliate,
      isAffiliate: true,
      // `sponsored` is Google's marker for paid links, affiliate ones included.
      // `nofollow` alongside it because older crawlers only understand that one.
      rel: 'noopener noreferrer sponsored nofollow',
      isFallbackSearch: false,
    };
  }

  const site = usable(tool.url);
  return {
    href: site ?? SEARCH(tool.name),
    isAffiliate: false,
    // No money changes hands, so no `sponsored` — but a directory should not be
    // passing its ranking to 699 external sites either.
    rel: 'noopener noreferrer nofollow',
    isFallbackSearch: !site,
  };
};

/** True when anything in this set carries a commercial link, so the page discloses. */
export const hasAffiliateLink = (tools: Pick<Tool, 'name' | 'url' | 'affiliateUrl'>[]): boolean =>
  tools.some((t) => resolveToolLink(t).isAffiliate);

export interface ToolLinkAudit {
  ok: boolean;
  errors: string[];
  warnings: string[];
  host?: string;
}

/**
 * Check a tool's affiliate link before it ships.
 *
 * The equivalent for Amazon links caught a Special Link that reported to
 * someone else's tracking id. Partner links fail more quietly still — most are
 * an opaque redirect with an account id buried in a query string, so there is
 * nothing to eyeball. What can be checked mechanically is checked here.
 */
export const auditToolLink = (
  tool: Pick<Tool, 'id' | 'name' | 'url' | 'affiliateUrl' | 'affiliateId' | 'affiliateProgram'>,
): ToolLinkAudit => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const raw = tool.affiliateUrl?.trim();
  if (!raw) return { ok: true, errors, warnings };

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { ok: false, errors: ['affiliateUrl is not a valid URL.'], warnings };
  }

  if (url.protocol !== 'https:') {
    errors.push(`affiliateUrl is ${url.protocol}, not https. A partner link on http leaks the referrer and may be dropped.`);
  }

  if (!tool.affiliateProgram) {
    warnings.push('No affiliateProgram recorded — there is no way to tell which dashboard this link reports to.');
  }

  if (!tool.affiliateId) {
    warnings.push('No affiliateId recorded — nothing to check the link against if the programme changes it.');
  } else if (!raw.includes(tool.affiliateId)) {
    // Not fatal: plenty of networks issue an opaque redirect that does not
    // carry the account id in the visible URL.
    warnings.push(
      `affiliateId "${tool.affiliateId}" does not appear in the link. That is normal for a redirect-style ` +
        'network, but it means the link cannot be verified from the URL alone — click it and confirm it lands correctly.',
    );
  }

  // A partner link that points at the vendor's plain homepage usually means the
  // tracking parameter was lost somewhere between the dashboard and here.
  const site = usable(tool.url);
  if (site) {
    try {
      const own = new URL(site);
      if (own.hostname === url.hostname && !url.search && !url.pathname.replace(/\/+$/, '')) {
        errors.push(
          'affiliateUrl is the tool\'s own homepage with no tracking on it. This link earns nothing — ' +
            're-copy it from the programme dashboard.',
        );
      }
    } catch {
      /* handled above */
    }
  }

  return { ok: errors.length === 0, errors, warnings, host: url.hostname };
};
