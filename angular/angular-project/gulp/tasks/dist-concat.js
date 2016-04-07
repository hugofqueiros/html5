import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { dest } from '../config';
import handleErrors from '../utils/handle-errors';

const p = loadPlugins();

gulp.task('dist:concat', () => {
    return gulp.src([join(dest, 'js', 'bundle.js'), join(dest, 'js', 'vendor.js')])
        .on('error', handleErrors)
        .pipe(p.sourcemaps.init({
            loadMaps: true
        }))
        .pipe(p.concat('script.js'))
        .pipe(p.size({
            title: 'JS CONCAT', showFiles: true
        }))
        .pipe(p.uglify())
        .pipe(p.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '.'
        }))
        .pipe(p.size({
            title: 'JS Minified', showFiles: true
        }))
        .pipe(gulp.dest(join(dest, 'js')))
        .pipe(p.gzip())
        .pipe(p.size({
            title: 'JS GZiped'
        }))
        .pipe(gulp.dest(join(dest, 'js')));
});
