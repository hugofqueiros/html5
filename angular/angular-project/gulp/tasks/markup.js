import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import { join } from 'path';
// import bs from 'browser-sync';

import browserSync from './server';
import { src, dest } from '../config';

const reload = browserSync.reload;
const p = loadPlugins();

gulp.task('markup', () => {
    browserSync.notify('Copy HTML and TXT files... Please Wait');

    const mainPath = join(src, 'html', '**/*');

    gulp.src([mainPath])
        .pipe(p.plumber())
        .pipe(p.fileInclude({
            basepath: join(__dirname, '..', src, 'html')
        }))
        .pipe(gulp.dest(dest))
        .pipe(p.size({ title: 'Markup' }))
        .pipe(reload({ stream: true }));
});
