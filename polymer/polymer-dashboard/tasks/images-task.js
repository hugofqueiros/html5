/**
 * Created by hfq on 14/12/15.
 */
'use script';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var imageOptimizeTask = function(src, dest) {
  return gulp.src(src)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(dest))
    .pipe($.size({title: 'images'}));
};

module.exports = imageOptimizeTask;
