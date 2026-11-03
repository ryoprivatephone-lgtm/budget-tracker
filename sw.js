const CACHE_NAME = 'budget-tracker-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Apps Scriptへの通信はService Workerで横取りせず直接ネットワークへ流す
  if (url.hostname.includes('script.google.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
