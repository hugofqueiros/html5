/**
 * Created by hugo.queiros on 07/04/16.
 */
//import angular from 'angular';

const angular = require('angular');

angular
    .module('app', [])
    .controller('CoreController', require('./controllers/CoreController'))