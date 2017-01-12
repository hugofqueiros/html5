import notify from 'gulp-notify';

let handleErrors = function() {
    let args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    this.emit('end');
};

export default handleErrors;
