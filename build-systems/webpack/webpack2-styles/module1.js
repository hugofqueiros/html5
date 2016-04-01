var module2 = require('./module2.js');
var css = require('style!css!./style1.css');

console.log('module1.js -> module2 require', module2);
document.write('<div class="style1">style1</div>');
