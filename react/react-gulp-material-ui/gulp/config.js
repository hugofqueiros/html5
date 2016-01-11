/**
 * Created by hfq on 8/01/16.
 */
'use strict';

var dest = './build';
var src = './src';
var mui = './node_modules/material-ui/src';

module.exports = {
	browserSync: {
		server: {
			// serving the src folder as well for sacc sourcemap linking
			baseDir: [dest, src]
		},
		files: [
			dest + '/**'
		]
	},
	markup: {
		src: src + '/www/**',
		dest: dest
	},
	browserify: {
		// Enable source maps
		debug: true,
		bundleConfigs: [{
			entries: src + '/app/app.jsx',
			dest: dest,
			outputName: 'app.js'
		}],
		extensions: ['.jsx']
	}
};
