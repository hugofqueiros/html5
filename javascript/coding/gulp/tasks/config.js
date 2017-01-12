import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpIf from 'gulp-if';

import yargs from 'yargs';

const argv = yargs.argv;
import { environment } from '../config';


gulp.task('config', (cb) => {
    if(argv.env) {
        gutil.log('Distribution build environment: ' + gutil.colors.red(argv.env));
    }
    else {
        gutil.log(gutil.colors.bold('No environment setted for distribution!!'));
        gutil.log(gutil.colors.red());
        gutil.log(gutil.colors.green('Ex: gulp --env production'));
        gutil.log(gutil.colors.green('Ex: gulp --env production'));
    }

    let env = (argv.env === 'staging' || 'production') ? argv.env : 'development';
    let envStag = argv.env === 'staging' ? true : false;
    let envProd = argv.env === 'production' ? true : false;

    cb();
});
