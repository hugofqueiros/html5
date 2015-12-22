/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var gulp = require('gulp');
var p = require('gulp-load-plugins')();
var gif = require('gulp-if');
var pngquant = require('imagemin-pngquant');

var imagesTask = function (src, dest, reload, optimize) {
	return gulp.src(src)
		.pipe(p.imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			verbose: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest(dest))
		.pipe(p.size({title: 'images'}))
		.pipe(gif(!optimize, reload({stream: true})));
};

module.exports = imagesTask;
