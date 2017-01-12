import gulp from 'gulp';
import eslint from 'gulp-eslint';
import { join } from 'path';

import { src } from '../config';

gulp.task('lint', () => {
    gulp.src([join(src, 'scripts', '**/*.js'),
        join('gulp', '**/*.js'),
        '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
