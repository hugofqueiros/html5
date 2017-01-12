import gulp from 'gulp';
import sequence from 'run-sequence';
import yargs from 'yargs';
import del from 'del';
import { join } from 'path';

import { dest } from '../config';

const argv = yargs.argv;

gulp.task('dist', ['clean'], (cb) => {
    sequence(
        'config',
        'fonts',
        'images',
        'styles',
        'scripts',
        'dist:copy',
        'dist:replace',
        //'dist:htmlmin',
        'dist:concat',
        function() {
            del([join(dest, 'scripts', 'vendor.*'), join(dest, 'scripts', 'bundle.*'), join(dest, 'html')], {}, cb)
        });
});
