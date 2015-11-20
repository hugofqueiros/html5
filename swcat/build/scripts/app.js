(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config = {
    root: '',

    api: 'http://swapi.co/api/',

    getRequestFormat: '/?format=json'
};

/**
 * Make config immutable
 */
Object.freeze(config);

module.exports = config;
},{}],2:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var jquery = require('jquery');
var _ = require('lodash');

window.$ = window.jQuery = Backbone.$ = jquery;
window._ = _;

require('bootstrap');

/**
 * Patch Backbone Sync
 */
Backbone.emulateJSON = true;
var methodMap = {
    create: 'POST',
    update: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE',
    read: 'GET'
};

var urlError = function () {
    throw new Error('A "url" property or function must be specified');
};

Backbone.sync = function (method, model, options) {
    var type = methodMap[method];

    // Throw an error when a URL is needed, and none is supplied.
    // Default options, unless specified.
    _.defaults(options || (options = {}), {
        emulateHTTP: Backbone.emulateHTTP,
        emulateJSON: Backbone.emulateJSON
    });

    var params = {
        type: type
    };

    // Ensure that we have a URL.
    if (!options.url) {
        params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!options.data && model && (method === 'create' || method === 'update' || method === 'patch')) {
        params.data = model.toJSON();
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));

    model.trigger('request', model, xhr, options);
    return xhr;
};
},{"backbone":"backbone","bootstrap":"bootstrap","jquery":"jquery","lodash":"lodash"}],3:[function(require,module,exports){
'use strict';

console.time('Startup Total');
console.time('Startup Loading');

require('./globals');

var App = require('./modules/app');

console.timeEnd('Startup Loading');
console.time('Startup Routing');

// Routing
App.router.base(App.config.root);

require('./modules/router')();

App.start();
App.router.start();

console.timeEnd('Startup Routing');
console.timeEnd('Startup Total');
},{"./globals":2,"./modules/app":17,"./modules/router":32}],4:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Config = require('../config');

module.exports = Backbone.Model.extend({
    urlRoot: Config.api + 'films' + Config.getRequestFormat
});
},{"../config":1,"backbone":"backbone","lodash":"lodash"}],5:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Film = require('./film');
var Config = require('../config');

module.exports = Backbone.Collection.extend({
    initialize: function() {

    },

    model: Film,

    comparator: 'name',

    url: Config.api + 'films' + Config.getRequestFormat,

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        // Wrap an optional error callback with a fallback error event.
        var wrapError = function(model, options) {
            var error = options.error;
            options.error = function(resp) {
                if (error) error.call(options.context, model, resp, options);
                model.trigger('error', model, resp, options);
            };
        };

        options = _.extend({parse: true}, options);
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp.results, options);
            if (success) success.call(options.context, collection, resp.results, options);
            collection.trigger('sync', collection, resp.results, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    }
});
},{"../config":1,"./film":4,"backbone":"backbone","lodash":"lodash"}],6:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Person = require('./person');
var Config = require('../config');

module.exports = Backbone.Collection.extend({
    initialize: function() {

    },

    model: Person,

    comparator: 'name',

    url: Config.api + 'people' + Config.getRequestFormat,

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        // Wrap an optional error callback with a fallback error event.
        var wrapError = function(model, options) {
            var error = options.error;
            options.error = function(resp) {
                if (error) error.call(options.context, model, resp, options);
                model.trigger('error', model, resp, options);
            };
        };

        options = _.extend({parse: true}, options);
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp.results, options);
            if (success) success.call(options.context, collection, resp.results, options);
            collection.trigger('sync', collection, resp.results, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    }
});
},{"../config":1,"./person":7,"backbone":"backbone","lodash":"lodash"}],7:[function(require,module,exports){
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
},{"../config":1,"backbone":"backbone","lodash":"lodash"}],8:[function(require,module,exports){
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
},{"../config":1,"backbone":"backbone","lodash":"lodash"}],9:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Planet = require('./planet');
var Config = require('../config');

module.exports = Backbone.Collection.extend({
    initialize: function() {

    },

    model: Planet,

    comparator: 'name',

    url: Config.api + 'planets' + Config.getRequestFormat,

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        // Wrap an optional error callback with a fallback error event.
        var wrapError = function(model, options) {
            var error = options.error;
            options.error = function(resp) {
                if (error) error.call(options.context, model, resp, options);
                model.trigger('error', model, resp, options);
            };
        };

        options = _.extend({parse: true}, options);
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp.results, options);
            if (success) success.call(options.context, collection, resp.results, options);
            collection.trigger('sync', collection, resp.results, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    }
});
},{"../config":1,"./planet":8,"backbone":"backbone","lodash":"lodash"}],10:[function(require,module,exports){
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
},{"../config":1,"./films":5,"./people":6,"./planets":9,"./species":12,"./starships":14,"./vehicles":16,"URIjs":"URIjs","backbone":"backbone","lodash":"lodash"}],11:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Config = require('../config');

