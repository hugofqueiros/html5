/**
 * Created by hugo.queiros on 04/07/16.
 */

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = {
    devtool: 'inline-source-map', // a sourcemap is added as DataUrl to the JS file

    entry:
        fs.readdirSync(__dirname).reduce(function (entries, dir) {

            if (fs.statSync(path.join(__dirname, dir)).isDirectory() &&
                fs.existsSync(path.join(__dirname, dir, 'app.js'))) {

                entries[dir] = path.join(__dirname, dir, 'app.js');
            }

            console.log('entries', entries);

            return entries;
        }, {}),

    //entry: './index.js',


    output: {
        //path: 'tutorial',
        path: __dirname + '/__build__',
        filename: 'bundle.js',
        //publicPath: '/'
        publicPath: '/__build__/'
    },

/*    output: {
        path: 'public',
        filename: 'bundle.js',
        publicPath: '/'
    },*/

/*    plugins: [
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]*/

    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        //new webpack.optimize.CommonsChunkPlugin('shared.js')
    ],

    // webpack-dev-server: little express server which uses the webpack-dev-middleware to serve
    // a webpack bundle
    devServer: {
        inline: true, // reload on the fly
        port: 3333,
        //contentBase: 'public/',
        contentBase: './',
        historyApiFallback: true,
        stats: { colors: true },
        //hot: true,
        open: true //,
        //publicPath: '/'
        //publicPath: 'public/' //,
        // publicPath: '/__build__/' //,
        //noInfo: true
    },

    context: __dirname,
    node: {
        __dirname: true
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                //loader: 'babel-loader?presets[]=es2015&presets[]=react'
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
};