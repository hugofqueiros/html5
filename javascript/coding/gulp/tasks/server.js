import gulp from 'gulp';
import { server, dest } from '../config';

import { create as bsCreate } from 'browser-sync';
import connectLogger from 'connect-logger';

const browserSync = bsCreate();

gulp.task('server', () => {
    const opts = {
        files: {
            src: './dist/styles'
        },
        ui: {
            port: server.port + 1
        },
        server: {
            baseDir: dest
        },
        middleware: [connectLogger()]
    };
    const serverOptions = Object.assign({}, server, opts);

    browserSync.init(serverOptions);
});

export default browserSync;
