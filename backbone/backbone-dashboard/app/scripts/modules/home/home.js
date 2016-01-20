/**
 * Created by hfq on 29/12/15.
 */
'use strict';

var Marionette = require('backbone.marionette');
var Card = require('../../components/cards/card');
var _ = require('lodash');
var m = require('moment');

module.exports = Marionette.LayoutView.extend({
	initialize: function () {

	},

	template: require('./home.tpl'),

	regions: {
		visits: '#visits',
		pageviews: '#pageviews',
		users: '#users',
		sessions: '#sessions',
		homeChart: '#homeChart',
		visitsChart: '#visitsChart',
		pageviewsChart: '#pageviewsChart'
	},

	serializeData: function () {
		return {}
	},

	onShow: function () {
		this.visits.show(new Card({
			title: 'Visits',
			mainValue: _.random(1000, 10000),
			compareValue: _.random(1000, 10000)
		}));

		this.pageviews.show(new Card({
			title: 'Page Views',
			mainValue: _.random(1000, 10000),
			compareValue: _.random(1000, 10000)
		}));

		this.users.show(new Card({
			title: 'Users',
			mainValue: _.random(1000, 10000),
			compareValue: _.random(1000, 10000)
		}));

		this.sessions.show(new Card({
			title: 'Sessions',
			mainValue: _.random(1000, 10000),
			compareValue: _.random(1000, 10000)
		}));

		this.homeChart.show(new Card({
			cardType: 'chart',
			chartType: 'line',
			title: 'Chart',
			series: [
				{
					name: 'visits',
					data: [[m('2014-11-01T00:00:00.000Z').utc().valueOf(), 10],
						[m('2014-12-01T00:00:00.000Z').utc().valueOf(), 20],
						[m('2015-01-01T00:00:00.000Z').utc().valueOf(), 30],
						[m('2015-02-01T00:00:00.000Z').utc().valueOf(), 50],
						[m('2015-03-01T00:00:00.000Z').utc().valueOf(), 90],
						[m('2015-04-01T00:00:00.000Z').utc().valueOf(), 120],
						[m('2015-05-01T00:00:00.000Z').utc().valueOf(), 230],
						[m('2015-06-01T00:00:00.000Z').utc().valueOf(), 180],
						[m('2015-07-01T00:00:00.000Z').utc().valueOf(), 350],
						[m('2015-08-01T00:00:00.000Z').utc().valueOf(), 182],
						[m('2015-09-01T00:00:00.000Z').utc().valueOf(), 209]]
				},
				{
					name: 'page views',
					data: [[m('2014-11-01T01:32:21.196Z').utc().valueOf(), 20],
						[m('2014-12-01T00:00:00.000Z').utc().valueOf(), 60],
						[m('2015-01-01T00:00:00.000Z').utc().valueOf(), 53],
						[m('2015-02-01T00:00:00.000Z').utc().valueOf(), 95],
						[m('2015-03-01T00:00:00.000Z').utc().valueOf(), 102],
						[m('2015-04-01T00:00:00.000Z').utc().valueOf(), 154],
						[m('2015-05-01T00:00:00.000Z').utc().valueOf(), 124],
						[m('2015-06-01T00:00:00.000Z').utc().valueOf(), 402],
						[m('2015-07-01T00:00:00.000Z').utc().valueOf(), 340],
						[m('2015-08-01T00:00:00.000Z').utc().valueOf(), 254],
						[m('2015-09-01T00:00:00.000Z').utc().valueOf(), 382]]
				},
				{
					name: 'users',
					data: [[m('2014-11-01T01:32:21.196Z').utc().valueOf(), 13],
						[m('2014-12-01T00:00:00.000Z').utc().valueOf(), 70],
						[m('2015-01-01T00:00:00.000Z').utc().valueOf(), 84],
						[m('2015-02-01T00:00:00.000Z').utc().valueOf(), 101],
						[m('2015-03-01T00:00:00.000Z').utc().valueOf(), 130],
						[m('2015-04-01T00:00:00.000Z').utc().valueOf(), 160],
						[m('2015-05-01T00:00:00.000Z').utc().valueOf(), 213],
						[m('2015-06-01T00:00:00.000Z').utc().valueOf(), 208],
						[m('2015-07-01T00:00:00.000Z').utc().valueOf(), 278],
						[m('2015-08-01T00:00:00.000Z').utc().valueOf(), 320],
						[m('2015-09-01T00:00:00.000Z').utc().valueOf(), 365]]
				},
				{
					name: 'sessions',
					data: [[m('2014-11-01T01:32:21.196Z').utc().valueOf(), 54],
						[m('2014-12-01T00:00:00.000Z').utc().valueOf(), 39],
						[m('2015-01-01T00:00:00.000Z').utc().valueOf(), 78],
						[m('2015-02-01T00:00:00.000Z').utc().valueOf(), 201],
						[m('2015-03-01T00:00:00.000Z').utc().valueOf(), 230],
						[m('2015-04-01T00:00:00.000Z').utc().valueOf(), 90],
						[m('2015-05-01T00:00:00.000Z').utc().valueOf(), 140],
						[m('2015-06-01T00:00:00.000Z').utc().valueOf(), 156],
						[m('2015-07-01T00:00:00.000Z').utc().valueOf(), 287],
						[m('2015-08-01T00:00:00.000Z').utc().valueOf(), 382],
						[m('2015-09-01T00:00:00.000Z').utc().valueOf(), 289]]
				}]
		}));

		this.visitsChart.show(new Card({
			cardType: 'chart',
			chartType: 'areaSpline',
			title: 'Visits Chart',
			series: [{
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
			}]
		}));

		this.pageviewsChart.show(new Card({
			cardType: 'chart',
			chartType: 'areaSpline',
			title: 'Page Views Chart',
			series: [{
				name: 'page views',
				data: [[m('2014-11-01T01:32:21.196Z').utc().valueOf(), 3],
					[m('2014-12-01T00:00:00.000Z').utc().valueOf(), 4],
					[m('2015-01-01T00:00:00.000Z').utc().valueOf(), 20],
					[m('2015-02-01T00:00:00.000Z').utc().valueOf(), 30],
					[m('2015-03-01T00:00:00.000Z').utc().valueOf(), 60],
					[m('2015-04-01T00:00:00.000Z').utc().valueOf(), 70],
					[m('2015-05-01T00:00:00.000Z').utc().valueOf(), 100],
					[m('2015-06-01T00:00:00.000Z').utc().valueOf(), 210],
					[m('2015-07-01T00:00:00.000Z').utc().valueOf(), 400],
					[m('2015-08-01T00:00:00.000Z').utc().valueOf(), 500],
					[m('2015-09-01T00:00:00.000Z').utc().valueOf(), 746]]
			}]
		}));
	}
});