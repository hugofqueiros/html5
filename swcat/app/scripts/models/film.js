'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Config = require('../config');

module.exports = Backbone.Model.extend({
    urlRoot: Config.api + 'films' + Config.getRequestFormat
});