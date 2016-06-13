/**
 * Created by hugo.queiros on 13/06/16.
 */
module.exports = {
    staticFileGlobs: [
        '/index.html',
        '/manifest.json',
        '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
        '/images/*'
    ],
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],
    runtimeCaching: [
        {
            urlPattern: /\/data\/images\/.*/,
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxEntries: 200,
                    name: 'items-cache'
                }
            }
        },
        {
            urlPattern: /\/data\/.*json/,
            handler: 'fastest',
            options: {
                cache: {
                    maxEntries: 100,
                    name: 'data-cache'
                }
            }
        }
    ]
};