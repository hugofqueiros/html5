# Service Worker

## notes
https://adactio.com/journal/10186

## Samples
https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker

## libs
https://www.talater.com/upup/

## isserviceworkerrady

## toknow

requests
page -> Service Worker -> HTTP Cache -> Internet

1. Specify Scope 
navigator.serviceWorker.register('sw.js', {scope: '/foo/'})
scope is what the url that the service worker will control, for example:
it will control: '/foo/'    '/foo/bar/index.html
it won't control: '/foo'    '/'    'foo.html'

2. Don't Specify Scope 
navigator.serviceWorker.register.register('/foo/sw.js')

- The service worker will work on page URLs that reside in the same directory as the service worker script.
- The directory the service worker sits in ('/foo/')

This service worker:
will control: '/foo'    '/foo/sw'      '/foo/'
won't control: '/foo/sw.html'     '/sw/'  
  
3. All fetchs will pass through the service worker

4. Works only in https and on localhost

5. Old service worker doesn't stop working with refresh... all instances of the window (page)
must be closed in order to the service worker to be stopped.

6. keep the service worker very little not more than a day, ideally 0.

7. type self.registration on console (change context of the console to sw.js - only available on google canary/chromium)

8. Service workers have their own panel on dev tools resources (chromium)

9. SHIFT + reload bypasses the service worker

10. Dev tools Sources tab you can check update on page load

11. Fetch manages responses from web
You could add string 'Hello World' -> it will be replied as plain text

12. Create responses ourselfs without using the network ourselfs, with need somewhere to store the HTML, css, js, images
cache API
caches.open('my-stuff').then(function(cache) {
}
returns a promise of a cache with that name
store things from our own origin and from elsewhere (request!response)

cache.put(request, response);
or use
cache.addAll([
    '/foo',
    '/bar'
])

this operation is atomic, if any of these fail to cache, none is cached

if we want to get something from the cache use .match(request)
cache.match(request); -> returns a promise from a matching response

caches.match(resquest); -> does the same but it tryes to find a match in any cache

13. when should we store the cache, in -> event install
install event fired the first time the browser installs a service worker

	event.waitUntil() -> returns promise

if the install fails the service worker should be discarded

- check cache on dev tools on Resources - Cache Storage