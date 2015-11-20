'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');
var Card = require('../components/card/card');

module.exports = Marionette.LayoutView.extend({
    initialize: function () {
        this.addRegionsToLayout();
    },

    template: require('./planets-section-view.tpl'),

    className: 'Section',

    serializeData: function () {
        return {
            model: this.model
        }
    },

    addRegionsToLayout: function () {
        this.model.each(function (obj, i) {
            this.addRegion('Planet' + i, '#planet' + i);
        }.bind(this));
    },

    onShow: function() {
        this.model.each(function (obj, i) {
            this['Planet' + i].show(new Card({
                model: obj,
                type: 'planet'
            }));
        }.bind(this));
    }
});
