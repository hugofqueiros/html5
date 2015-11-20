'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: require('./card-related.tpl'),

    serializeData: function() {
        return {
            related: this.options.related
        }
    },

    className: 'Card'
});