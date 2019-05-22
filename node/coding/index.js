const http = require('http');
const url = require('url');

const server = http.createServer(function(req, res) {
    // Parse the url
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the HTTP method
    const method = req.method.toLowerCase();

    res.end('Hello World!\n');

    // Log the request/response
    console.log('Request received on path: ' + trimmedPath + ' with method: ' + method);
});

server.listen(3000, function() {
    console.log('The server is listening on port 3000 now');
});
