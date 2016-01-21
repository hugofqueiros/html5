/**
 * Created by hfq on 29/12/15.
 */
'use script';

var App = require('app');

function Router() {
	if (!(this instanceof Router)) {
		return new Router();
	}

	App.route('/', this.home.bind(this));
	App.route('/home', this.home.bind(this));
	App.route('/overview', this.overview.bind(this));
	App.route('/contact', this.contact.bind(this));
	App.route('/map', this.map.bind(this));
}

module.exports = Router;

Router.prototype.home = function() {
	console.debug('Overview Route');

	var Section = require('./home/home');

	App.showContent(new Section({

	}));
};

Router.prototype.overview = function() {
	console.debug('Overview Route');

	var Section = require('./overview/views/overview');
	var Model = require('./overview/models/overview');

	var model = new Model();

	App.showContent(new Section({
		model: model
	}));
};

Router.prototype.map = function() {
	console.debug('Map Route');

	var Section = require('./map/map');

	App.showContent(new Section({

	}));
};

Router.prototype.contact = function() {
	console.debug('Contact Route');

	var Section = require('./contact/contact');

	App.showContent(new Section({

	}));
};
