/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var gulp = require('gulp');
var p = require('gulp-load-plugins')();
var gif = require('gulp-if');

var svgsTask = function(src, dest, reload, optimize) {
	return gulp.src(src)
		.pipe(p.svgmin({
			plugins: [{
				removeDesc: true
			},
				{
					convertColors: {
						rgb2hex: true
					}
				},
				{
					removeComments: false
				},
				{
					cleanupNumericValues: {
						floatPrecision: 2
					}
				}
			]
		}))
		.pipe(p.svgSymbols())
		.pipe(gulp.dest(dest))
		.pipe(p.size({title: 'svg'}))
		.pipe(gif(!optimize, reload({stream: true})));
};

module.exports = svgsTask;