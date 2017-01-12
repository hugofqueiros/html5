import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import pngquant from 'imagemin-pngquant';
import { join } from 'path';

import browserSync from './server';
import { src, dest } from '../config';

const reload = browserSync.reload;
const p = loadPlugins();

gulp.task('images', ['images-no-resize'], () => {
    gulp.src(join(src, 'images', '**/*.{png,jpg,jpeg,gif}'))
        .pipe(p.imageResize({
            width: 800,
            height: 500,
            upscale: false
        }))
        .pipe(p.imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,
            verbose: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(join(dest, 'images')))
        .pipe(p.size({ title: 'IMAGES' }))
        .pipe(reload({ stream: true }));
});

gulp.task('images-no-resize', () => {
    gulp.src(join(src, 'images', '**/*.{ico,gif,svg}'))
        .pipe(p.imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,
            verbose: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(join(dest, 'images')))
        .pipe(p.size({ title: 'IMAGES No RESIZE ' }))
        .pipe(reload({ stream: true }));
});
