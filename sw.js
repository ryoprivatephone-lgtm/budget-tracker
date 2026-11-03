const CACHE_NAME = 'budget-tracker-v1';

// インストール処理
self.addEventListener('install', event => {
  self.skipWaiting();
});

// アクティベート処理
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// 通信（fetch）の割り込み処理
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Apps Script（script.google.com）への通信は、Service Workerで横取りせず直接ネットワークへ流す
  if (url.hostname.includes('script.google.com')) {
    return;
  }

  // それ以外のファイル（HTMLやアイコン等）の読み込み処理
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
