/**
 * Created by hfq on 17-08-2015.
 */

'use strict';

// on package file tests
/*    "predeploy": "echo im about to deploy",
 "postdeploy": "echo ive deployed",
 "prepublish": "coffee --bare --compile --output lib/foo src/foo*//*.coffee",*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var p = require('gulp-load-plugins')();
var gulpIf = p.if;
var pngquant = require('imagemin-pngquant');
var fs = require('fs');
var es = require('event-stream');
var pj = require('./package.json');
var pkg = JSON.parse(fs.readFileSync(__dirname + '/package.json'));
var concat = require('gulp-concat');
var path = require('path');
var merge = require('merge-stream');
var request = require('request');
var bsync = require('browser-sync');
var reload = bsync.reload;
var exec = require('child_process').exec;
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var prettyHrtime = require('pretty-hrtime');
var http = require('http');
var livereload = require('gulp-livereload');
var st = require('st');
var less = require('gulp-less');
var cleancss = require('gulp-minify-css');
var del = require('del');
var sequence = require('run-sequence');
var Server = require('karma').Server;

var startTime;

var libs = [
    'jquery',
    'underscore',
    'lodash',
    'bootstrap'
];

/**
 * UTILS
 **/
var handleError = function (e) {
    var args = Array.prototype.slice.call(arguments);

    //Send error to notification center with gulp-notify
    p.notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    gutil.log(e);

    // Keep gulp from hanging on this task
    this.emit('end');
};

var bundleLogger = {
    start: function () {
        startTime = process.hrtime();
        gutil.log('Running', gutil.colors.green("'bundle'") + '...');
    },

    end: function () {
        var taskTime = process.hrtime(startTime);
        var prettyTime = prettyHrtime(taskTime);
        gutil.log('Finished', gutil.colors.green("'bundle'"), 'in', gutil.colors.magenta(prettyTime));
    }
};

gulp.task('default', ['setWatch', 'build'], function () {
    global.isWatching = true;

    bsync({
        server: {
            baseDir: 'build',
            middleware: [
                function (req, res, next) {
                    var ext = path.extname(req.url);
                    if ((ext === '' || ext === '.html') && req.url !== '/') {
                        req.pipe(request('http://' + req.headers.host)).pipe(res);
                    } else {
                        next();
                    }
                }
            ]
        },
        port: 3000,
        open: false
    });

    gulp.watch('app/styles/**/*.less', ['less']);
});

/*gulp.task('default', ['tdd']);*/

gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('build', ['clean-build'], function (cb) {
     sequence(
     'less',
     'images',
/*     'svg',*/
     'fonts',
     'copy',
     'js', cb);
});

gulp.task('clean-build', function (cb) {
    del(['build'], {}, cb);
});

gulp.task('less', function() {
    bsync.notify('Compiling Less files... Please Wait');

    var combiner = require('stream-combiner2');
    var stream = combiner.obj([
        gulp.src('./app/styles/style.less'),
        p.sourcemaps.init(),
        p.less(),
        cleancss(),
        p.autoprefixer({
            browsers: ['last 2 versions'],
            cascade:  false
        }),
        p.sourcemaps.write('.', {includeContent: false, sourceRoot: './app/styles'}),
        gulp.dest('build/styles'),
        p.size({title: 'CSS', showFiles: true}),
        p.filter('**/*.css'), // Filtering stream to only css files
        reload({stream: true})
    ]);

    stream.on('error', handleError);

    return stream;
});

gulp.task('fonts', function() {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('build/fonts'))
        .pipe(p.size({title: 'fonts'}))
        .pipe(reload({stream: true}));
});

gulp.task('images', function () {
    return gulp.src('app/img/**/*.{png,jpg,jpeg,gif}')
        .pipe(p.imagemin({
            optimizationLevel: 3,
            progressive:       true,
            interlaced:        true,
            verbose:           true,
            use:               [pngquant()]
        }))
        .pipe(gulp.dest('build/images'))
        .pipe(p.size({title: 'images'}))
        .pipe(reload({stream: true}));
});

gulp.task('svg', function () {

});

gulp.task('js', ['js-vendor'], function() {
    var bundler = browserify({
        entries: ['./app/main.js'],
        debug:   true,        // Enable source maps!
        //fullPaths   : true,
        //paths :['./node_modules','./app/scripts/']
    });

    // Transforms
    bundler.transform('jstify', {
        engine:       'lodash',
        templateOpts: {
            variable: 'data'
        }
    });

    // Externals
    libs.forEach(function(lib) {
        bundler.external(lib);
    });

    var bundle = function() {
        if (global.isWatching) {
            bundleLogger.start();
        }
        return bundler
            .bundle()
            .on('error', handleError)
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(p.sourcemaps.init({loadMaps: true}))
            .pipe(p.sourcemaps.write('.', {includeContent: false, sourceRoot: '.'}))
            .pipe(gulp.dest('./build/scripts'))
            .on('end', function() {
                if (global.isWatching) {
                    bundleLogger.end();
                }
                bsync.reload();
            })
            .pipe(p.size({title: 'JS'}));
    };

    if (global.isWatching) {
        bundler = watchify(bundler, {poll: true});
        bundler.on('update', bundle); // Rebundle with watchify on changes.
    }
    return bundle();
});

gulp.task('js-vendor', function() {
    var b = browserify();

    libs.forEach(function(lib) {
        b.require(lib);
    });

    return b.bundle()
        .on('error', handleError)
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build/scripts'))
        .pipe(p.size({title: 'JS Vendor'}));
});

gulp.task('copy', function() {
    return gulp.src(['app/*.{html,ico,txt}'], {dot: true})
        .pipe(gulp.dest('build'))
        .pipe(p.size({title: 'copy'}))
        .pipe(reload({stream: true}));
});

/**
 * TESTS
 */

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/**
 *
 */
gulp.task('deepTest', ['tdd']);

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});