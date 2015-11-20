'use strict';

var Marionette = require('backbone.marionette');
var App = require('../../app');
var Config = require('../../../config');
var _ = require('lodash');

module.exports = Marionette.LayoutView.extend({
    template: require('../templates/base-layout.tpl'),

    regions: {
        header: '#header',
        headerTitle:   '.Header-title',
        headerOptions: '.Header-options',
        content:       '#content'
    },

    ui: {
        header:         '#header',
        headerTitle:    '.Header-title',
        contentWrapper: '#content-wrapper',
        content:        '#content'
    }
});