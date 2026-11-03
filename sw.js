self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // GAS（script.google.com）への通信はService Workerでインターセプトせずそのまま通す
  if (url.hostname.includes('script.google.com')) {
    return;
  }

  // その他のPWA用キャッシュ処理（従来のコード）
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
