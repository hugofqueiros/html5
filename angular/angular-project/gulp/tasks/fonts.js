import gulp from 'gulp';
import { join } from 'path';
import loadPlugins from 'gulp-load-plugins';

import { src, dest } from '../config';
import browserSync from './server';

const reload = browserSync.reload;
const p = loadPlugins();

gulp.task('fonts', () => {
    gulp.src([join(src, 'fonts', '**/*'), join('node_modules', 'font-awesome', 'fonts', '**/*')])
        .pipe(gulp.dest(join(dest, 'fonts')))
        .pipe(p.size({
            title: 'FONTS'
        }))
        .pipe(reload({
            stream: true
        }));
});
