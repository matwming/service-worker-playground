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
    return new Response("<h1>Oops</h1><p>some thing went wrong</p>", {
     headers: {
      "Content-type": "text/html; charset=utf-8"
     }
    });
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
