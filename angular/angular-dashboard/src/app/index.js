/**
 * Created by hugo.queiros on 27/04/16.
 */
'use strict';

// , 'ngTouch'

angular.module('dashboard', ['ngAnimate', 'ngCookies',
    'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app'])
    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/')
    });