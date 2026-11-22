// Strona Darts Master Arena – prosty service worker (sama strona, bez plików aplikacji)
const VERSION = 'dma-www-2';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== VERSION).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== self.location.origin) return;
  e.respondWith(fetch(req).then(res => {
    if (res && res.status === 200 && res.type === 'basic') { const c = res.clone(); caches.open(VERSION).then(x => x.put(req, c)).catch(() => {}); }
    return res;
  }).catch(() => caches.match(req).then(r => r || caches.match('/'))));
});
