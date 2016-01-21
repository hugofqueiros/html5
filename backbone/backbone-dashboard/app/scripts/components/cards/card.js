/**
 * Created by hfq on 29/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');
var cardTypes = require('./card-options').cardTypes;
var chartTypes = require('./card-options').chartTypes;
var chartTypesOptions = require('./card-options').chartTypesOptions;
var _ = require('lodash');
var Intl = require('app').Intl;

module.exports = Marionette.ItemView.extend({
	initialize: function() {
		this.title = this.options.title ? this.options.title : '';
		this.footer = this.options.footer ? this.options.footer : null;
		this.icon = this.options.icon ? this.options.icon : null;
		this.cardType = this.options.cardType ? this.options.cardType : 'default';

		this.mainValue = this.options.mainValue ? this.options.mainValue : _.random(1000, 10000);
		this.compValue = this.options.compareValue ? this.options.compareValue : _.random(500, 5000);
		this.diff = this.mainValue - this.compValue;
		this.percentage = Intl.percentage((this.mainValue - this.compValue) / this.compValue);

		this.chart = null;
		this.chartType = this.options.chartType ? this.options.chartType : null;
		this.series = this.options.series ? this.options.series : null;
	},

	template: require('./card.tpl'),

	serializeData: function() {
		return {
			cardType: this.cardType,
			title: this.title,
			footer: this.footer,
			mainValue: this.mainValue,
			compValue: this.compValue,
			diff: this.diff,
			percentage: this.percentage
		}
	},

	ui: {
		chart: '.chart'
	},

	events: {
	},

	onShow: function() {
		if (this.cardType === cardTypes.chart) {
			var options = _.merge(chartTypesOptions[this.chartType + 'Options'](this.series), {
				chart: {
					renderTo: this.ui.chart[0]
				}
			});

			setTimeout(function () {
				this.chart = new Highcharts.Chart(options);
				this.chart.reflow();
			}.bind(this), 0);
		}
	}
});