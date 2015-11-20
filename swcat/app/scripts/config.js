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