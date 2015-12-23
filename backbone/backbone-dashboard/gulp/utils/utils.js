/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var gutil = require('gulp-util');

var checkEnv = function(env) {
	if (env === 'production' || env === 'staging' || env === 'testing') {
		return true;
	} else {
		gutil.log(gutil.colors.bgRed('env var not setted, try build with:' +
			' $gulp dist --env (production || staging || testing)'));
		process.exit(1);
	}
};

module.exports = checkEnv;