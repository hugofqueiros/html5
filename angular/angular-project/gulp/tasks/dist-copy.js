import gulp from 'gulp';
import { join } from 'path';
import loadPlugins from 'gulp-load-plugins';
import { src, dest } from '../config';

const p = loadPlugins();

/**
 * This task has the function of only copying what doesn't require any treatment
 */
gulp.task('dist:copy', function() {
    var copyRootFiles = gulp.src([join(src, 'html', '*.{txt, xml, json, webapp}')],
        {
            dot: true
        })
        .pipe(gulp.dest(dest))
        .pipe(p.size({
            title: 'DIST COPY  :'
        }));

    return copyRootFiles;
});
