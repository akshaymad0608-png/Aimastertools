/* AI Master Tools — minimal service worker.
 * Network-first for everything (never serves stale content); the cache is only
 * an offline fallback. Its real job is to make the site installable as a PWA
 * ("Add to Home Screen") — Chrome requires a registered SW with a fetch handler.
 */
const OFFLINE_CACHE = 'amt-offline-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Keep a fresh copy of successful same-origin navigations for offline use.
        if (request.mode === 'navigate' && response && response.ok) {
          const copy = response.clone();
          caches.open(OFFLINE_CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => cached || caches.match('/')),
      ),
  );
});
