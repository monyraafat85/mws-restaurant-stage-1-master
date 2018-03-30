/* cached all file in variables cached_file*/
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

/*install services worker*/
self.addEventListener('install', function(ev) {
  console.log('  service worker has installed ');
  ev.waitUntil(
    caches.open(Cached_name).then(function(cache) {
      return cache.addAll(cached_file);
    })
  );
});

/*fetch services worker*/
self.addEventListener('fetch', function(ev) {
  console.log(ev.request);
  ev.respondWith(
    caches.match(ev.request).then(function(response) {
      return response || fetch(ev.request);
    })
  );
});

/*activate services worker*/
self.addEventListener('activate', function (ev) {
    ev.waitUntil(
        caches.keys().then(function(caches_Name){
            return Promise.all(caches_Name.filter(function(cache_Name){
                return cache_Name.startsWith('restaurant-')&& cache_Name!=Cached_name;
                }).map(function(cache_Name){
                  return caches.delete(cache_Name);
                })
                );
          })
        );
  });