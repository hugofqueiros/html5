self.addEventListener('fetch', function(event) {
	event.respondWith(
		new Response('Hello world')
	);


	// console.log('YO Fetch event, log request: ', event.request);
});
