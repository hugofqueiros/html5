/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var fs = require('fs');
var pkg = require('../../package.json');
var path = require('path');
var moment = require('moment');
var gutil = require('gulp-util');
var args = gutil.env;
var env = gutil.env.env;
var exec = require('child_process').exec;

var appData = {
	version: pkg.version,
	env: env || 'local dev',
	date: moment.utc().format(),
	debugEnv: !(env === 'production'),
	hash: function () {
		exec('git rev-parse --short=10 HEAD', function (err, stdout, stderr) {
			var lastCommit = stdout.trim();
			if (err) {
				return handleError(err);
			} else {
				gutil.log('LAST COMMIT');
				return lastCommit;
			}
		});
	}
};

module.exports = appData;
