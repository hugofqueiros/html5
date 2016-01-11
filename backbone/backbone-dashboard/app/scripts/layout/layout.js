/**
 * Created by hfq on 29/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');
var Config = require('../config/config');
var _ = require('lodash');
var App = require('app');
var Sidebar = require('../components/sidebar/sidebar');
var PanelHeader = require('../components/panel-header/panel-header');

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
		sidebar: '.sidebar',
		panel: '.panel-main',
		panelHeader: '.panel-header',
		content: '.panel-content'
	},

	ui: {
		sidebar: '.sidebar',
		panel: '.panel-main',
		panelHeader: '.panel-header',
		content: '.panel-content'
	},

	onRender: function() {
		//this.sidebar = new Sidebar();
		this.sidebar.show(new Sidebar());
		this.panelHeader.show(new PanelHeader());
	},

	onShow: function() {


		console.log('Layout');
	}
});