'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins');
var gulpif = $.if;
var request = require('request');
var del = require('del');
var fs = require('fs');
var merge = require('merge-stream');
var vinylPaths = require('vinyl-paths');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');
//var pkg = require('./package.json');
var pkg = JSON.parse(fs.readFileSync(__dirname + '/package.json'));
var through = require('through2');
var cleanCss = require('gulp-minify-css');
var prettyHrtime = require('pretty-hrtime');
var changelog = require('conventional-changelog');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @license <%= pkg.license %>',
    ' * @copyright 2015 Hugo Queirós',
    ' * @link https://github.com/hugofqueiros/html5',
    ' */',
    ''
].join('\n');

/***********************
 * UTILS
 ***********************/

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

var startTime;
var bundleLogger = {
    start: function() {
        startTime: process.hrTime();
        gutil.log('Running', gutil.colors.green("'bundle") + '...');
    },
    end: function() {
        var taskTime = process.hrtime(startTime);
        var prettyTime = prettyHrtime(taskTime);
        gutil.log('Finished', gutil.colors.green("'bundle'"), 'in', gutil.colors.magenta(prettyTime));
    }
};

function watch() {
    gulp.watch(['app/scripts/**/*.js', 'scripts', reload]);
    gulp.watch(['app/styles/**/*.{less, css}', 'styles', reload]);
    gulp.watch([''])
};

/***********************
 * DEVELOPMENT TASKS
 ***********************/

// Lint Javascript
gulp.task('jshint', function() {
    return gulp.src(['app/scripts/**/+.js', 'gulpfile.js'])
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(gulpif(!browserSync.active, $.jshint.reporter('fail')));
});

// Lint JS code style
gulp.task('jscs', function() {
    return gulp.src(['src/**/*.js', 'gulpfile.js'])
        .pipe(reload({stream: true, once: true}))
        .pipe($.jscs())
        .pipe(gulpif(!browserSync.active, $.jshint.reporter('fail')));
});

/************************
 * BUILD TASKS
 ************************/

gulp.task('scripts', function() {

});

gulp.task('styles', function() {

});