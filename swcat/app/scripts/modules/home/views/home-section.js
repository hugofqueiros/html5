'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');

module.exports = Marionette.LayoutView.extend({
    initialize: function () {

    },

    template: require('../templates/home-section.tpl'),

    regions: {},

    ui: {
        starwars: '.starwars',
        audio: '.audio',
        animation: '.animation'
    },

    onShow: function () {
        this.audio = $('audio').get(0);
        this.audio.volume = 1;
        this.audio.loop = true;

        this.audio.play();
    }
});