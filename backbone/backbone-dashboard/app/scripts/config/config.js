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

	root: ''
};

Object.freeze(config);
console.debug('Config: ', config);

module.exports = config;