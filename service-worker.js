var cached_file = [
        '/',
        'js/main.js',
        'js/restaurant_info.js',
        'js/dbhelper.js',
        'data/restaurants.json',
        'css/styles.css',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg'
];

var Cached_name = 'restaurant-static-v1';

/*install*/
self.addEventListener('install', function(event) {
  console.log('  service worker has installed ');
  event.waitUntil(
    caches.open(Cached_name).then(function(cache) {
      return cache.addAll(cached_file);
    })
  );
});

/*fetch*/
self.addEventListener('fetch', function(event) {
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

/*activate*/
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(cachesName){
            return Promise.all(cachesName.filter(function(cacheName){
                return cacheName.startsWith('restaurant-')&& cacheName!=Cached_name;
                }).map(function(cacheName){
                  return caches.delete(cacheName);
                })
                );
          })
        );
  });