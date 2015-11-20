'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');
var Card = require('../components/card/card');

module.exports = Marionette.LayoutView.extend({
    initialize: function () {
        this.addRegionsToLayout();
    },

    template: require('./vehicles-section-view.tpl'),

    className: 'Section',

    serializeData: function () {
        return {
            model: this.model
        }
    },

    addRegionsToLayout: function () {
        this.model.each(function (obj, i) {
            this.addRegion('Vehicle' + i, '#vehicle' + i);
        }.bind(this));
    },

    onShow: function() {
        this.model.each(function (obj, i) {
            this['Vehicle' + i].show(new Card({
                model: obj,
                type: 'vehicle'
            }));
        }.bind(this));
    }
});