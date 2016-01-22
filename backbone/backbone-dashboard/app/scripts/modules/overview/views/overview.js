/**
 * Created by hfq on 29/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');
var Intl = require('app').Intl;
var chartTypes = require('./../../../components/cards/card-options').chartTypes;
var chartTypesOptions = require('./../../../components/cards/card-options').chartTypesOptions;
var m = require('moment');

module.exports = Marionette.LayoutView.extend({
	initialize: function (options) {
		this.model = options.model;

		this.value = [0, 'nice'];


	},

	template: require('../templates/overview.tpl'),

	ui: {
		chart: '.chart',
		cardBodyValueRealtimeNumber: '.card-body-value-realtime-number',
		cardBodyValueRealtimeDate: '.card-body-value-realtime-date'
	},

	regions: {
		realtimeCard: '#realtimeCard'
	},

	serializeData: function () {
		return {
			value: this.value
		}
	},

	onShow: function () {

		this.listenTo(this.model, 'change:visits', function (value) {
			var temp = value.get('visits');

			this.value[0] = Intl.number(temp[0]);
			this.value[1] = temp[1];

			console.log('value', this.value, this.ui.cardBodyValueRealtimeNumber);
			this.ui.cardBodyValueRealtimeNumber.text(this.value[0]);
			this.ui.cardBodyValueRealtimeDate.text(this.value[1]);
			//this.render();
		}.bind(this));

/*		this.series = [{
			name: 'visits',
			data: [[m('2014-11-01T00:00:00.000Z').utc().valueOf(), 4],
				[m('2014-12-01T00:00:00.000Z').utc().valueOf(), 5],
				[m('2015-01-01T00:00:00.000Z').utc().valueOf(), 20],
				[m('2015-02-01T00:00:00.000Z').utc().valueOf(), 30],
				[m('2015-03-01T00:00:00.000Z').utc().valueOf(), 60],
				[m('2015-04-01T00:00:00.000Z').utc().valueOf(), 70],
				[m('2015-05-01T00:00:00.000Z').utc().valueOf(), 100],
				[m('2015-06-01T00:00:00.000Z').utc().valueOf(), 210],
				[m('2015-07-01T00:00:00.000Z').utc().valueOf(), 400],
				[m('2015-08-01T00:00:00.000Z').utc().valueOf(), 500],
				[m('2015-09-01T00:00:00.000Z').utc().valueOf(), 746]]
		}];
		var options = _.merge(chartTypesOptions[chartTypes.line + 'Options'](this.series), {
			chart: {
				renderTo: this.ui.chart[0],
				events: {
					load: function () {
						series.addPoint([this.value[1], this.value[0]], true, true);
						// set up the updating of the chart each second
/!*						var series = this.series[0];
						setInterval(function () {
							var x = (new Date()).getTime(), // current time
									y = Math.random();
							series.addPoint([x, y], true, true);
						}, 1000);*!/
					}
				}
			}
		});

		setTimeout(function () {
			var chart = new Highcharts.Chart(options);
			chart.reflow();
		}.bind(this), 0);*/

	}
});
