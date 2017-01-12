import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { src, dest } from '../config';

const p = loadPlugins();

gulp.task('dist:replace', () => {
    return gulp.src(join(dest, 'html', 'index.html'))
        .pipe(p.useref())
        .pipe(p.size({
            title: ' HTML replace: '
        }))
        .pipe(gulp.dest(dest));
});
