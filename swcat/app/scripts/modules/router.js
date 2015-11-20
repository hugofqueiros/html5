/**
 * Created by hfq on 08-07-2015.
 */
'use strict';

var _ = require('lodash');
var uri = require('URIjs');
var App = require('./app');
var Resources = require('../models/resources');

function Router() {
    if(!(this instanceof Router)) {
        return new Router();
    }

    this.resources = new Resources();

    console.log('Router', this);

    App.router('/', '/home');
    App.router('/home', this.home.bind(this));
    App.router('/people', this.people.bind(this));
    App.router('/planets', this.planets.bind(this));
    App.router('/films', this.films.bind(this));
    App.router('/vehicles', this.vehicles.bind(this));
    App.router('/starships', this.starships.bind(this));
    App.router('/species', this.species.bind(this));
}

module.exports = Router;

Router.prototype.home = function() {
    var Section = require('./home/views/home-section');
    App.content(new Section());
};

Router.prototype.people = function() {
    var Section = require('./people/people-section-view');
    Promise.all([
        this.resources.fetchPeople(),
        this.resources.fetchPlanets()
    ])
        .then(function(result) {
            App.content(new Section({
                model: result[0],
                planets: result[1]
            }));
        }.bind(this));
};

Router.prototype.planets = function() {
    var Section = require('./planets/planets-section-view');
    this.resources.fetchPlanets()
        .then(function(result) {
            App.content(new Section({
                model: result
            }));
        }.bind(this));
};

Router.prototype.films = function() {
    var Section = require('./films/films-section-view');
    this.resources.fetchFilms()
        .then(function(result) {
            App.content(new Section({
                model: result
            }));
        }.bind(this));
};

Router.prototype.vehicles = function() {
    var Section = require('./vehicles/vehicles-section-view');
    this.resources.fetchVehicles()
        .then(function(result) {
            App.content(new Section({
                model: result
            }));
        }.bind(this));
};

Router.prototype.species = function() {
    var Section = require('./species/species-section-view');
    this.resources.fetchSpecies()
        .then(function(result) {
            App.content(new Section({
                model: result
            }));
        }.bind(this));
};

Router.prototype.starships = function() {
    var Section = require('./starships/starships-section-view');
    this.resources.fetchStarships()
        .then(function(result) {
            App.content(new Section({
                model: result
            }));
        }.bind(this));
};
