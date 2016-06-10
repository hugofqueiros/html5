/**
 * Created by hfq on 22/12/15.
 */

console.time('Startup Globals');

require('./../utils/polyfills');

var Backbone = require('backbone');
var _ = require('lodash');
var jquery = require('jquery');
var Config = require('./../config/config');

/**
 * Globals
 * @type {jQuery|exports|module.exports}
 */
window.$ = window.jQuery = Backbone.$ = jquery;
window._ = _;
window.Backbone = Backbone;

window.addEventListener('unhandledrejection', function (e) {
	e.preventDefault();
	var reason = e.detail.reason;
	console.error(reason.stack);
	// Bugsnag.notifyException(reason, null, {error: reason}, 'error');
});

require('bootstrap');
require('modernizr');

var highcharts = require('highcharts');
window.Highcharts = highcharts;

require('highcharts-data');
require('highcharts-no-data');
require('highcharts-boost');
require('highcharts-exporting');
Highcharts.setOptions(require('../config/highcharts-config'));

console.timeEnd('Startup Globals');
