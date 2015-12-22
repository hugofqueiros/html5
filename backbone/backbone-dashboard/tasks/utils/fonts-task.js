/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var gulp = require('gulp');
var p = require('gulp-load-plugins')();
var gif = require('gulp-if');

var fontsTask = function(src, dest, reload, optimize) {
	return gulp.src(src)
		.pipe(gulp.dest(dest))
		.pipe(p.size({
			title: 'FONTS'
		}))
		.pipe(gif(!optimize, reload({stream: true})));
};

module.exports = fontsTask;