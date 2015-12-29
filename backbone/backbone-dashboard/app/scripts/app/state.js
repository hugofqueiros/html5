/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		route: null,
		config: {},
		user: {

		}
	}
});