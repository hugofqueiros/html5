import gutil from 'gulp-util';
import prettyHrtime from 'pretty-hrtime';

let startTime;

let bundleLogger = {
    start: (filepath) => {
        startTime = process.hrtime();
        gutil.log('Start Bundler', gutil.colors.green(filepath));
    },
    end: (filepath) => {
        const taskTime = process.hrtime(startTime);
        const prettyTime = prettyHrtime(taskTime);
        gutil.log('End Bundler', gutil.colors.green(filepath), 'in',
            gutil.colors.magenta(prettyTime));
    }
};

export default bundleLogger;
