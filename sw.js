/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
    'index.html',
    'manifest.json',
    'assets/css/keyboard.css',
    'assets/css/stylesheet.css',
    'assets/images/logo.png',
    'assets/js/words/4.js',
    'assets/js/words/5.js',
    'assets/js/words/6.js',
    'assets/js/game.js',
    'assets/js/menu.js',
    'assets/js/results.js',
    'assets/js/stats.js',
    'assets/js/storage.js',
    'assets/js/themeSwitcher.js',
    'assets/js/typing.js',
    'assets/fonts/zilla-slab-v11-latin-600.eot',
    'assets/fonts/zilla-slab-v11-latin-600.svg',
    'assets/fonts/zilla-slab-v11-latin-600.ttf',
    'assets/fonts/zilla-slab-v11-latin-600.woff',
    'assets/fonts/zilla-slab-v11-latin-600.woff2',
    'assets/fonts/zilla-slab-v11-latin-regular.eot',
    'assets/fonts/zilla-slab-v11-latin-regular.svg',
    'assets/fonts/zilla-slab-v11-latin-regular.ttf',
    'assets/fonts/zilla-slab-v11-latin-regular.woff',
    'assets/fonts/zilla-slab-v11-latin-regular.woff2',
    'assets/js/bootstrap.bundle.min.js',
    'assets/js/bootstrap.min.css',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});






/*
[
  '/index.html',
  '/manifest.json',
  '/assets/css/keyboard.css',
  '/assets/css/stylesheet.css',
  '/assets/images/logo.png',
  '/assets/js/words/4.js',
  '/assets/js/words/5.js',
  '/assets/js/words/6.js',
  '/assets/js/game.js',
  '/assets/js/menu.js',
  '/assets/js/results.js',
  '/assets/js/stats.js',
  '/assets/js/storage.js',
  '/assets/js/themeSwitcher.js',
  '/assets/js/typing.js',
  '/assets/js/bootstrap.bundle.js',
  '/assets/js/bootstrap.bundle.js.map',
  '/assets/js/bootstrap.bundle.min.js',
  '/assets/js/bootstrap.bundle.min.js.map',
  '/assets/js/bootstrap.esm.js',
  '/assets/js/bootstrap.esm.js.map',
  '/assets/js/bootstrap.esm.min.js',
  '/assets/js/bootstrap.esm.min.js.map',
  '/assets/js/bootstrap.js',
  '/assets/js/bootstrap.js.map',
  '/assets/js/bootstrap.min.js',
  '/assets/js/bootstrap.min.js.map',
  '/assets/js/bootstrap-grid.css',
  '/assets/js/bootstrap-grid.css.map',
  '/assets/js/bootstrap-grid.min.css',
  '/assets/js/bootstrap-grid.min.css.map',
  '/assets/js/bootstrap-grid.rtl.css',
  '/assets/js/bootstrap-grid.rtl.css.map',
  '/assets/js/bootstrap-grid.rtl.min.css',
  '/assets/js/bootstrap-grid.rtl.min.css.map',
  '/assets/js/bootstrap-reboot.css',
  '/assets/js/bootstrap-reboot.css.map',
  '/assets/js/bootstrap-reboot.min.css',
  '/assets/js/bootstrap-reboot.min.css.map',
  '/assets/js/bootstrap-reboot.rtl.css',
  '/assets/js/bootstrap-reboot.rtl.css.map',
  '/assets/js/bootstrap-reboot.rtl.min.css.map',
  '/assets/js/bootstrap-utilities.css',
  '/assets/js/bootstrap-utilities.css.map',
  '/assets/js/bootstrap-utilities.min.css',
  '/assets/js/bootstrap-utilities.min.css.map',
  '/assets/js/bootstrap-utilities.rtl.css',
  '/assets/js/bootstrap-utilities.rtl.css.map',
  '/assets/js/bootstrap-utilities.rtl.min.css',
  '/assets/js/bootstrap-utilities.rtl.min.css.map',
  '/assets/js/bootstrap.css',
  '/assets/js/bootstrap.css.map',
  '/assets/js/bootstrap.min.css',
  '/assets/js/bootstrap.min.css.map',
  '/assets/js/bootstrap.rtl.css',
  '/assets/js/bootstrap.rtl.css.map',
  '/assets/js/bootstrap.rtl.min.css',
  '/assets/js/bootstrap.rtl.min.css.map',
  '/assets/fonts/zilla-slab-v11-latin-600.eot',
  '/assets/fonts/zilla-slab-v11-latin-600.svg',
  '/assets/fonts/zilla-slab-v11-latin-600.ttf',
  '/assets/fonts/zilla-slab-v11-latin-600.woff',
  '/assets/fonts/zilla-slab-v11-latin-600.woff2',
  '/assets/fonts/zilla-slab-v11-latin-regular.eot',
  '/assets/fonts/zilla-slab-v11-latin-regular.svg',
  '/assets/fonts/zilla-slab-v11-latin-regular.ttf',
  '/assets/fonts/zilla-slab-v11-latin-regular.woff',
  '/assets/fonts/zilla-slab-v11-latin-regular.woff2'
];
*/
