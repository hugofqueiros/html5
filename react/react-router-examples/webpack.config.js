/**
 * Created by hugo.queiros on 04/07/16.
 */

var webpack = require('webpack');

module.exports = {
    entry: './index.js',

    output: {
        path: 'public',
        filename: 'bundle.js',
        publicPath: '/'
    },

    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [],

    devServer: {
        inline: true, // reload on the fly
        port: 3333,
        contentBase: 'public/',
        historyApiFallback: true
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
            }
        ]
    }
};