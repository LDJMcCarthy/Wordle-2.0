// The install handler takes care of precaching the resources we always need.
const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      '/',
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
    ])
  );
});






