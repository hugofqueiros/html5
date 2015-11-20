'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Config = require('../config');

module.exports = Backbone.Model.extend({
    urlRoot: Config.api + 'people' + Config.getRequestFormat,

    defaults: {
        name: '',
        birth_year: '',
        eye_color: '',
        gender: '',
        hair_color: '',
        height: '',
        mass: '',
        skin_color: '',
        homeworld: '',
        films: [],
        species: [],
        starships: [],
        vehicles: [],
        url: '',
        created: '',
        edited: ''
    }
});