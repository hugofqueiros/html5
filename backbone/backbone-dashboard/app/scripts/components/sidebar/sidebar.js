/**
 * Created by hfq on 29/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');

module.exports = Marionette.ItemView.extend({
	initialize: function() {
		this.listenTo(App.state, 'change:route', function (value) {
			console.log('change route', value);
		});
	},

	template: require('./sidebar.tpl'),

	serializeData: function() {

	},

	ui: {
		sidebarContainer: '.sidebar-container',
		sidebarContainerListItems: '.sidebar-container-list-items'
	},

	events: {
		'click @ui.sidebarContainer': function(e) {
			console.log('clicks', e, e.target, e.target.classList.add('active'));

			console.log('list', this.ui.sidebarContainerListItems);
			//e.preventDefault();
			//e.stopPropagation();

			e.target.classList.add('active');
		}
	},

	onShow: function() {

	}
});