'use strict';

console.time('Startup Total');
console.time('Startup Loading');

require('./app/globals');

var App = require('./app/app');
var moment = require('moment');

console.info('Lander Dashboard: ' + App.config.version + ' Release Date: ' + App.config.date);

console.timeEnd('Startup Loading');
console.time('Startup Routing');

require('./app/router')();

// Routing
App.router.base(App.config.root);
App.start();
App.router.start();

console.timeEnd('Startup Routing');
console.timeEnd('Startup Total');