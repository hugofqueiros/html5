// Rather than having hard coded webpack.configjs for each env, this file
// generates a webpack config for the env passed to the getConfig method

var webpack = require('webpack');
var path = require('path');

var getPlugins = function(env) {
  var plugins = [new webpack.optimize.OccurenceOrderPlugin()];

  switch(env) {
    case: 'production':
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true}));
      break;
    case 'development':
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }

  return plugins;
}

var getLoaders = function(env) {
  var loaders = [
    { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel', 'eslint'] },
    { test: /(\.css|\.scss)$/, include: path.join(__dirname, 'src'), loaders: ['style', 'css', 'sass'] }
  ];

  return loaders;
};

var getEntry = function(env) {
  var entry = [];

  if (env == 'development') { // hot reloading only in development
    entry.push('webpack-hot-middleware/client');
  }

  entry.push('./src/entry');
  return entry;
};

module.exports = function getConfig(env) {
  return {
    debug: true,
    devtool: env == 'production' ? 'source-map' : 'eval-source-map' //more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    noInfo: false, //set to false to see a list of every file being bundled.
    entry: getEntry(env),
    target: env == 'test' ? 'node' : 'web',  //necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
      path: __dirname + '/dist/js',
      publicPath: '/js/',
      filename: 'bundle.js'
    },
    plugins: getPlugins(env),
    module: {
      loaders: getLoaders(env)
    }
  }
};
