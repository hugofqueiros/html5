/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var gulp = require('gulp');
var p = require('gulp-load-plugins')();

var deployTask = function(src, dest) {
	return gulp.src(src)
		.pipe(p.rsync({
			destination: dest, // '~/path/to/my/website/root/',
			root: src, //'/build/**',
			hostname: 'me@mydomain.com',
			progress: true,
			recursive: true
		}));
};

module.exports = deployTask;