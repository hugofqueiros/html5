'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var p = require('gulp-load-plugins')();
var sequence = require('run-sequence');
var bsync = require('browser-sync');
var reload = bsync.reload;
var del = require('del');
var gif = require('gulp-if');
var cleancss = require('gulp-minify-css');
var combiner = require('stream-combiner2');
var pngquant = require('imagemin-pngquant');

gulp.task('clean-build', function (cb) {
    del(['build']).then(function (paths) {
        gutil.log('Deleted files/folders:\n', '\t\t\t' + gutil.colors.red(paths.join('\n')));
    }).then(function() {
        cb();
    });

});


gulp.task('default', ['setWatch', 'build'], function() {
    bsync({
        notify: true,
        logPrefix: 'PORTUGAL IS THE BEST',
        files: {
            src: './build/styles'
        },
        reloadOnRestart: true,
        injectChanges: true,
        server: {
            baseDir: 'build'
        },
        port: 3000,
        open: true
    })
});

gulp.task('setWatch', function() {
    gulp.watch('app/styles/**/*.less', ['less']);
    gulp.watch('app/*.{html,ico,txt}', ['copy']);
    gulp.watch('app/fonts/*', ['fonts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('app/scripts/**/*', ['scripts']);
});

gulp.task('build', ['clean-build'], function(cb) {
    sequence(
        'less',
        'images',
        'fonts',
        'scripts',
        'copy', cb);
});

var AUTOPREFIXER_BROWSERS = [
    'ie >= 11',
    'ie_mob >= 11',
    'ff >= 43',
    'chrome >= 47',
    'safari >= 9',
    'opera >= 34',
    'ios >= 8.4',
    'android >= 46',
    'bb >= 10'
];

gulp.task('less', function() {
    bsync.notify('Compiling Less files... Please Wait');

    var stream = combiner.obj([
        gulp.src('./app/styles/style.less'),
        p.sourcemaps.init(),
        p.less({
            strictMath: true,
            strictUnits: true
        }),
        cleancss(),
        p.autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS,
            cascade: false
        }),
        gulp.dest('build/styles'),
        p.size({title: 'CSS', showFiles: true}),
        p.filter('**/*.css'),
        reload({stream: true})
    ]);

    return stream;
});

gulp.task('images', function() {
    bsync.notify('Compiling Image files... Please Wait');

    return gulp.src('app/images/**/*.{png,jpg,jpeg,gif,ico,svg}')
        .pipe(p.imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,
            verbose: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/images'))
        .pipe(p.size({title: 'images'}))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function() {
    bsync.notify('Compiling fonts... Please Wait');

    return gulp.src('app/fonts/**')
        .pipe(gulp.dest('build/fonts'))
        .pipe(p.size({
            title: 'FONTS'
        }))
        .pipe(reload({stream: true}));
});

gulp.task('copy', function() {
    return gulp.src('app/*.{html,txt}', {dot: true})
        .pipe(p.htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            // lint: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('build/'))
        .pipe(p.size({title: 'COPY HTML and TXT'}))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')  // , {dot: true}
        .pipe(p.uglify())
        .pipe(gulp.dest('build/scripts'))
        .pipe(p.size({title: 'JS'}))
        .pipe(reload({stream: true}));
});