'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var args = gutil.env;
var env = gutil.env.env;
var p = require('gulp-load-plugins')();
var replace = require('gulp-replace-task');
var gif = require('gulp-if');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var fs = require('fs');
var pkg = require('./package.json');
var pkgParsed = JSON.parse(fs.readFileSync(__dirname + '/package.json'));
var sequence = require('run-sequence');
var request = require('request');
var merge = require('merge-stream');
var path = require('path');
var bsync = require('browser-sync');
var reload = bsync.reload;
var browserify = require('browserify');
var watchify = require('watchify');
var del = require('del');
var exec = require('child_process').exec;
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var combiner = require('stream-combiner2');
var changelog = require('conventional-changelog');
var moment = require('moment');

// ### TASKS
var lessStylesTask = require('./gulp/tasks/styles-less-task');
var imagesTask = require('./gulp/tasks/images-task');
var svgsTask = require('./gulp/tasks/svgs-task');
var fontsTask = require('./gulp/tasks/fonts-task');
var copyHtmlTxtTask = require('./gulp/tasks/copy-html-txt-task');
var checkDeps = require('./gulp/tasks/check-deps-task');

// ### UTILS - Helper Functions
var bundleLogger = require('./gulp/utils/bundle-logger');
var handleError = require('./gulp/utils/handle-errors');
var libs = require('./gulp/utils/vendor-libs');
var appData = require('./gulp/utils/app-data');
var rep = require('./gulp/utils/replace');
var checkEnv = require('./gulp/utils/utils');

var optimize = !!(env === 'production' || env === 'staging');
var debug = !(env === 'production' || env === 'staging');

gutil.log(gutil.colors.blue('Optimize: ') + gutil.colors.blue(optimize));
gutil.log(gutil.colors.blue('ENV: ', env));
gutil.log(gutil.colors.blue('App Data: ') + gutil.colors.blue(appData));
gutil.log(gutil.colors.blue('Debug: ') + gutil.colors.blue(debug));

// ######################## TASKS #########################################
gulp.task('default', ['setWatch', 'build'], function () {

	bsync({
		// Enable source maps
		//debug: true,
		notify: true,
		logPrefix: 'Dashboard',
		files: {
			src: './build/styles'
		},
		/*        snippetOptions: {
		 rule: {
		 match: '<span id="browser-sync-binding"></span>',
		 fn: function (snippet) {
		 return snippet;
		 }
		 }
		 },*/
		/*        https: true
		 https: {
		 key: "path-to-custom.key",
		 cert: "path-to-custom.crt"
		 }*/
		// Log connections
		logConnections: true,
		// Log information about changed files
		//logFileChanges: true,
		// Don't ever log the snippet
		//logSnippet: true,
		//online: true,
		reloadOnRestart: true,
		//injectFileTypes: ['less'],
		injectChanges: true,
		server: {
			baseDir:    'build',
			middleware: [require('connect-logger')()/*,
				require('connect-history-api-fallback')(),
				function (req, res, next) {
					var ext = path.extname(req.url);
					if ((ext === '' || ext === '.html') && req.url !== '/') {
						req.pipe(request('http://' + req.headers.host)).pipe(res);
					} else {
						next();
					}
				}*/]
		},
		port: 3000,
		open: true
	});

	/*    var htmlInjector = require('bs-html-injector');
	 bsync.use(htmlInjector, {
	 files: 'front_end/!*.html'
	 });*/
});

gulp.task('setWatch', function () {
	global.isWatching = true;
	gulp.watch('app/styles/**/*.less', ['less']);
	gulp.watch('app/*.{html,ico,txt}', ['copy']);
	gulp.watch('app/fonts/*', ['fonts']);
	gulp.watch('app/images/**/*', ['images']);
	gulp.watch('app/svg/**/*', ['svg']);
	gulp.watch('app/locales/**/*', ['copy-locales']);
});

gulp.task('build', ['clean-build'], function (cb) {
	sequence(
		'less',
		'images',
		'fonts',
		'svgs',
		'copy',
		'locales',
		'scripts',
		'template', cb);
});

gulp.task('clean-build', function () {
	del(['build']).then(function (paths) {
		gutil.log('Deleted files/folders:\n', '\t\t\t' + gutil.colors.red(paths.join('\n')));
	});
});

gulp.task('less', function () {
	bsync.notify('Compiling Less files... Please Wait');

	return lessStylesTask('./app/styles/style.less',
		'build/styles',
		reload,
		optimize);
});

gulp.task('images', function () {
	bsync.notify('Compiling Image files... Please Wait');

	return imagesTask('app/images/**/*.{png,jpg,jpeg,gif,ico,svg}',
		'build/images',
		reload,
		optimize);
});

gulp.task('fonts', function () {
	bsync.notify('Compiling fonts... Please Wait');

	return fontsTask(['app/fonts/**', 'node_modules/font-awesome/fonts/**'],
		'build/fonts',
		reload,
		optimize);
});

gulp.task('svgs', function () {
	bsync.notify('Compiling SVGS... Please Wait');

	return svgsTask('app/svgs/**/*.svg',
		'build/svgs',
		reload,
		optimize);
});

gulp.task('copy', function () {
	bsync.notify('Copy HTML and TXT files... Please Wait');

	return copyHtmlTxtTask('app/*.{html,txt}',
		'build/',
		reload);
});

