import gulp from 'gulp';
import sequence from 'run-sequence';

gulp.task('build', ['clean'], (cb) => {
    sequence(
        'fonts',
        'images',
        'styles',
        'markup',
        'scripts',
        cb);
});