module.exports = Backbone.Model.extend({
    urlRoot: Config.api + 'species' + Config.getRequestFormat
});
},{"../config":1,"backbone":"backbone","lodash":"lodash"}],12:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Specie = require('./specie');
var Config = require('../config');

module.exports = Backbone.Collection.extend({
    initialize: function() {

    },

    model: Specie,

    comparator: 'name',

    url: Config.api + 'species' + Config.getRequestFormat,

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        // Wrap an optional error callback with a fallback error event.
        var wrapError = function(model, options) {
            var error = options.error;
            options.error = function(resp) {
                if (error) error.call(options.context, model, resp, options);
                model.trigger('error', model, resp, options);
            };
        };

        options = _.extend({parse: true}, options);
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp.results, options);
            if (success) success.call(options.context, collection, resp.results, options);
            collection.trigger('sync', collection, resp.results, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    }
});
},{"../config":1,"./specie":11,"backbone":"backbone","lodash":"lodash"}],13:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Config = require('../config');

module.exports = Backbone.Model.extend({
    urlRoot: Config.api + 'starships' + Config.getRequestFormat
});
},{"../config":1,"backbone":"backbone","lodash":"lodash"}],14:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Starship = require('./starship');
var Config = require('../config');

module.exports = Backbone.Collection.extend({
    initialize: function() {

    },

    model: Starship,

    comparator: 'name',

    url: Config.api + 'starships' + Config.getRequestFormat,

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        // Wrap an optional error callback with a fallback error event.
        var wrapError = function(model, options) {
            var error = options.error;
            options.error = function(resp) {
                if (error) error.call(options.context, model, resp, options);
                model.trigger('error', model, resp, options);
            };
        };

        options = _.extend({parse: true}, options);
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp.results, options);
            if (success) success.call(options.context, collection, resp.results, options);
            collection.trigger('sync', collection, resp.results, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    }
});
},{"../config":1,"./starship":13,"backbone":"backbone","lodash":"lodash"}],15:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Config = require('../config');

module.exports = Backbone.Model.extend({
    urlRoot: Config.api + 'vehicles' + Config.getRequestFormat
});
},{"../config":1,"backbone":"backbone","lodash":"lodash"}],16:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var Vehicle = require('./vehicle');
var Config = require('../config');

module.exports = Backbone.Collection.extend({
    initialize: function() {

    },

    model: Vehicle,

    comparator: 'name',

    url: Config.api + 'vehicles' + Config.getRequestFormat,

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        // Wrap an optional error callback with a fallback error event.
        var wrapError = function(model, options) {
            var error = options.error;
            options.error = function(resp) {
                if (error) error.call(options.context, model, resp, options);
                model.trigger('error', model, resp, options);
            };
        };

        options = _.extend({parse: true}, options);
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp.results, options);
            if (success) success.call(options.context, collection, resp.results, options);
            collection.trigger('sync', collection, resp.results, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    }
});
},{"../config":1,"./vehicle":15,"backbone":"backbone","lodash":"lodash"}],17:[function(require,module,exports){
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

},{"../config":1,"./layout/views/base-layout":27,"backbone.marionette":"backbone.marionette","lodash":"lodash","page":"page"}],18:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: require('./card-related.tpl'),

    serializeData: function() {
        return {
            related: this.options.related
        }
    },

    className: 'Card'
});
},{"./card-related.tpl":19,"backbone.marionette":"backbone.marionette"}],19:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="Card-header"> <div class="Card-title--small"> Same planet people </div> </div> <div class="Card-body"> ';
 for(var i = 0; i < data.related.length; i++) { 
__p+=' <span class="Card-text"> <div>Name:</div> <div>'+
((__t=( data.related[i].name ))==null?'':__t)+
'</div> </span> ';
 } 
__p+=' </div>';
return __p;
};

},{"lodash":"lodash"}],20:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');
var m = require('moment-timezone');

