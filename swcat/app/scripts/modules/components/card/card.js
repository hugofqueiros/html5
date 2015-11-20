'use strict';

var Marionette = require('backbone.marionette');
var m = require('moment-timezone');

module.exports = Marionette.ItemView.extend({
    initialize: function (options) {

    },

    template: require('./card.tpl'),

    serializeData: function() {
        return {
            type: this.options.type,
            title: this.model.get('name') ? this.model.get('name') : this.model.get('title'),
            model: this.model,
            created: this.model.get('created') ? m(this.model.get('created')).format('YYYY-MM-DD') : null,
            edited: this.model.get('edited') ? m(this.model.get('edited')).format('YYYY-MM-DD') : null,
            planet: this.options.planet ? this.options.planet : null
        }
    },

    className: 'Card'
});