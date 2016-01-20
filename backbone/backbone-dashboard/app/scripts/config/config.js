/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var config = {
	version: '@@@version',
	releaseStage: '@@@env',
	date: '@@@date',
	commit: '@@@commit',
	debug: '@@@debug',

	locale: (window.navigator.language || window.navigator.browserLanguage).split('-')[0],
	mapsUrl: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCFnmJL_3MvyPry_KzHkRgHeMzUP4sk9_s&callback=onLoadGoogleApiCallback&sensor=false&language=en-US',
	root: ''
};

Object.freeze(config);
console.debug('Config: ', config);

module.exports = config;