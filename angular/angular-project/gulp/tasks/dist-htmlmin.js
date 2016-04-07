import gulp from 'gulp';
import { join } from 'path';
import loadPlugins from 'gulp-load-plugins';

import { dest } from '../config';

const p = loadPlugins();

gulp.task('dist:htmlmin', () => {
    gulp.src(join(dest, '*.html'))
        .pipe(p.htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            // lint: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest(dest))
        .pipe(p.size({ title: 'HTML MIN' }));
});
