/**
 * Created by hfq on 22/12/15.
 */

'use strict';

var appData = require('./app-data');

var rep = {
	config: [
		{
			pattern: '@@@env',
			replacement: appData.env
		},
		{
			pattern: '@@@version',
			replacement: appData.version
		},
		{
			pattern: '@@@date',
			replacement: appData.date
		},
		{
			pattern: '@@@commit',
			replacement: appData.hash()
		},
		{
			pattern: '@@@debug',
			replacement: appData.debugEnv
		}
	]
};

module.exports = rep;