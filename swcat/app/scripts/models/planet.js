'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Config = require('../config');

module.exports = Backbone.Model.extend({
    urlRoot: Config.api + 'planets' + Config.getRequestFormat,

    defaults: {
        climate: '',
        diameter: '',
        gravity: '',
        name: '',
        orbital_period: '',
        population: '',
        rotation_period: '',
        surface_water: '',
        films: [],
        residents: [],
        terrain: '',
        url: '',
        created: '',
        edited: ''
    }
});