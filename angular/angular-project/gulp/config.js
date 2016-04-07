module.exports = {
    src: 'src/',
    dest: 'dist/',
    server: {
        debug: true,
        notify: true,
        path: 'dist/',
        logPrefix: 'ES6 Boilerplate',
        logConnections: true,
        logFileChanges: true,
        logSnippet: true,
        online: true,
        reloadOnRestart: true,
        injectChanges: true,
        port: 3000,
        open: false
    },
    environment: {
        env: 'develop',
        minifyJs: false,
        minifyCSS: false,
        sourcemaps: true
    },
    browserAutoPrefixers: [
        'ie >= 11',
        'ie_mob >= 11',
        'ff >= 43',
        'chrome >= 47',
        'safari >= 9',
        'opera >= 34',
        'ios >= 8.4',
        'android >= 46',
        'bb >= 10'
    ]
};
