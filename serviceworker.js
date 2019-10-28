const version = "v0.04";
const staticCacheName = version + "statisfiles";

addEventListener("fetch", fetchEvent => {
 //console.log("service worker is listening to fetch events", fetchEvent);
 //console.log("fetch requests", fetchEvent.request);
 const request = fetchEvent.request;
 fetchEvent.respondWith(
  caches.match(request).then(responseFromCache => {
   if (responseFromCache) {
    return responseFromCache;
   }
   return fetch(request).catch(error => {
    return caches.match("/offline.html");
   });
  })
 );
});

addEventListener("install", installEvent => {
 console.log("service worker is installing");
 skipWaiting();
 installEvent.waitUntil(
  caches.open(staticCacheName).then(staticCache => {
   return staticCache.addAll(["/styles.css", "/offline.html"]);
  })
 );
});
addEventListener("activate", activateEvent => {
 console.log("service worker is activated");
 activateEvent.waitUntil(
  caches
   .keys()
   .then(cacheNames => {
    return Promise.all(
     cacheNames.map(cacheName => {
      if (cacheName !== staticCacheName) {
       return caches.delete(cacheName);
      }
     })
    );
   })
   .then(() => {
    return clients.claim();
   })
 );
});
