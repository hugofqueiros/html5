/**
 * Created by hfq on 20/01/16.
 */
'use strict';

var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.Model.extend({
	defaults: {
		visits: [0, '']
	},

	initialize: function() {
		console.log('model');

		setInterval(function() {
			var time = moment.utc().valueOf(); // current time
			var visits = Math.random(10, 100);
			this.set('visits', [visits, time]);
		}.bind(this), 1000)
	}
});
