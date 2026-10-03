const CACHE_NAME = 'costabots-card-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './qr.svg',
  './card.webp',
  '../public/brand/icon-192.png',
  '../public/brand/icon-512.png',
  '../public/brand/costabots-logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match('./index.html').then((cached) => cached || fetch(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
