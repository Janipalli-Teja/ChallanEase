const CACHE_NAME = "pwa-cache-v1";
const STATIC_ASSETS = [
    "/",
    "pages/index.html",
    "/pages/challan.html",
    "/pages/login.html",
    "/pages/signup.html",
    "/styles/index.css",
    "/styles/challan.css",
    "/styles/login.css",
    "/styles/signup.css",
    "/script.js",
    "/challan.js",
    "/manifest.json"
];

// Install Service Worker and Cache Assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        }).catch(err => console.error("Cache installation failed", err))
    );
});

// Fetch from Cache or Network with Fallback
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                return cachedResponse || fetch(event.request)
                    .then(networkResponse => {
                        // Optionally, cache new requests dynamically
                        return caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    });
            })
            .catch(() => {
                console.error("Fetch failed, returning offline fallback.");
                return caches.match("/index.html"); // Show a fallback page
            })
    );
});

// Activate and Clean Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});
