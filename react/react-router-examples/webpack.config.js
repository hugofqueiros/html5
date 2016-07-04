/**
 * Created by hugo.queiros on 04/07/16.
 */
module.exports = {
    entry: './index.js',

    output: {
        filename: 'bundle.js',
        publicPath: ''
    },

    devServer: {
        inline: true, // reload on the fly
        port: 3333,
        contentBase: '.'
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