'use strict';

var Backbone = require('backbone');
var jquery = require('jquery');
var _ = require('lodash');

window.$ = window.jQuery = Backbone.$ = jquery;
window._ = _;

require('bootstrap');

/**
 * Patch Backbone Sync
 */
Backbone.emulateJSON = true;
var methodMap = {
    create: 'POST',
    update: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE',
    read: 'GET'
};

var urlError = function () {
    throw new Error('A "url" property or function must be specified');
};

Backbone.sync = function (method, model, options) {
    var type = methodMap[method];

    // Throw an error when a URL is needed, and none is supplied.
    // Default options, unless specified.
    _.defaults(options || (options = {}), {
        emulateHTTP: Backbone.emulateHTTP,
        emulateJSON: Backbone.emulateJSON
    });

    var params = {
        type: type
    };

    // Ensure that we have a URL.
    if (!options.url) {
        params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!options.data && model && (method === 'create' || method === 'update' || method === 'patch')) {
        params.data = model.toJSON();
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));

    model.trigger('request', model, xhr, options);
    return xhr;
};