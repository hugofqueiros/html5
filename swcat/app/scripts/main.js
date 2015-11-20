'use strict';

console.time('Startup Total');
console.time('Startup Loading');

require('./globals');

var App = require('./modules/app');

console.timeEnd('Startup Loading');
console.time('Startup Routing');

// Routing
App.router.base(App.config.root);

require('./modules/router')();

App.start();
App.router.start();

console.timeEnd('Startup Routing');
console.timeEnd('Startup Total');