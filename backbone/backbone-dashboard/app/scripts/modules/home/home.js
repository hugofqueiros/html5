/**
 * Created by hfq on 29/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');
var Card = require('../../components/cards/card');

module.exports = Marionette.LayoutView.extend({
	initialize: function() {

	},

	template: require('./home.tpl'),

	regions: {
		card1: '#card1'
	},

	serializeData: function() {
		return {

		}
	},

	onShow: function() {
		this.card1.show(new Card({

		}));
	}
});