/**
 * Created by hfq on 11/12/15.
 */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var glob = require('glob-all');
var historyApiFallback = require('connect-history-api-fallback');
var packageJson = require('./package.json');
var crypto = require('crypto');
var ensureFiles = require('./tasks/ensure-files.js');

// var ghPages = require('gulp-gh-pages');

var AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

var DIST = 'dist';

var dist = function(subpath) {
	return !subpath ? DIST : path.join(DIST, subpath);
};

var styleTask = function (stylesPath, srcs) {
	return gulp.src(srcs.map(function (src) {
		return path.join('app', stylesPath, src);
	}))
		.pipe($.changed(stylesPath, {extension: '.css'}))
		.pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
		.pipe(gulp.dest('.tmp/' + stylesPath))
		.pipe($.minifyCss())
		.pipe(gulp.dest(dist(stylesPath)))
		.pipe($.size({title: stylesPath}));
};

var imageOptimizeTask = function(src, dest) {
	return gulp.src(src)
		.pipe($.imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(dest))
		.pipe($.size({title: 'images'}));

};

var optimizeHtmlTask = function(src, dest) {
	var assets = $.useref.assets({
		searchPath: ['.tmp', '.app']
	});

	return gulp.src(src)
		.pipe(assets)
		// concat and minify js
		.pipe($.if('*.js', $.uglify({
			preserveComments: 'some'
		})))
		// Concat and minify styles
		.pipe($.if('*.css', $.minifyCss()))
		.pipe(assets.restore())
		.pipe($.useref())
		// Minify any HTML
		.pipe($.if('*.html', $.minifyHtml({
			quotes: true,
			empty: true,
			spare: true
		})))
		.pipe(gulp.dest(dest))
		.pipe($.size({
			title: 'html'
		}));
};

gulp.task('styles', function() {
	return styleTask('styles', ['**/*.css']);
});

gulp.task('elements', function() {
	return styleTask('elements', ['**/*.css']);
});

/**
 * Ensure that required "dot" files are not hidden on some systems
 */
gulp.task('ensureFiles', function(cb) {
	var requiredFiles = ['.jscsrc', '.jshintrc', '.bowerrc'];

	ensureFiles(requiredFiles.map(function(p) {
		return path.join(__dirname, p);
	}), cb);
});

// Linter
gulp.task('lint', ['ensureFiles'], function() {
	return gulp.src([
		'app/scripts/**/*.js',
		'app/elements/**/*.js',
		'app/elements/**/*.html',
		'gulpfile.js'
	])
		.pipe(reload({
			stream: true,
			once: true
		}))
		// JSCS has not yet a extract option
		.pipe($.if('*.html', $.htmlExtract()))
		.pipe($.jshint())
		.pipe($.jscs())
		.pipe($.jscsStylish.combineWithHintResults())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('images', function() {
	return imageOptimizeTask('app/images/**/*', dist('images'));
});

// Copy all files at the root level (app)
gulp.task('copy', function() {
	var app = gulp.src([
		'app/*',
		'!app/test',
		'!app/elements',
		'!app/bower_components',
		'!app/cache-config.json'
	], {
		dot: true
	}).pipe(gulp.dest(dist()));

	// Copy over only the bower_components we need
	// These are things which cannot be vulcanized
	var bower = gulp.src([
		'app/bower_components/{webcomponentsjs,platinum-sw,sw-toolbox,promise-polyfill}/**/*'
	]).pipe(gulp.dest(dist('bower_components')));

	return merge(app, bower)
		.pipe($.size({
			title: 'copy'
		}));
});

// Copy web fonts to dist
gulp.task('fonts', function() {
	return gulp.src(['app/fonts/**'])
		.pipe(gulp.dest(dist('fonts')))
		.pipe($.size({
			title: 'fonts'
		}));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function() {
	return optimizeHtmlTask(
		['app/**/*.html', '!app/{elements,test,bower_components}/**/*.html'],
		dist());
});

// Vulcanize granular configuration
gulp.task('vulcanize', function() {
	// Reduce an HTML file and its dependent HTML Imports into one file
	return gulp.src('app/elements/elements.html')
		.pipe($.vulcanize({
			stripComments: true,
			inlineCss: true,
			inlineScripts: true
		}))
		.pipe(gulp.dest(dist('elements')))
		.pipe($.size({title: 'vulcanize'}));
});

gulp.task('default', ['clean'], function(cb) {
	runSequence();
});

// Load custom tasks from the tasks directory
try {
	require('require-dir')('tasks');
} catch (err) {}



