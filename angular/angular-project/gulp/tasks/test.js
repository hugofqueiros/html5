import gulp from 'gulp';
/* import karma from 'karma';

const isTravis = process.env.TRAVIS || false;*/
const pathToKarmaConf = __dirname.replace('/gulp/tasks', '/test');

gulp.task('test', (done) => {
    console.warn('path to karma', pathToKarmaConf, __dirname);
    done();

/*    karma.server.start({
        configFile: pathToKarmaConf + '/karma.conf.js',
        singleRun: isTravis
    }, done);*/
});
