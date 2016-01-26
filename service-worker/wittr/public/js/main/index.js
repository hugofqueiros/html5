import loadScripts from '../utils/loadScripts';
import IndexController from './IndexController';

const polyfillsNeeded = [];

if (!('Promise' in self)) polyfillsNeeded.push('/js/polyfills/promise.js');

try {
  new URL('b', 'http://a');
}
catch (e) {
  polyfillsNeeded.push('/js/polyfills/url.js');
}

/**
 * most work is in IndexController
 */
loadScripts(polyfillsNeeded, function() {
  new IndexController(document.querySelector('.main'));
});