/**
 * Created by hfq on 22/12/15.
 */
'use strict';

var notify = require('gulp-notify');

module.exports = function() {

	var args = Array.prototype.slice.call(arguments);

	// Send error to notification center with gulp-notify
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);

	// Keep gulp from hanging on this task
	this.emit('end');
};