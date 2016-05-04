'use strict';

angular.module('app')
    .component('panelWidget', {
        //restrict: 'E',
        //replace: true,
        transclude: true,
        bindings: {
            title: '@',
            //template: '=',
            options: '='
        },
        template: [
            '<section layout-margin class="md-whiteframe-z1 panel-widget">',
            '<md-toolbar md-theme="custom" class="md-hue-1 panel-widget-toolbar">',
            '<div class="md-toolbar-tools">',
            '<h3 class="panel-widget-title">{{$ctrl.title}}</h3>',
            '<span flex></span>',
            '<md-button ng-show="options" ng-click="$showOptions = !$showOptions" class="md-icon-button" aria-label="Show options">',
            '<i class="material-icons">more_vert</i>',
            '</md-button>',
            '</div>',
            '</md-toolbar>',
            '<div ng-transclude></div>',
            '</section>'
        ].join('')
    });
