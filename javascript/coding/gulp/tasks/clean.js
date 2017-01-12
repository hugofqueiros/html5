import gulp from 'gulp';
import gutil from 'gulp-util';

import rimraf from 'rimraf';
import { dest } from '../config';

gulp.task('clean', (done) => {
    gutil.log('Deleted folder:\n', '\t\t\t' + gutil.colors.red(dest));
    rimraf(dest, done);
});
