/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');
var App = module.exports = new Marionette.Application();
var Config = require('../config/config');
var Router = require('page');
var State = require('./state');
var Intl = require('../utils/intl');

App.config = Config;
App.state = new State();
App.router = Router;
App.Intl = new Intl();

console.debug('Debug Env: ', Config.debug);

App.addRegions({
	body: '#app'
});

App.addInitializer(function() {
	var Layout = require('./../layout/layout');
	App.layout = new Layout();
	App.getRegion('body').show(App.layout);
});

App.go = function(path) {
	console.debug('Go: ', path);
	if ('string' === typeof path) {
		Router.apply(Router, arguments);
	}
};

App.route = function(path, fn) {
	if('function' === typeof fn) {
		console.debug('ROUTE: ', path, fn);
		Router.apply(Router, arguments);
	}
};

App.showContent = function(view) {
	App.layout.content.show(view);
};
