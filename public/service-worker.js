// Set this to true for production
let doCache = true;

// Name our cache
let CACHE_NAME = 'my-pwa-cache-v1';

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys()
			.then(keyList =>
				Promise.all(keyList.map(key => {
					if (!cacheWhitelist.includes(key)) {
						console.log('Deleting cache: ' + key);
						return caches.delete(key);
					}
				}))
			)
	);
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', event => {
	if (doCache) {
		event.waitUntil(
			caches.open(CACHE_NAME)
				.then(cache => {
					// Get the assets manifest so we can see what our js file is named
					// This is because webpack hashes it
					fetch("manifest.json")
						.then(response => response.json())
						.then(assets => {
							// Open a cache and cache our files
							// We want to cache the page and the main.js generated by webpack
							// We could also cache any static assets like CSS or images
							const urlsToCache = [
								"/",
								assets["index.js"]
							];
							cache.addAll(urlsToCache);
							console.log('cached');
						})
				})
		);
	}
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', event => {
	if (doCache) {
		event.respondWith(
			caches.match(event.request).then(response => {
				return response || fetch(event.request);
			})
		);
	}
});