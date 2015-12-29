/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var App = require('app');
var State = require('./state');
var moment = require('moment');
var URI = require('urijs');
var Config = require('../config/config');

function Router() {
	if (!(this instanceof Router)) {
		return new Router();
	}

	App.state = new State();

	this.blacklist = ['/test'];

	App.route('*', this.all.bind(this));
	App.route('/', this.root.bind(this));
}

module.exports = Router;

Router.prototype.all = function (ctx, next) {
	if (App.state.get('route') !== ctx.pathname) {
		App.state.set('route', ctx.pathname);
		if (!_.contains(this.blacklist)) {
			next();
		}
	}
};

Router.prototype.root = function (ctx, next) {
	console.debug('Root Route: ', ctx);
};