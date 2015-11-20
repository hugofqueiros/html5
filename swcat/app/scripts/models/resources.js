/**
 * Created by zhao on 09-07-2015.
 */
'use strict';

var Backbone = require('backbone');
var Config = require('../config');
var People = require('./people');
var Planets = require('./planets');
var Species = require('./species');
var Films = require('./films');
var Starships = require('./starships');
var Vehicles = require('./vehicles');

var _ = require('lodash');
var URI = require('URIjs');

module.exports = Backbone.Model.extend({
    initialize: function () {
        this.people = new People();
        this.planets = new Planets();
        this.species = new Species();
        this.films = new Films();
        this.starships = new Starships();
        this.vehicles = new Vehicles();
    },

    fetchPeople: function() {
        return new Promise(function(fulfill, reject) {
            if(!this.hasPeople()) {
                fulfill(this.people);
            }
            else {
                var planetsCollections = {};
                // http://swapi.co/api/people/?format=json&page=2
                for(var i = 1; i <= 9; i++) {
                    planetsCollections[i] = new People();
                    planetsCollections[i].url = Config.api + 'people' + Config.getRequestFormat + '&page=' + i;
                }

                Promise.all([
                    planetsCollections[1].fetch(),
                    planetsCollections[2].fetch(),
                    planetsCollections[3].fetch(),
                    planetsCollections[4].fetch(),
                    planetsCollections[5].fetch(),
                    planetsCollections[6].fetch(),
                    planetsCollections[7].fetch(),
                    planetsCollections[8].fetch()
                ])
                    .then(function() {
                        _.each(planetsCollections, function(obj) {
                            this.people.add(obj.models);
                        }.bind(this));
                        fulfill(this.people);
                    }.bind(this))
            }
        }.bind(this));
    },

    hasPeople: function() {
        return this.people.isEmpty();
    },
    
    fetchPlanets: function() {
        return new Promise(function(fulfill, reject) {
            if(!this.hasPlanets()) {
                fulfill(this.planets);
            }
            else {
                var planetsCollections = {};
                // http://swapi.co/api/people/?format=json&page=2
                for(var i = 1; i <= 8; i++) {
                    planetsCollections[i] = new Planets();
                    planetsCollections[i].url = Config.api + 'planets' + Config.getRequestFormat + '&page=' + i;
                }

                Promise.all([
                    planetsCollections[1].fetch(),
                    planetsCollections[2].fetch(),
                    planetsCollections[3].fetch(),
                    planetsCollections[4].fetch(),
                    planetsCollections[5].fetch(),
                    planetsCollections[6].fetch(),
                    planetsCollections[7].fetch(),
                ])
                    .then(function() {
                        _.each(planetsCollections, function(obj) {
                            this.planets.add(obj.models);
                        }.bind(this));
                        fulfill(this.planets);
                    }.bind(this))
            }
        }.bind(this));
    },
    
    hasPlanets: function() {
        return this.planets.isEmpty();
    },

    fetchSpecies: function() {
        return new Promise(function(fulfill, reject) {
            if(!this.hasSpecies()) {
                fulfill(this.species);
            }
            else {
                var speciesCollections = {};
                // http://swapi.co/api/people/?format=json&page=2
                for(var i = 1; i <= 4; i++) {
                    speciesCollections[i] = new Species();
                    speciesCollections[i].url = Config.api + 'species' + Config.getRequestFormat + '&page=' + i;
                }

                Promise.all([
                    speciesCollections[1].fetch(),
                    speciesCollections[2].fetch(),
                    speciesCollections[3].fetch(),
                    speciesCollections[4].fetch()
                ])
                    .then(function() {
                        _.each(speciesCollections, function(obj) {
                            this.species.add(obj.models);
                        }.bind(this));
                        fulfill(this.species);
                    }.bind(this))
            }
        }.bind(this));
    },

    hasSpecies: function() {
        return this.species.isEmpty();
    },

    fetchFilms: function() {
        return new Promise(function(fulfill, reject) {
            if(!this.hasFilms()) {
                fulfill(this.films);
            }
            else {
                this.films.fetch()
                    .then(function() {
                        fulfill(this.films);
                    }.bind(this))
            }
        }.bind(this));
    },

    hasFilms: function() {
        return this.films.isEmpty();
    },

    fetchVehicles: function() {
        return new Promise(function(fulfill, reject) {
            if(!this.hasVehicles()) {
                fulfill(this.vehicles);
            }
            else {
                var collections = {};
                // http://swapi.co/api/people/?format=json&page=2
                for(var i = 1; i <= 8; i++) {
                    collections[i] = new Vehicles();
                    collections[i].url = Config.api + 'vehicles' + Config.getRequestFormat + '&page=' + i;
                }

                Promise.all([
                    collections[1].fetch(),
                    collections[2].fetch(),
                    collections[3].fetch(),
                    collections[4].fetch()
                ])
                    .then(function() {
                        _.each(collections, function(obj) {
                            this.vehicles.add(obj.models);
                        }.bind(this));
                        fulfill(this.vehicles);
                    }.bind(this))
            }
        }.bind(this));
    },

    hasVehicles: function() {
        return this.vehicles.isEmpty();
    },

    fetchStarships: function() {
        return new Promise(function(fulfill, reject) {
            if(!this.hasStarships()) {
                fulfill(this.starships);
            }
            else {
                var collections = {};
                // http://swapi.co/api/people/?format=json&page=2
                for(var i = 1; i <= 4; i++) {
                    collections[i] = new Starships();
                    collections[i].url = Config.api + 'starships' + Config.getRequestFormat + '&page=' + i;
                }

                Promise.all([
                    collections[1].fetch(),
                    collections[2].fetch(),
                    collections[3].fetch(),
                    collections[4].fetch()
                ])
                    .then(function() {
                        _.each(collections, function(obj) {
                            this.starships.add(obj.models);
                        }.bind(this));
                        fulfill(this.starships);
                    }.bind(this))
            }
        }.bind(this));
    },

    hasStarships: function() {
        return this.starships.isEmpty();
    }


});