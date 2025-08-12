const CACHE_NAME = 'ez2fix-v1';
const STATIC_CACHE = 'ez2fix-static-v1';
const DYNAMIC_CACHE = 'ez2fix-dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/ez2fix-logo.png',
  '/placeholder.svg',
  '/manifest.json'
];

const CACHE_STRATEGIES = {
  // Cache-first strategy for static assets
  CACHE_FIRST: 'cache-first',
  // Network-first strategy for dynamic content
  NETWORK_FIRST: 'network-first',
  // Stale-while-revalidate for frequently updated content
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith('ez2fix-') && cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - handle different caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset)) || 
      url.pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2)$/)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Skip HTML pages - let them be handled naturally by the browser and React Router
  if (request.headers.get('accept')?.includes('text/html')) {
    return; // Don't intercept HTML requests
  }

  // Default to stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// Cache-first strategy
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn('Cache-first fetch failed:', error);
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Network-first strategy (for non-HTML requests)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }

    return new Response('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  if (cached) {
    return cached;
  }

  const response = await fetchPromise;
  return response || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'form-submission') {
    event.waitUntil(syncFormSubmissions());
  }
});

async function syncFormSubmissions() {
  // Handle queued form submissions when back online
  const submissions = await getQueuedSubmissions();
  
  for (const submission of submissions) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission.data)
      });
      
      if (response.ok) {
        await removeFromQueue(submission.id);
      }
    } catch (error) {
      console.warn('Failed to sync form submission:', error);
    }
  }
}

// Helper functions for IndexedDB queue management
async function getQueuedSubmissions() {
  // Implementation would use IndexedDB to store queued submissions
  return [];
}

async function removeFromQueue(id) {
  // Implementation would remove item from IndexedDB queue
}