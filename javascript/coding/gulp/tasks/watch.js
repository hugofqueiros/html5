import gulp from 'gulp';
import { src } from '../config';
import { join } from 'path';

gulp.task('setWatch', () => {
    global.isWatching = true;
    gulp.watch(join(src, 'html', '**/*.html'), ['markup']);
    gulp.watch(join(src, 'styles', '**/*.less'), ['styles']);
    gulp.watch(join(src, 'images', '**/*'), ['images']);
    //gulp.watch('./dist/js/**.*.js', )
    // gulp.watch(join(src, 'scripts', '**/*'), ['js']);
    gulp.watch(join(src, 'fonts', '**/*'), ['fonts']);
});
