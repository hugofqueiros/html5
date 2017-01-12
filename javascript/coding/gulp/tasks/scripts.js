import gulp from 'gulp';
import gutil from 'gulp-util';
import loadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import assign from 'object-assign';
import { join } from 'path';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import browserSync from './server';
import { src, dest } from '../config';
import libs from '../utils/vendor-libs';
import handleErrors from '../utils/handle-errors';
import bundleLogger from '../utils/bundle-logger';

const p = loadPlugins();
const reload = browserSync.reload;

const customOpts = {
    entries: join(src, 'scripts', 'main.js'),
    extensions: ['.jsx', '.js'],
    debug: true,
    poll: true,
    transform: [
        babelify
    ]
};

const config = assign({}, watchify.args, customOpts);
let buildBundler = browserify(config);

function bundling() {
    libs.forEach(((lib) => {
        buildBundler.external(lib);
    }));

    let bundle = () => {
        if (global.isWatching) {
            bundleLogger.start();
        }

        return buildBundler
            .bundle()
            .on('error', handleErrors)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(p.sourcemaps.init({
                loadMaps: true
            }))
            .pipe(p.sourcemaps.write('.', {
                includeContent: true,
                sourceRoot: '.'
            }))
            .pipe(gulp.dest(join(dest, 'scripts')))
            .on('end', () => {
                if (global.isWatching) {
                    bundleLogger.end();
                }
                reload();
            })
            .pipe(p.size({
                title: 'SCRIPTS'
            }));
    };

    if (global.isWatching) {
        buildBundler = watchify(buildBundler, {
            poll: true
        });
        buildBundler.on('update', bundle);
    }

    return bundle();
}

gulp.task('scripts-vendor', () => {
    let b = browserify();

    libs.forEach((lib) => {
        gutil.log('lib: ', lib);
        b.require(lib);
    });

    return b.bundle()
        .on('error', handleErrors)
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(p.sourcemaps.init())
        .pipe(p.sourcemaps.write('.', {
            includeContent: true,
            sourceRoot: '.'
        }))
        .pipe(gulp.dest(join(dest, 'scripts')))
        .pipe(p.size({
            title: 'JS VENDOR'
        }));
});

gulp.task('scripts', ['scripts-vendor'], () => {
    return bundling();
});

gulp.task('js', () => {
    return bundling();
});
