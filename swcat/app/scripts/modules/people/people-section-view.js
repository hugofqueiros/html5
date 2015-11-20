'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');
var Card = require('../components/card/card');
var CardRelated = require('../components/card-related/card-related');
var selectize = require('selectize');

module.exports = Marionette.LayoutView.extend({
    initialize: function () {
        this.addRegionsToLayout();

        this.planets = this.options.planets.toJSON();

        this.peopleData = [];
        this.peopleData.push({
            name: 'All'
        });
        this.model.each(function (obj) {
            this.peopleData.push({
                name: obj.get('name')
            });
        }.bind(this));

        this.modelsToShow = this.model;
    },

    template: require('./people-section-view.tpl'),

    className: 'Section',

    ui: {
        searchPeople: '#search',
        search: '.search'
    },

    serializeData: function () {
        return {
            model: this.model
        }
    },

    addRegionsToLayout: function () {
        this.model.each(function (obj, i) {
            this.addRegion('Person' + i, '.person' + i);
        }.bind(this));
    },

    onShow: function () {
        this.ui.searchPeople.selectize({
            maxItems: 1,
            sortField: 'name',
            searchField: 'name',
            valueField: 'name',
            labelField: 'name',
            options: this.peopleData,
            onChange: function (value) {
                if(value === 'All') {
                    this.modelsToShow = this.model;
                    this.showPeople();
                }
                else {
                    this.modelsToShow = this.model.filter(function (obj) {
                        return (obj.get('name') === value)
                    });
                    this.showPerson();
                }
            }.bind(this)
        });

        this.showPeople();
    },

    showPeople: function() {
        this.model.each(function (obj, i) {
            this['Person' + i].show(new Card({
                model: obj,
                type: 'person',
                planet: _.find(this.planets, {url: obj.get('homeworld')}).name
            }));
        }.bind(this));
    },

    showPerson: function() {
        this.model.each(function (obj, i) {
            this['Person' + i].reset();
        }.bind(this));

        var planet = _.find(this.planets, {url: this.modelsToShow[0].get('homeworld')});
        this['Person0'].show(new Card({
            model: this.modelsToShow[0],
            type: 'person',
            planet: planet.name
        }));

        var models = this.model.toJSON();
        this['Person1'].show(new CardRelated({
            related: _.filter(models, {homeworld: this.modelsToShow[0].get('homeworld')})
        }));
    }
});