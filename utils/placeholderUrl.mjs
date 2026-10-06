/**
 * True for URLs that can never be a real vendor site: the reserved example
 * domains (RFC 2606), localhost and the reserved TLDs. Ten tool records shipped
 * with https://<name>.example.com and that URL was then published as the
 * product's own link and as `sameAs` in structured data.
 */
export const isPlaceholderUrl = (value) => {
  if (!value || typeof value !== 'string') return false;
  let host;
  try {
    host = new URL(value).hostname.toLowerCase();
  } catch {
    return false;
  }
  return (
    /(^|\.)example\.(com|org|net|edu)$/.test(host) ||
    host === 'localhost' ||
    /\.(test|invalid|example|localhost)$/.test(host)
  );
};
