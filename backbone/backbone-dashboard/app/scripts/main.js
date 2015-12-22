'use strict';

console.time('Startup Total');
console.time('Startup Loading');

require('./app/globals');


console.timeEnd('Startup Routing');
console.timeEnd('Startup Total');