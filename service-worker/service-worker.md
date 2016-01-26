# Service Worker

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