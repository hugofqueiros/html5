var module1 = require('./module1.js');
var css = require('style!css!./style.css');

var random = Math.random();

console.log('main,js', random);
document.write('<div class="main">main</div>');
