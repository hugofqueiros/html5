import gulp from 'gulp';
import { join } from 'path';
import loadPlugins from 'gulp-load-plugins';
import { src, dest } from '../config';

const p = loadPlugins();

/**
 * This task has the function of only copying what doesn't require any treatment
 */
gulp.task('dist:copy', ['dist:copy:markup'], function() {
    var copyRootFiles = gulp.src([join(src, 'html', '*.{xml,json,webapp,txt}')],
        {
            dot: true
        })
        .pipe(gulp.dest(dest))
        .pipe(p.size({
            title: 'DIST COPY  :'
        }));

    return copyRootFiles;
});

gulp.task('dist:copy:markup', function() {
    var copyRootFiles = gulp.src(join(src, 'html', 'index.html'),
        {
            dot: true
        })
        .pipe(gulp.dest(join(dest, 'html')))
        .pipe(p.size({
            title: 'DIST COPY  :'
        }));

    return copyRootFiles;

});
