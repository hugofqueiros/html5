/**
 * Created by zhao on 08-07-2015.
 */
'use strict';
var Marionette = require('backbone.marionette');
var App = module.exports = new Marionette.Application();
var Config = require('../config');
var Router = require('page');

var _ = require('lodash');

App.config = Config;
App.router = Router;

App.addRegions({
    body: '#app'
});

App.addInitializer(function() {
    var Layout = require('./layout/views/base-layout');
    App.layout = new Layout();
    App.getRegion('body').show(App.layout);
});

App.go = function(path) {
    if ('string' === typeof path) {
        Router.apply(Router, arguments);
    }
};

App.route = function(path, fn) {
    if ('function' === typeof fn) {
        Router.apply(Router, arguments);
    }
};

App.content = function(view) {
    App.layout.content.show(view);
};
