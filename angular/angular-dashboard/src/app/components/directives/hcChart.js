'use strict';

//require('highcharts');

angular.module('app')
    .directive('hcChart', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                title: '@',
                template: '@',
                options: '='
            },
            template: [
                '<section layout-margin class="md-whiteframe-z1 panel-widget">',
                '<md-toolbar md-theme="custom" class="md-hue-1 panel-widget-toolbar">',
                '<div class="md-toolbar-tools">',
                '<h3 class="panel-widget-title">{{title}}</h3>',
                '<span flex></span>',
                '<md-button ng-show="options" ng-click="$showOptions = !$showOptions" class="md-icon-button" aria-label="Show options">',
                '<i class="material-icons">more_vert</i>',
                '</md-button>',
                '</div>',
                '</md-toolbar>',
                '<div ng-include="template"/>',
                '</section>'
            ].join(''),
            link: function(scope, element) {
             console.log('scope', scope);
             console.log('element', element);

             //Highcharts.chart(element[0], scope.options);
             Highcharts.chart('chart', scope.options);
             },
/*            compile: function(element, attrs, linker) {
                return function(scope, element) {
                    linker(scope, function(clone) {
                        //element.append(clone);
                        console.log('scope cenas', scope);
                        Highcharts.chart(element[0], scope.options);
                    });
                };
            }*/
        };
    });

