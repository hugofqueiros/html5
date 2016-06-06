const NODE_ENV = process.env.NODE_ENV;
const dotenv = require('dotenv');

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const join = path.join;
const resolve = path.resolve;

const getConfig = require('hjs-webpack');

const isDev = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

const root = resolve(__dirname);
const src = join(root, 'src');
const modules = join(root, 'node_modules');
const dest = join(root, 'dist');

var config = getConfig({
    isDev: isDev,
    in: join(src, 'app.js'),
    out: dest,
    // clearBeforeBuild: true,
    html: function(context) {
        return {
            'index.html': context.defaultTemplate({
                title: 'yelp-clone from hugofqueiros.com',
                publicPath: isDev ? 'http://localhost:3000/' : '',
                meta: {
                    'name': 'yelp clone',
                    'description': 'A minimal yelp clone'
                }
            })
        }
    }
});

/**
 * ENV variables
 *
 * load environment variables
 *
 * let's load the environment variables from .env file.
 * To load these files in our server, we can use the same function, except adding a
 * few options to change the source of the file.
 *
 * we can merge these two objects together to allow the environment-based [env].config.js
 * file to overwrite the global one using Object.assign()
 */
const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
    path: join(root, 'config', `${NODE_ENV}.config.js`),
    silent: true
});

// Our envVariables now contains all the environment variables and globally defined environment variables.
// In order to reference them in out app, we'll need to grant access to this envVariables variable.
const envVariables =
    Object.assign({}, dotEnvVars, environmentEnv);

// create an object that contains conventional values in our source with their stringified values
// defines object can now become the configuration object that the DefinePlugin() plugin expects
// to use to replace variables. We'll prepend the existing webpack plugin list with our DefinePlugin()
const defines =
    Object.keys(envVariables)
        .reduce((memo, key) => {
            const val = JSON.stringify(envVariables[key]);
            memo[`__${key.toUpperCase()}__`] = val;
            return memo;
        }, {
            __NODE_ENV__: JSON.stringify(NODE_ENV)
        });

config.plugins = [
    new webpack.DefinePlugin(defines)
].concat(config.plugins);
/**
 * END ENV variables
 */

/**
 * CSS modules
 */

/**
 * Dynamic naming scheme for the module names
 */
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

// modifying existing hjs-webpack css loading
// load initial loader by finding it in the array "config.module.loaders"
const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
    const found = loaders.filter(l => l && l.loader && l.loader.match(match));
    return found ? found[0] : null;
};

/**
 * With the loader found in the existing module-loaders list, we can create a clone
 * of the loader and add a new one that targets modules.
 *
 * create a new loader and modify the existing loader to support loading css modules.
 */
const cssloader =
    findLoader(config.module.loaders, matchCssLoaders);

const newloader = Object.assign({}, cssloader, {
    test: /\.module\.css$/,
    include: [src],
    loader: cssloader.loader.replace(matchCssLoaders, `$1$2?modules&localIdentName=${cssModulesNames}$3`)
});
config.module.loaders.push(newloader);
cssloader.test = new RegExp(`[^module]${cssloader.test.source}`);
cssloader.loader = newloader.loader;

/**
 * for loading any other css files, such as font awesome, we'll include another css loader for webpack
 * to load without modules support
 */
config.module.loaders.push({
    test: /\.css$/,
    include: [modules],
    loader: 'style!css'
});
/**
 * END CSS MODULES
 */

/**
 * PostCSS
 * @type {Array.<T>}
 */
config.postcss = [].concat([
    require('precss')({}),
    require('autoprefixer')({
        browsers: ['last 2 versions']
    }),
    require('cssnano')({})
]);
/**
 * END postcss
 */

/**
 * Roots
 *
 * use webpack to make packaging our relative requires simpler.
 * Rather than requiring files relative to the directory that the current file is located in,
 * we can require them unsing an alias
 *
 * @type {*[]}
 */
config.resolve.root = [src, modules];
config.resolve.alias = {
    'css': join(src, 'styles'),
    'containers': join(src, 'containers'),
    'components': join(src, 'components'),
    'utils': join(src, 'utils'),

    'styles': join(src, 'styles')
};
/**
 * end Roots
 */

// console.log(require('prettyjson').render(config));

/**
 * Testing
 */
if (isTest) {
    config.externals = {
        'react/lib/ReactContext': true,
        'react/lib/ExecutionEnvironment': true
    };
    config.module.noParse = /\/sinon\.js/;
    config.resolve.alias['sinon'] = 'sinon/pkg/sinon';

    config.plugins = config.plugins.filter(p => {
        const name = p.constructor.toString();
        const fnName = name.match(/^function (.*)\((.*\))/);

        const idx = [
            'DedupePlugin',
            'UglifyJsPlugin'
        ].indexOf(fnName[1]);
        return idx < 0;
    })
}
/**
 * End Testing
 */

module.exports = config;