module.exports = Marionette.ItemView.extend({
    initialize: function (options) {

    },

    template: require('./card.tpl'),

    serializeData: function() {
        return {
            type: this.options.type,
            title: this.model.get('name') ? this.model.get('name') : this.model.get('title'),
            model: this.model,
            created: this.model.get('created') ? m(this.model.get('created')).format('YYYY-MM-DD') : null,
            edited: this.model.get('edited') ? m(this.model.get('edited')).format('YYYY-MM-DD') : null,
            planet: this.options.planet ? this.options.planet : null
        }
    },

    className: 'Card'
});
},{"./card.tpl":21,"backbone.marionette":"backbone.marionette","moment-timezone":"moment-timezone"}],21:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="Card-header"> <div class="Card-title--small"> '+
((__t=( data.title ))==null?'':__t)+
' </div> </div> <div class="Card-body"> ';
 if(data.type === 'person') { 
__p+=' <span class="Card-text"> <div>Birth Year:</div> <div>'+
((__t=( data.model.get('birth_year') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Eye color:</div> <div>'+
((__t=( data.model.get('eye_color') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Gender:</div> <div>'+
((__t=( data.model.get('gender') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Hair Color:</div> <div>'+
((__t=( data.model.get('hair_color') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Height:</div> <div>'+
((__t=( data.model.get('height') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Mass:</div> <div>'+
((__t=( data.model.get('mass') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Skin Color:</div> <div>'+
((__t=( data.model.get('skin_color') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Homeworld:</div> <div>'+
((__t=( data.planet ))==null?'':__t)+
'</div> </span>  <span class="Card-text"> <div>Created:</div> <div>'+
((__t=( data.created ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Edited:</div> <div>'+
((__t=( data.edited ))==null?'':__t)+
'</div> </span> ';
 } else if (data.type === 'planet') { 
__p+=' <span class="Card-text"> <div>Climate:</div> <div>'+
((__t=( data.model.get('climate') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Diameter:</div> <div>'+
((__t=( data.model.get('diameter') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Gravity:</div> <div>'+
((__t=( data.model.get('gravity') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Orbital Period:</div> <div>'+
((__t=( data.model.get('orbital_period') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Population:</div> <div>'+
((__t=( data.model.get('population') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Rotation Period:</div> <div>'+
((__t=( data.model.get('rotation_period') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Surface Water:</div> <div>'+
((__t=( data.model.get('surface_water') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Terrain:</div> <div>'+
((__t=( data.model.get('terrain') ))==null?'':__t)+
'</div> </span> ';
 } else if (data.type === 'film') { 
__p+=' <span class="Card-text"> <div>Directon:</div> <div>'+
((__t=( data.model.get('director') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Producer:</div> <div>'+
((__t=( data.model.get('producer') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Release Date:</div> <div>'+
((__t=( data.model.get('release_date') ))==null?'':__t)+
'</div> </span> ';
 } else if (data.type === 'vehicle') { 
__p+=' <span class="Card-text"> <div>Cargo capacity:</div> <div>'+
((__t=( data.model.get('cargo_capacity') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Crew:</div> <div>'+
((__t=( data.model.get('crew') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Cost in Credits:</div> <div>'+
((__t=( data.model.get('cost_in_credits') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Vehicle Class:</div> <div>'+
((__t=( data.model.get('vehicle_class') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Length:</div> <div>'+
((__t=( data.model.get('length') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Manufacturer:</div> <div>'+
((__t=( data.model.get('manufacturer') ))==null?'':__t)+
'</div> </span> ';
 } else if (data.type === 'specie') { 
__p+=' <span class="Card-text"> <div>Average Height:</div> <div>'+
((__t=( data.model.get('average_height') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Average Lifespan:</div> <div>'+
((__t=( data.model.get('average_lifespan') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Classification:</div> <div>'+
((__t=( data.model.get('classification') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Designation:</div> <div>'+
((__t=( data.model.get('designation') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Eye Colors:</div> <div>'+
((__t=( data.model.get('eye_colors') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Hair Colors:</div> <div>'+
((__t=( data.model.get('Hair Colors') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Language:</div> <div>'+
((__t=( data.model.get('language') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Skin Colors:</div> <div>'+
((__t=( data.model.get('skin_colors') ))==null?'':__t)+
'</div> </span> ';
 } else if (data.type === 'starship') { 
__p+=' <span class="Card-text"> <div>MGLT:</div> <div>'+
((__t=( data.model.get('MGLT') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Cost In Credits:</div> <div>'+
((__t=( data.model.get('cost_in_credits') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Crew:</div> <div>'+
((__t=( data.model.get('crew') ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Passengers:</div> <div>'+
((__t=( data.model.get('passengers') ))==null?'':__t)+
'</div> </span> ';
 } 
__p+=' <span class="Card-text"> <div>Created:</div> <div>'+
((__t=( data.created ))==null?'':__t)+
'</div> </span> <span class="Card-text"> <div>Edited:</div> <div>'+
((__t=( data.edited ))==null?'':__t)+
'</div> </span> </div>';
return __p;
};

},{"lodash":"lodash"}],22:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');
var Card = require('../components/card/card');

module.exports = Marionette.LayoutView.extend({
    initialize: function () {
        this.addRegionsToLayout();
    },

    template: require('./films-section-view.tpl'),

    className: 'Section',

    serializeData: function () {
        return {
            model: this.model
        }
    },

    addRegionsToLayout: function () {
        this.model.each(function (obj, i) {
            this.addRegion('Film' + i, '#film' + i);
        }.bind(this));
    },

    onShow: function() {
        this.model.each(function (obj, i) {
            this['Film' + i].show(new Card({
                model: obj,
                type: 'film'
            }));
        }.bind(this));
    }
});
},{"../components/card/card":20,"./films-section-view.tpl":23,"backbone.marionette":"backbone.marionette","lodash":"lodash"}],23:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="row"> ';
 var count = 1 
__p+=' ';
 data.model.each(function(obj, i) { 
__p+=' <div id="film'+
((__t=( i ))==null?'':__t)+
'" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 fade-in fade-in-'+
((__t=( count ))==null?'':__t)+
'"></div> ';
 if(count === 4) { count = 0 } 
__p+=' ';
 count++ 
__p+=' ';
 }); 
__p+=' </div>';
return __p;
};

},{"lodash":"lodash"}],24:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="home-section"> <article class="starwars"> <audio preload="auto" class="audio"> <source src="http://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.ogg" type="audio/ogg"> <source src="http://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.mp3" type="audio/mpeg"> </audio> <div class="animation"> <section class="intro"> A long time ago, in a galaxy far,<br> far away.... </section> <section class="titles"> <div contenteditable="true" spellcheck="false"> <p class="titles-header"> Episode IV </p> <p class="titles-header"> A NEW HOPE </p> <p> It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. </p> <p> During the battle, Rebel spies managed to steal secret plans to the Empire\'s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. </p> <p> Pursued by the Empire\'s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plan that can save her people and restore freedom to the galaxy.... </p> <p class="titles-header"> Episode V </p> <p class="titles-header"> THE EMPIRE STRIKES BACK </p> <p> It is a dark time for the Rebellion. Although the Death Star has been destroyed, Imperial troops have driven the Rebel forces from their hidden base and pursued them across the galaxy. </p> <p> Evading the dreaded Imperial Starfleet, a group of freedom fighters led by Luke Skywalker has established a new secret base on the remote ice world of Hoth. </p> <p> The evil lord Darth Vader, obsessed with finding young Skywalker, has dispatched thousands of remote probes into the far reaches of space.... </p> <p class="titles-header"> Episode VI </p><p class="titles-header"> RETURN OF THE JEDI </p> <p> Luke Skywalker has returned to his home planet of Tatooine in an attempt to rescue his friend Han Solo from the clutches of the vile gangster Jabba the Hutt. </p> <p> Little does Luke know that the GALACTIC EMPIRE has secretly begun construction on a new armored space station even more powerful than the first dreaded Death Star. </p> <p> When completed, this ultimate weapon will spell certain doom for the small band of rebels struggling to restore freedom to the galaxy... </p></div> </section> <section class="logo"> <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="693.615px" height="419.375px" viewBox="0 0 693.615 419.375" enable-background="new 0 0 693.615 419.375" xml:space="preserve"> <g id="Layer_2"> <g> <path fill="#FFE81F" d="M148.718,221.207l8.67,25.461c4.691,13.768,8.879,24.779,9.425,24.779c0.009,0,0.017-0.004,0.024-0.01\n			c0.6-0.53,17.57-49.811,17.57-49.811h32.89l-39.68,115.619h-22.86c0,0-24.4-70.471-24.3-70.739l-25.47,69.851h-22.63\n			l-39.18-115.15l32.73,0.021c0,0,17.929,50.821,18.168,50.821c0.001,0,0.001-0.001,0.002-0.002l17.89-50.841H148.718 M32.003,213.2\n			l3.601,10.584l39.18,115.149l1.845,5.424h5.729h22.63h5.598l1.918-5.26l17.685-48.5c1.524,4.434,3.171,9.213,4.818,13.988\n			c6.089,17.655,12.191,35.277,12.191,35.277l1.864,5.383h5.696h22.86h5.712l1.854-5.403l39.68-115.618l3.637-10.598h-11.204h-32.89\n			h-5.706l-1.858,5.396c-2.974,8.635-6.921,20.031-10.296,29.676c-0.509-1.463-1.039-3.001-1.587-4.611l-8.669-25.46l-1.846-5.421\n			h-5.727h-36.75h-5.666l-1.881,5.345l-10.453,29.706c-3.453-9.706-7.456-21.017-10.516-29.691l-1.882-5.334l-5.657-0.004\n			l-32.73-0.021L32.003,213.2L32.003,213.2z"/> </g> <g> <path fill="#FFE81F" d="M655.258,220.758l-0.075,30.305c0,0-32.643-0.109-49.239-0.109c-5.521,0-9.266,0.013-9.444,0.045\n			c-2.86,0.521-4.681,6.602-3.87,9.271c0.399,1.35,3.391,5.76,6.63,9.81c3.229,4.051,8.54,10.681,11.78,14.729\n			c8.319,10.381,9.46,12.43,10.229,18.391c1.25,9.681-3.329,20.16-11.829,27.07c-8.518,6.93-8.145,6.979-71.383,6.979\n			c-0.916,0-1.835,0-2.777,0c-38.46-0.01-58.8-0.329-61.761-0.989c-5.26-1.19-13.64-8.03-35.79-29.28\n			c-7.967-7.636-15.309-14.322-15.686-14.324c-0.01,0-0.015,0.006-0.015,0.016l-0.261,44.579l-35.899-0.159l-0.221-114.98h45.271\n			h34.79c24.13,0.871,40.46,24.91,37.21,40.24c-0.74,3.479-2.62,8.521-4.181,11.2c-3.21,5.5-11.38,12.56-18.011,15.591\n			c-2.449,1.108-4.449,2.398-4.449,2.858c0,1.71,8.061,9.649,11.08,10.91c2.579,1.079,10.09,1.319,43.21,1.319\n			c3.882,0,7.408,0.002,10.608,0.002c33.293,0,31.618-0.24,34.19-5.741c1.801-3.83,0.431-6.12-12.239-20.39\n			c-16.051-15.971-14.37-23.621-14.48-29.271c-0.229-6.77,5.102-28.069,32.812-28.069L655.258,220.758 M440.188,273.878\n			c15.37,0,18.49-0.239,21.761-1.66c11.04-4.8,11.63-18.979,1.04-25.271c-2.319-1.381-5.3-1.609-21.96-1.7l-19.279-0.101\n			c0.159,0.15-0.061,27.57-0.061,27.57S426.518,273.878,440.188,273.878 M663.277,212.758h-8.021h-73.8\n			c-16.032,0-25.515,6.328-30.646,11.637c-8.347,8.633-10.313,19.504-10.162,24.629c0.008,0.427,0.003,0.865-0.002,1.322\n			c-0.073,8.329,1.154,17.758,16.659,33.246c3.065,3.452,8.193,9.239,10.131,12.115c-4.238,0.521-14.98,0.521-26.262,0.521h-4.792\n			l-5.816-0.002c-19.904,0-36.688-0.057-40.128-0.736c-0.481-0.314-1.156-0.854-1.898-1.498c6.877-4.235,13.83-10.799,17.104-16.412\n			c1.987-3.413,4.178-9.243,5.098-13.568c2.04-9.625-1.325-21.236-9.001-31.068c-8.956-11.471-21.985-18.334-35.746-18.83\n			l-0.145-0.006h-0.145h-34.79h-45.271h-8.016l0.016,8.017l0.221,114.979l0.016,7.949l7.949,0.035l35.899,0.159l7.988,0.035\n			l0.047-7.988l0.155-26.706c0.733,0.696,1.491,1.419,2.269,2.165c24.227,23.24,32.359,29.679,39.562,31.308\n			c1.979,0.441,5.253,1.172,63.523,1.188h2.779c31.546,0,47.38,0,56.799-0.91c10.789-1.043,14.259-3.49,19.461-7.725l0.173-0.141\n			c10.685-8.687,16.323-21.83,14.715-34.3c-1.048-8.11-3.194-11.479-11.922-22.368l-2.594-3.24\n			c-3.04-3.799-6.713-8.387-9.175-11.475c-1.986-2.484-3.546-4.689-4.487-6.133c1.236-0.003,2.841-0.005,4.918-0.005\n			c16.395,0,48.887,0.108,49.213,0.11l8.008,0.026l0.02-8.008l0.075-30.306L663.277,212.758L663.277,212.758z M429.739,265.586\n			c0.013-2.021,0.025-4.287,0.038-6.557c0.01-2,0.019-4.004,0.022-5.84l11.187,0.058c6.429,0.035,16.103,0.088,17.989,0.623\n			c2.407,1.461,3.75,3.72,3.604,6.06c-0.08,1.264-0.682,3.588-3.821,4.951c-1.75,0.76-4.54,0.997-18.57,0.997\n			C435.738,265.878,432.305,265.749,429.739,265.586L429.739,265.586z"/> </g> <g> <path fill="#FFE81F" d="M312.908,220.287l40.29,115.92l-32.83,0.15l-5.45-17.41l-58.7-0.471l-5.18,17.431l-32.5-0.341\n			l39.78-115.229L312.908,220.287 M286.507,237.283c-0.083,0.333-5.144,14.219-10.222,28.104c-5.12,14-10.257,28-10.328,28.109\n			c0,0.001-0.001,0.001,0,0.001l0,0c0,0,0,0,0-0.001c0.136-0.04,18.316-0.08,29.968-0.08c5.453,0,9.475,0.009,9.55,0.029\n			c0.001,0.004,0.001,0.005,0.001,0.005s0-0.001,0-0.003c0,0,0,0-0.001-0.002C305.271,292.916,286.566,237.959,286.507,237.283\n			c0.001-0.004,0.001-0.006,0.001-0.006l0,0C286.507,237.277,286.507,237.279,286.507,237.283 M318.595,212.282l-5.693,0.005\n			l-54.59,0.051l-5.696,0.005l-1.859,5.386l-39.78,115.229l-3.623,10.494l11.102,0.115l32.5,0.341l6.033,0.063l1.719-5.782\n			l3.466-11.662l46.854,0.375l3.708,11.848l1.765,5.638l5.907-0.026l32.829-0.15l11.195-0.052l-3.676-10.574l-40.29-115.92\n			L318.595,212.282L318.595,212.282z M277.472,285.424c1.515-4.129,3.556-9.71,6.327-17.289c0.869-2.376,1.664-4.551,2.393-6.545\n			c0.663,1.956,1.385,4.084,2.169,6.398c0.646,1.906,3.485,10.27,5.92,17.428C287.041,285.416,281.591,285.417,277.472,285.424\n			L277.472,285.424z"/> </g> <g> <path fill="#FFE81F" d="M326.488,81.928v28.6h-57.28v87.47h-34.15v-87.54l-66.86,0.19c-8.06,0-9.14,6.42-9.14,8.88\n			c0,3.02,1.97,6.04,12.79,19.74c7.02,8.9,13.47,17.78,14.32,19.72c4.64,10.68-1.36,27.32-12.29,34.08\n			c-7.79,4.813-6.459,4.931-64.308,4.931c-2.974,0-6.096,0-9.392,0h-62.27v-32.13h97.9l2.89-2.01c1.95-1.36,3.08-3.23,3.51-5.79\n			c0.6-3.68,0.29-4.16-11.8-17.78c-14.29-16.1-15.8-19.04-15.06-29.32c0.84-11.73,11.3-28.77,29.58-28.77L326.488,81.928\n			 M334.488,73.916l-8.013,0.012l-181.56,0.27c-10.458,0-20.171,4.518-27.342,12.722c-5.814,6.652-9.63,15.429-10.206,23.477\n			c-0.973,13.511,2.137,18.393,17.056,35.202c4.33,4.877,8.447,9.516,9.821,11.486c-0.022,0.079-0.042,0.13-0.054,0.159\n			c-0.015,0.012-0.038,0.03-0.07,0.052l-0.822,0.572H37.908h-8v8v32.13v8h8h62.27h4.937h4.455c28.522,0,42.6-0.027,50.894-0.635\n			c9.49-0.695,12.518-2.323,17.054-5.14l0.566-0.351c14.262-8.821,21.612-29.827,15.422-44.074\n			c-1.91-4.358-14.003-19.746-15.376-21.486c-3.796-4.807-10.062-12.74-11.054-15.036c0.024-0.193,0.071-0.393,0.121-0.532\n			c0.165-0.042,0.481-0.098,1.001-0.098l58.86-0.167v79.517v8h8h34.15h8v-8v-79.47h49.28h8v-8v-28.6V73.916L334.488,73.916z"/> </g> <g> <path fill="#FFE81F" d="M419.548,82.857l40.18,116.22l-32.77-0.18l-5.32-17.41l-58.439-0.26l-5.221,16.77h-33.369l39.739-115.14\n			H419.548 M372.737,156.478l39.801-0.05c0.001,0,0.001,0.001,0.001,0.001c0.136,0-19.342-57.201-19.472-57.241l0,0\n			C392.925,99.183,372.288,156.478,372.737,156.478 M425.247,74.857h-5.699h-55.2h-5.701l-1.86,5.39l-39.74,115.141l-3.662,10.61\n			h11.225h33.37h5.889l1.75-5.623l3.461-11.121l46.632,0.207l3.599,11.774l1.721,5.629l5.887,0.033l32.77,0.18l11.297,0.062\n			l-3.691-10.676l-40.18-116.22L425.247,74.857L425.247,74.857z M383.851,148.464c2.468-7.027,5.904-16.657,9.014-25.312\n			c2.948,8.644,6.209,18.245,8.588,25.29L383.851,148.464L383.851,148.464z"/> </g> <g> <path fill="#FFE81F" d="M532.396,82.857c25.921,0,43.91,0.37,47.37,0.97c8,1.39,15.23,5.66,20.65,12.22\n			c5.67,6.86,6.97,10.14,7.71,19.54c1.061,13.27-5.25,24.72-17.7,32.15c-3.63,2.17-7.359,4.28-8.29,4.7\n			c-1.43,0.65-1.239,1.27,1.32,4.27c1.649,1.93,4.51,4.68,6.35,6.11l3.36,2.61l62.08,0.89l0.609,31.68h-38.061\n			c-29.439,0-38.86-0.27-41.62-1.2c-4.13-1.4-14.069-9.82-34.271-29.04l-14.42-13.72l0.152,43.96h-37.043V82.857H532.396\n			 M526.938,134.627h19.671c19.141,0,19.739-0.06,22.47-2.11c4.881-3.66,6.609-7.43,6.091-13.22c-0.53-5.97-2.83-9.08-8.601-11.58\n			c-3.25-1.42-6.381-1.65-21.721-1.65h-17.91V134.627 M532.396,74.857h-41.8h-8v8v115.14v8h8h37.043h8.028l-0.028-8.028\n			l-0.088-25.216l0.84,0.799c24.986,23.773,32.356,29.173,37.218,30.821c3.733,1.259,9.982,1.624,44.188,1.624h38.061h8.154\n			l-0.156-8.154l-0.609-31.68l-0.148-7.734l-7.734-0.111l-59.402-0.851l-1.245-0.967c-0.396-0.309-0.876-0.717-1.389-1.179\n			c0.446-0.264,0.854-0.507,1.207-0.717c15.003-8.953,22.866-23.407,21.569-39.653c-0.863-10.959-2.82-15.896-9.52-24\n			c-6.584-7.969-15.621-13.298-25.447-15.005C575.678,74.999,548.257,74.857,532.396,74.857L532.396,74.857z M534.938,114.067h9.91\n			c14.027,0,16.806,0.233,18.518,0.981c3.25,1.408,3.58,2.091,3.835,4.957c0.256,2.848-0.097,3.994-2.922,6.112\n			c-0.093,0.069-0.164,0.123-0.223,0.166c-1.865,0.345-8.786,0.345-17.447,0.345h-11.67L534.938,114.067L534.938,114.067z"/> </g> </g> </svg> </section> </div> </article> </div>';
return __p;
};

},{"lodash":"lodash"}],25:[function(require,module,exports){
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
},{"../templates/home-section.tpl":24,"backbone.marionette":"backbone.marionette","lodash":"lodash"}],26:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<header id="header" class="Header clearfix"> <nav class="navbar navbar-default"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand Header-title" href="/home">Star Wars</a> </div> <div class="collapse navbar-collapse Header-options" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav"> <li><a href="/people">People</a></li>  <li><a href="/planets">Planets</a></li> <li><a href="/films">Films</a></li> <li><a href="/species">Species</a></li> <li><a href="/starships">Starships</a></li> <li><a href="/vehicles">Vehicles</a></li> </ul> </div>  </div>  </nav> </header> <section id="content-wrapper" class="Content"> <div id="content" class="Content-container"></div> </section>';
return __p;
};

},{"lodash":"lodash"}],27:[function(require,module,exports){
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
},{"../../../config":1,"../../app":17,"../templates/base-layout.tpl":26,"backbone.marionette":"backbone.marionette","lodash":"lodash"}],28:[function(require,module,exports){
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
},{"../components/card-related/card-related":18,"../components/card/card":20,"./people-section-view.tpl":29,"backbone.marionette":"backbone.marionette","lodash":"lodash","selectize":"selectize"}],29:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="row"> <div class="search-section"> <select class="selectize" name="search" id="search"> <option value="">Select a Person</option> </select> </div> </div> <div class="row"> ';
 var count = 1 
__p+=' ';
 data.model.each(function(obj, i) { 
__p+=' <div id="person'+
((__t=( i ))==null?'':__t)+
'" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 person'+
((__t=( i ))==null?'':__t)+
' fade-in fade-in-'+
((__t=( count ))==null?'':__t)+
'"></div> ';
 if(count === 4) { count = 0 } 
__p+=' ';
 count++ 
__p+=' ';
 }); 
__p+=' </div>';
return __p;
};

},{"lodash":"lodash"}],30:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');
var Card = require('../components/card/card');

module.exports = Marionette.LayoutView.extend({
    initialize: function () {
        this.addRegionsToLayout();
    },

    template: require('./planets-section-view.tpl'),

    className: 'Section',

    serializeData: function () {
        return {
            model: this.model
        }
    },

    addRegionsToLayout: function () {
        this.model.each(function (obj, i) {
            this.addRegion('Planet' + i, '#planet' + i);
        }.bind(this));
    },

    onShow: function() {
        this.model.each(function (obj, i) {
            this['Planet' + i].show(new Card({
                model: obj,
                type: 'planet'
            }));
        }.bind(this));
    }
});

},{"../components/card/card":20,"./planets-section-view.tpl":31,"backbone.marionette":"backbone.marionette","lodash":"lodash"}],31:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="row"> ';
 var count = 1 
__p+=' ';
 data.model.each(function(obj, i) { 
__p+=' <div id="planet'+
((__t=( i ))==null?'':__t)+
'" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 fade-in fade-in-'+
((__t=( count ))==null?'':__t)+
'"></div> ';
 if(count === 4) { count = 0 } 
__p+=' ';
 count++ 
__p+=' ';
 }); 
__p+=' </div>';
return __p;
};

},{"lodash":"lodash"}],32:[function(require,module,exports){
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

},{"../models/resources":10,"./app":17,"./films/films-section-view":22,"./home/views/home-section":25,"./people/people-section-view":28,"./planets/planets-section-view":30,"./species/species-section-view":33,"./starships/starships-section-view":35,"./vehicles/vehicles-section-view":37,"URIjs":"URIjs","lodash":"lodash"}],33:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');
var Card = require('../components/card/card');

module.exports = Marionette.LayoutView.extend({
    initialize: function () {
        this.addRegionsToLayout();
    },

    template: require('./species-section-view.tpl'),

    className: 'Section',

    serializeData: function () {
        return {
            model: this.model
        }
    },

    addRegionsToLayout: function () {
        this.model.each(function (obj, i) {
            this.addRegion('Specie' + i, '#specie' + i);
        }.bind(this));
    },

    onShow: function() {
        this.model.each(function (obj, i) {
            this['Specie' + i].show(new Card({
                model: obj,
                type: 'specie'
            }));
        }.bind(this));
    }
});

},{"../components/card/card":20,"./species-section-view.tpl":34,"backbone.marionette":"backbone.marionette","lodash":"lodash"}],34:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="row"> ';
 var count = 1 
__p+=' ';
 data.model.each(function(obj, i) { 
__p+=' <div id="specie'+
((__t=( i ))==null?'':__t)+
'" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 fade-in fade-in-'+
((__t=( count ))==null?'':__t)+
'"></div> ';
 if(count === 4) { count = 0 } 
__p+=' ';
 count++ 
__p+=' ';
 }); 
__p+=' </div>';
return __p;
};

},{"lodash":"lodash"}],35:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');
var Card = require('../components/card/card');

module.exports = Marionette.LayoutView.extend({
    initialize: function () {
        this.addRegionsToLayout();
    },

    template: require('./starships-section-view.tpl'),

    className: 'Section',

    serializeData: function () {
        return {
            model: this.model
        }
    },

    addRegionsToLayout: function () {
        this.model.each(function (obj, i) {
            this.addRegion('Starship' + i, '#starship' + i);
        }.bind(this));
    },

    onShow: function() {
        this.model.each(function (obj, i) {
            this['Starship' + i].show(new Card({
                model: obj,
                type: 'starship'
            }));
        }.bind(this));
    }
});

},{"../components/card/card":20,"./starships-section-view.tpl":36,"backbone.marionette":"backbone.marionette","lodash":"lodash"}],36:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="row"> ';
 var count = 1 
__p+=' ';
 data.model.each(function(obj, i) { 
__p+=' <div id="starship'+
((__t=( i ))==null?'':__t)+
'" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 fade-in fade-in-'+
((__t=( count ))==null?'':__t)+
'"></div> ';
 if(count === 4) { count = 0 } 
__p+=' ';
 count++ 
__p+=' ';
 }); 
__p+=' </div>';
return __p;
};

},{"lodash":"lodash"}],37:[function(require,module,exports){
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
},{"../components/card/card":20,"./vehicles-section-view.tpl":38,"backbone.marionette":"backbone.marionette","lodash":"lodash"}],38:[function(require,module,exports){
var _ = require('lodash');
module.exports = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="row"> ';
 var count = 1 
__p+=' ';
 data.model.each(function(obj, i) { 
__p+=' <div id="vehicle'+
((__t=( i ))==null?'':__t)+
'" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 fade-in fade-in-'+
((__t=( count ))==null?'':__t)+
'"></div> ';
 if(count === 4) { count = 0 } 
__p+=' ';
 count++ 
__p+=' ';
 }); 
__p+=' </div>';
return __p;
};

},{"lodash":"lodash"}]},{},[3])


//# sourceMappingURL=app.js.map