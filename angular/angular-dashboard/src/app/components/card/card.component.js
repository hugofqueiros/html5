'use strict';

angular.module('app')
    .component('card', {
        transclude: true,
        bindings: {
            title: '@',
            //template: '=',
            options: '='
        },
        controller : function($element){

        },
        templateUrl: 'app/components/card/card.view.html'
    });
