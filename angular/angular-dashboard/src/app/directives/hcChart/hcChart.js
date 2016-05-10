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
            templateUrl: 'app/directives/hcChart/hcChart.view.html',
            link: function(scope, element) {
                var chart = null;

                setTimeout(function () {
                    chart = new Highcharts.chart(element[0], scope.options);
                }.bind(this), 0);

                setTimeout(function () {
                    if(chart) chart.reflow();
                }, 1000)
            }
        };
    });

