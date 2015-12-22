/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var gulp = require('gulp');
var p = require('gulp-load-plugins')();
var handleError = require('../utils/handle-errors');

var copyHTMLTXTTask = function(src, dest, reload) {
	return gulp.src(src, {dot: true})
		.on('error', handleError)
		.pipe(gulp.dest(dest))
		.pipe(p.size({title: 'COPY HTML and TXT'}))
		.pipe(reload({stream: true}));
};

module.exports = copyHTMLTXTTask;