gulp.task('locales', function () {
	bsync.notify('Copying locales... Please Wait');

	var stream = combiner.obj([
		gulp.src('./front_end/locales/**')
			.on('error', handleError)
			.pipe(gulp.dest('src/landerdash/static/locales'))
			.pipe(p.size({title: 'LOCALES', showFiles: true}))
			.pipe(gif(!env, reload({stream: true})))
	]);

	return stream;
});

gulp.task('scripts', ['scripts-vendor'], function () {
	var bundler = browserify({
		entries: ['./app/scripts/main.js'],
		debug: true
		// Enable source maps!
		/*        fullPaths   : true,
		 paths :['./front_end/js/!**']*/
	});

	// Transforms
	bundler.transform('jstify', {
		engine: 'lodash',
		templateOpts: {
			variable: 'data'
		}
	});

	// External libs
	libs.forEach(function (lib) {
		bundler.external(lib);
	});

	var bundle = function () {
		if (global.isWatching) {
			bundleLogger.start();
		}

		return bundler
			.bundle()
			.on('error', handleError)
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(gif(optimize, p.stripDebug()))
			.pipe(p.sourcemaps.init({loadMaps: true}))
			.pipe(p.frep(rep.config))
			.pipe(p.sourcemaps.write('.', {
				includeContent: true,
				sourceRoot: '.'
			}))
			.pipe(gulp.dest('./build/scripts'))
			.on('end', function () {
				if (global.isWatching) {
					bundleLogger.end();
				}
				bsync.reload();
			})
			.pipe(p.size({title: 'Scripts'}));
	};

	if (global.isWatching) {
		bundler = watchify(bundler, {poll: true});
		bundler.on('update', bundle); // Rebundle with watchify on changes.
	}

	return bundle();
});

gulp.task('scripts-vendor', function () {
	var b = browserify();

	libs.forEach(function (lib) {
		gutil.log('lib: ', lib);
		b.require(lib);
	});

	return b.bundle()
		.on('error', handleError)
		.pipe(source('vendor.js'))
		.pipe(buffer())
		.pipe(p.sourcemaps.init({loadMaps: true}))
		.pipe(p.sourcemaps.write('.', {
			includeContent: false,
			sourceRoot: '.'
		}))
		.pipe(gulp.dest('./build/scripts'))
		/*        .on('end', function() {
		 if(global.isWatching) {
		 bundleLogger.end();
		 }
		 bsync.reload();
		 })*/
		.pipe(p.size({title: 'JS vendor'}));
});

gulp.task('template', function (cb) {
	var t = require('gulp-template');
	var lastCommit;

	exec('git rev-parse --short=10 HEAD', function (err, stdout, stderr) {
		lastCommit = stdout.trim();
		gutil.log('Version: ', appData.version);
		gutil.log('Commit hash: ', lastCommit);
		gutil.log('Commit hash:', appData.commit)
		gutil.log('Date: ', appData.date);
		gutil.log('Env: ', appData.env);
		if (err) {
			cb(err);
		} else {
			gulp.src('app/scripts/config/version.json')
					.pipe(t({
						version: appData.version,
						hash: lastCommit,
						date: appData.date,
						env: appData.env
					}))
					.pipe(gulp.dest('build'));
			cb();
		}
	});
});

// ######################## Distribution #####################################
gulp.task('dist', ['clean-build'], function (cb) {
	checkDeps(env);
	sequence(
			'less',
			'images',
			'svgs',
			'fonts',
			'copy-locales',
			'scripts',
			'copy:dist',
			'concat:dist',
			'template',
			function () {
				del(['build/scripts/vendor.*', 'build/scripts/app.*']).then(function (paths) {
					gutil.log('Deleted files/folders:\n', '\t\t\t' + gutil.colors.red(paths.join('\n')));
				}, cb);
			});
});

gulp.task('copy:dist', function () {
	var html = gulp.src('app/*.html')
			.pipe(p.useref({ searchPath: 'build' }))
			.pipe(gulp.dest('build'))
			.pipe(p.size({title: 'HTML        '}));

	var copy = gulp.src(['app/*.{ico,txt}'], {dot: true})
			.pipe(gulp.dest('build'))
			.pipe(p.size({title: 'Copy ICO TXT       '}));

	//var css = gulp.src(['build/styles/style.*'])
	var css = gulp.src(['build/styles/style.*', '!build/styles/style.css.map'])
			.pipe(p.size({title: 'CSS minified', showFiles: true}))
			.pipe(p.zopfli()) // gzip
			.pipe(gulp.dest('build/styles/'))
			.pipe(p.size({title: 'CSS gziped  ', showFiles: true}));

	return merge(html, copy, css);
});

gulp.task('concat:dist', function () {
	var stream = gulp.src(['build/scripts/vendor.js', 'build/scripts/app.js'])
			.on('error', handleError)

			//.pipe(p.sourcemaps.init({loadMaps: false}))
			.pipe(p.concat('script.js'))
			.pipe(p.size({title: 'JS         ', showFiles: true}))
			.pipe(p.uglify())

			//.pipe(p.sourcemaps.write('.', {includeContent: false, sourceRoot: '.'}))
			.pipe(p.size({title: 'JS minified', showFiles: true}))
			.pipe(gulp.dest('build/scripts'))
			.pipe(p.zopfli())
			.pipe(gulp.dest('build/scripts'))
			.pipe(p.size({title: 'JS gziped  ', showFiles: true}));
	return stream;
});