/**
 * Created by hfq on 20/01/16.
 */
'use strict';

var Backbone = require('backbone');
var moment = require('moment');
var _ = require('lodash');

module.exports = Backbone.Model.extend({
	defaults: {
		visits: [0, '']
	},

	initialize: function() {
		setInterval(function() {
			var time = moment.utc().format('MMM Do YYYY, h:mm:ss'); // current time
			var visits = _.random(10, 100);
			this.set('visits', [visits, time]);
		}.bind(this), 1000)
	}
});
