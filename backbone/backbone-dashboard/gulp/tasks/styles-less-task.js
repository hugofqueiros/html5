/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var gulp = require('gulp');
var gif = require('gulp-if');
var cleancss = require('gulp-minify-css');
var combiner = require('stream-combiner2');
var p = require('gulp-load-plugins')();

var AUTOPREFIXER_BROWSERS = [
	'ie >= 8',
	'ie_mob >= 8',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

var styleLessTask = function(src, dest, reload, optimize) {
	var stream = combiner.obj([
		gulp.src(src),
		gif(!optimize, p.sourcemaps.init()),
		p.less(),
		cleancss(),
		p.autoprefixer({
			//browsers: ['last 2 versions'],
			browsers: AUTOPREFIXER_BROWSERS,
			cascade: false
		}),
		gif(!optimize, p.sourcemaps.write('.', {includeContent: false, sourceRoot: './front_end/styles'})),
		gulp.dest(dest),
		p.size({title: 'CSS', showFiles: true}),
		p.filter('**/*.css'), // Filtering stream to only css files
		gif(!optimize, reload({stream: true}))
	]);

	return stream;
};

module.exports = styleLessTask;