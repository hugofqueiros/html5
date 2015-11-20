'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Starship = require('./starship');
var Config = require('../config');

module.exports = Backbone.Collection.extend({
    initialize: function() {

    },

    model: Starship,

    comparator: 'name',

    url: Config.api + 'starships' + Config.getRequestFormat,

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        // Wrap an optional error callback with a fallback error event.
        var wrapError = function(model, options) {
            var error = options.error;
            options.error = function(resp) {
                if (error) error.call(options.context, model, resp, options);
                model.trigger('error', model, resp, options);
            };
        };

        options = _.extend({parse: true}, options);
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp.results, options);
            if (success) success.call(options.context, collection, resp.results, options);
            collection.trigger('sync', collection, resp.results, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    }
});