/**
 * Created by hfq on 29/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView.extend({
	initialize: function(options) {
		this.model = options.model;

		this.value = [0, ''];

		this.listenTo(this.model, 'change:visits', function(value) {
			this.value = value.get('visits');
			console.log('value', this.value);
		}.bind(this));
	},

	template: require('../templates/overview.tpl'),

	regions: {

	},

	serializeData: function() {
		return {
			value: this.value
		}
	},

	onShow: function() {
	}
});
