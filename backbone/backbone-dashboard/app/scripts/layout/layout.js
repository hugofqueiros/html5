/**
 * Created by hfq on 29/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');
var Config = require('../config/config');
var _ = require('lodash');
var App = require('app');
var Sidebar = require('../components/sidebar/sidebar');

module.exports = Marionette.LayoutView.extend({
	initialize: function() {
		//this.sidebar = null;
	},

	serializeData: function() {
		return {

		}
	},

	template: require('./layout.tpl'),

	regions: {
		sidebar: '#sidebar',
		content: '#content'
	},

	ui: {
		sidebar: '#sidebar',
		content: '#content'
	},

	onRender: function() {
		//this.sidebar = new Sidebar();
		this.sidebar.show(new Sidebar());
		console.log('Render');
	},

	onShow: function() {


		console.log('Layout');
	}
});