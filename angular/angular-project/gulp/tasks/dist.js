import gulp from 'gulp';
import sequence from 'run-sequence';
import yargs from 'yargs';

const argv = yargs.argv;

gulp.task('dist', ['clean'], (cb) => {
    sequence(
        'config',
        'fonts',
        'images',
        'styles',
        'dist:replace',
        'dist:htmlmin',
        'dist:copy',
        'scripts',
        'dist:concat',
        cb);
});
