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

		this.value = [0, ''];
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

		var _this = this;
		var series = [{
			name: 'visits',
			data: [[m().utc().valueOf(), 0]]
		}];
		var options = _.merge(chartTypesOptions[chartTypes.line + 'Options'](series), {
			chart: {
				renderTo: this.ui.chart[0],
				animation: Highcharts.svg,
				events: {
					load: function () {
						var _this2 = this;

						_this.listenTo(_this.model, 'change:visits', function (value) {
							var temp = value.get('visits');

							var seriesTemp = _this2.series[0];
							console.log('cenas', temp[1]);

							seriesTemp.addPoint([m().utc().valueOf(), temp[0]], true, true);


/*							this.value[0] = Intl.number(temp[0]);
							this.value[1] = temp[1];

							console.log('value', this.value, this.ui.cardBodyValueRealtimeNumber);
							this.ui.cardBodyValueRealtimeNumber.text(this.value[0]);
							this.ui.cardBodyValueRealtimeDate.text(this.value[1]);*/
							//this.render();
						}.bind(this));


						// set up the updating of the chart each second
/*						var series = this.series[0];
						setInterval(function () {
							var x = (new Date()).getTime(), // current time
									y = Math.random();
							series.addPoint([x, y], true, true);
						}, 1000);*/
					}
				}
			}
		});

		setTimeout(function () {
			var chart = new Highcharts.Chart(options);
			chart.reflow();
		}.bind(this), 0);

	}
});
