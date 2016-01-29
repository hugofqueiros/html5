self.addEventListener('install', function(event) {
	var urlsToCache = [
		'/',
		'js/main.js',
		'css/main.css',
		'imgs/icon.png',
		'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
		'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
	];

	event.waitUntil(
		// TODO: open a cache named 'wittr-static-v1'
		// Add cache the urls from urlsToCache
		caches.open('wittr-static-v1').then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log('event.request.url', event.request);

/*	event.respondWith(
		new Response('Hello <b>world</b>')
	);*/

	// TODO: respond to all requests with an html response
	// containing an element with class="a-winner-is-me".
	// Ensure the Content-Type of the response is "text/html"
	//console.log('cenas', event.request);


	//event.request.url
	//event.request.method
	//event.request.headers
	//event.request.body

	// Test html-response
/*	event.respondWith(
		new Response('<p class="a-winner-is-me">Hello from your friendly neighbourhood service worker!</p>', {
			headers: { 'Content-Type': 'text/html' }
		})
	);*/

	// TODO: only respond to requests with a
	// url ending in ".jpg"
/*	if (event.request.url.endsWith('.jpg')) {
		event.respondWith(
			fetch('/imgs/dr-evil.gif')
		);
	}*/

/*	// TODO ERROR Handling
	event.respondWith(
		fetch(event.request).then(function(response) {
			if (response.status == 404) {
				// TODO: instead, respond with the gif at
				// /imgs/dr-evil.gif
				// using a network request
				return fetch('/imgs/dr-evil.gif');
			}
			console.log('coco', response);
			return response;
		}).catch(function() {
			// fail to fetch
			return new Response('Uh oh, that totally failed');
		})
	)*/

	event.respondWith(
		caches.match(event.request).then(function(response) {
			if(response) return response;
			return fetch(event.request);
		})
	)
});

