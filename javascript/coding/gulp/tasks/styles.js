import gulp from 'gulp';
import { join } from 'path';
import loadPlugins from 'gulp-load-plugins';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssDiscardComments from 'postcss-discard-comments';
import combiner from 'stream-combiner2';

import { src, dest, browserAutoPrefixers } from '../config';
import browserSync from './server';

const p = loadPlugins();

gulp.task('styles', () => {
    browserSync.notify('Compiling Less files... Please Wait');

    let stream = combiner.obj([
        gulp.src(join(src, 'styles', 'style.less')),
        p.sourcemaps.init(),
        p.less({
            strictMath: true,
            strictUnits: true
        }),
        p.postcss(
            [
                autoprefixer({
                    browsers: browserAutoPrefixers,
                    cascade: false,
                    remove: false
                }),
                postcssDiscardComments({
                    removeAll: true
                }),
                cssnano({
                    restructure: true
                    // ,
                    // sourceMap: true,
                    // debug: true,
                    // type: null
                })
            ]),
        p.sourcemaps.write('.', {
            includeContent: false, sourceRoot: './front_end/styles'
        }),
        gulp.dest(join(dest, 'styles')),
        p.size({
            title: 'CSS', showFiles: true
        }),
        // Filtering stream to only css files
        p.filter('**/*.css'),
        browserSync.reload({
            stream: true
        })
    ]);

    return stream;
});
