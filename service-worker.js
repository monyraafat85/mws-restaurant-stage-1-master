
//cached all file in variables cached_file
var cached_file = [
        '/',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/data/restaurants.json',
        '/css/styles.css',
         'restaurant.html',
         'index.html',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
];

var Cached_name = 'restaurant-static-v1';

/*install services worker*/
self.addEventListener('install', function(e) {
  console.log('success Installation ');
  e.waitUntil(
    caches.open(Cached_name).then(function(cache) {
      return cache.addAll(cached_file);
    })
  );
});
/*fetch services worker*/
self.addEventListener('fetch', function(e) {
  console.log('Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
/*activate services worker*/
self.addEventListener('activate', function(e) {
  console.log('Activated');
  e.waitUntil(
    caches.keys().then(function(caches_Name) {
      return Promise.all(caches_Name.map(function(cache_Name) {
        if (cache_Name!=Cached_name) {
          return caches.delete(cache_Name);
        }
      }));
    })
  );
  return self.clients.claim();
});