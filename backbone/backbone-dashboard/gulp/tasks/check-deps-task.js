/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var gulp = require('gulp');
var p = require('gulp-load-plugins')();
var handleError = require('../utils/handle-errors');

var checkDepsTask = function(src, dest) {
	return gulp.src('package.json')
		.on('error', handleError)
		.pipe(p.david({
			error404: false,
			errorDepType: false,
			errorSCM: false,
			registry: null,
			unstable: false,
			update: false
		}))
		.pipe(p.david.reporter)
		.pipe(gulp.dest('.'));
};

module.exports = checkDepsTask;