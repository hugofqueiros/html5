/**
 * gulp/tasks/browserify.js handles recompiling with watchify
 * gulp/tasks/browserSync.js watches and reloads compiled files
 */
'use strict';

var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	gulp.watch(config.markup.src, ['markup']);
});