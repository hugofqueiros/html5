/**
 * Created by hfq on 17/01/16.
 */
'use strict';

var opts = {
	cardTypes: {
		default: 'default',
		chart: 'chart'
	},
	chartTypes: {
		areaSpline: 'areaspline',
		line: 'line'
	},
	chartTypesOptions: {
		lineOptions: function (series) {
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
				series: series
			}
		},
		areasplineOptions: function (series) {
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
				series: series
			}
		}
	}
};

Object.freeze(opts);

module.exports = opts;