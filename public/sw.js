/* AI Master Tools — service worker (offline-capable PWA).
 *
 * Strategy:
 *  - Static hashed assets (/assets/*, fonts, images): cache-first. Filenames are
 *    content-hashed and immutable, so this is always safe and makes repeat loads
 *    instant + fully offline.
 *  - Navigations (HTML): network-first (always fresh online), fall back to the
 *    cached page, then the app shell, then a friendly offline page.
 *  - The tool catalogue ships inside the JS bundle, so once assets are cached the
 *    whole directory browses, searches and filters offline.
 */
const CACHE = 'amt-v2';
const PRECACHE = ['/', '/offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => {})
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const isAsset = (url) =>
  url.pathname.startsWith('/assets/') ||
  /\.(?:js|css|woff2?|ttf|png|svg|ico|webp|jpe?g|json)$/.test(url.pathname);

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // only same-origin

  // Immutable static assets — cache-first.
  if (isAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
            return res;
          }),
      ),
    );
    return;
  }

  // Page navigations — network-first with offline fallback chain.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then((c) => c || caches.match('/'))
            .then((c) => c || caches.match('/offline.html')),
        ),
    );
    return;
  }

  // Anything else — network, fall back to cache.
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
