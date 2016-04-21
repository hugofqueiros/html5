import angular from 'angular';
import uirouter from 'angular-ui-router';

import MainController from './controllers/MainController';
import MainController2 from './controllers/MainController2';
import ListController from './controllers/ListController';
import DataService from './services/DataService';

// Modules
// only angular.module('app'), define or load a module is the same
// This is he way to define angular.module('app', []);
angular.module('app', [uirouter])
/*
    .controller('MainController', ['$http', function($http) {
        // how you define inject / see minify
    }])*/
    .controller('MainController', MainController)
    .controller('MainController2', MainController2)
    .controller('ListController', ListController)
    .constant('CONFIG', {foo: 'bar'})
    // wait for the this (whole instance
        // service and factory are almost the same
    //.service('DataService', DataService)

    // factory waits for a function
    //.factory('DataService', DataService)

    // provider functins that are called before the service
    .provider('DataService', DataService)
    // for the provider - before even to launch the app - in the config you can only inject providers
    // load before the load of all modules
    // example: google analytics needs the id
    .config(function (DataServiceProvider, $stateProvider, $urlRouterProvider) {
        //this.foo = DataService;
        DataServiceProvider.load({
            providing: true
        })

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('root', {
                url: '/',
                views: {
                    mainView: {
                        controller: 'MainController as main',
                        // controller: 'MainController'
                        // controllerAs: 'main'
                        templateUrl: '/views/root.html'
                    }
                }
            })
            .state('list', {
                url: '/list/:id',
                views: {
                    mainView: {
                        controller: 'ListController',
                        controllerAs: 'list',
                        templateUrl: '/views/list.html'
                    }
                }
            })


    });

