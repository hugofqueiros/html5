/**
 * Created by hfq on 29/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');
var cardTypes = require('./card-options').cardTypes;
var chartTypes = require('./card-options').chartTypes;
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
		console.log('cenas', this.cardType, cardTypes.chart);
		if (this.cardType === cardTypes.chart) {
			console.log('coco');
			var options = _.merge(this[this.chartType + 'Options'](), {
				chart: {
					renderTo: this.ui.chart[0]
				}
			});

			setTimeout(function () {
				this.chart = new Highcharts.Chart(options);
				this.chart.reflow();
			}.bind(this), 0);
		}
	},

	lineOptions: function () {
		console.log('line');
		return {
			chart: {
				type: 'line'
			},
			tooltip: {
				shared: true
			},
			xAxis: {
				type: 'datetime',
				tickInterval: 30.41667 * 24 * 3600 * 1000,
				title: {
					text: null
				},
				lineColor: '#E4ECF2',
				tickColor: '#E4ECF2',
				labels: {
					style: {
						fontSize: '10px'
					}
					//y:     25
				},
				dateTimeLabelFormats: {
					//month: '%b \'%y'
					//month: '%e. %b',
					//year: '%b'
					millisecond: '%H:%M:%S.%L',
					second: '%H:%M:%S',
					minute: '%H:%M',
					hour: '%H h',//:%M',
					day: '%a %e',
					week: '%e %b.',
					month: '%b \'%y',
					year: '%Y'
				}
			},
			series: this.series
		}
	},

	areaSplineOptions: function () {
		return {
			chart: {
				type: 'areaspline'
			},
			xAxis: {
				type: 'datetime',
				tickInterval: 30.41667 * 24 * 3600 * 1000,
				title: {
					text: null
				},
				lineColor: '#E4ECF2',
				tickColor: '#E4ECF2',
				labels: {
					style: {
						fontSize: '10px'
					}
					//y:     25
				},
				dateTimeLabelFormats: {
					//month: '%b \'%y'
					//month: '%e. %b',
					//year: '%b'
					millisecond: '%H:%M:%S.%L',
					second: '%H:%M:%S',
					minute: '%H:%M',
					hour: '%H h',//:%M',
					day: '%a %e',
					week: '%e %b.',
					month: '%b \'%y',
					year: '%Y'
				}
			},
			series: this.series
		}
	}
});