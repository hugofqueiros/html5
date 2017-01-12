import gulp from 'gulp';
import { join } from 'path';
import loadPlugins from 'gulp-load-plugins';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';

import { src, dest, browserAutoPrefixers } from '../config';
import browserSync from './server';

const p = loadPlugins();

gulp.task('analyze-css', ['styles'], () => {
    browserSync.notify('Analysing CSS file... Please Wait');
    return gulp.src(join(dest, 'styles', 'style.css'))
        .pipe(p.postcss([
            stylelint({}),
            reporter({
                clearMessages: true
            })
        ]));
});
