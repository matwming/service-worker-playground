addEventListener("fetch", fetchEvent => {
 //console.log("service worker is listening to fetch events", fetchEvent);
 //console.log("fetch requests", fetchEvent.request);
 const request = fetchEvent.request;
 fetchEvent.respondWith(
  fetch(request)
   .then(responseFromFetch => {
    return responseFromFetch;
   })
   .catch(error => {
    return new Response("something is wrong");
   })
 );
 fetchEvent.respondWith(new Response("Hello world"));
});

addEventListener("install", () => {
 console.log("service worker is installing");
});
addEventListener("activate", () => {
 console.log("service worker is activated");
});
