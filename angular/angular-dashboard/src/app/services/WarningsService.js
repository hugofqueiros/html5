(function() {
    'use strict';

    angular.module('app')
        .service('warningsService', [
            '$q',
            warningsService
        ]);

    function warningsService($q) {
        var data = [
            [Date.UTC(2016, 1, 1), 28],
            [Date.UTC(2016, 1, 2), 25],
            [Date.UTC(2016, 1, 3), 2],
            [Date.UTC(2016, 1, 4), 28],
            [Date.UTC(2016, 1, 5), 28],
            [Date.UTC(2016, 1, 6), 47],
            [Date.UTC(2016, 1, 7), 79],
            [Date.UTC(2016, 1, 8), 72],
            [Date.UTC(2016, 1, 9), 102],
            [Date.UTC(2016, 1, 10), 112],
            [Date.UTC(2016, 1, 11), 12],
            [Date.UTC(2016, 1, 12), 118],
            [Date.UTC(2016, 1, 13), 119],
            [Date.UTC(2016, 1, 14), 185],
            [Date.UTC(2016, 1, 15), 222],
            [Date.UTC(2016, 1, 16), 115],
            [Date.UTC(2016, 1, 17), 20],
            [Date.UTC(2016, 1, 18), 28],
            [Date.UTC(2016, 1, 19), 25],
            [Date.UTC(2016, 1, 20), 2],
            [Date.UTC(2016, 1, 21), 28],
            [Date.UTC(2016, 1, 22), 28],
            [Date.UTC(2016, 1, 23), 47],
            [Date.UTC(2016, 1, 24), 79],
            [Date.UTC(2016, 1, 25), 33],
            [Date.UTC(2016, 1, 26), 82],
            [Date.UTC(2016, 1, 27), 43],
            [Date.UTC(2016, 1, 28), 12],
            [Date.UTC(2016, 1, 29), 23],
            [Date.UTC(2016, 1, 30), 119],
            [Date.UTC(2016, 1, 31), 10]];

        var chartOptions = {
            chart: {
                type: 'areaspline'
            },
            subtitle: {
                text: 'Warnings Over Time'
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            xAxis: {
                type: 'datetime',
                tickWidth: 1
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'warnings',
                data: data
            }]
        };

        return {
            fetchChartOptions: function() {
                return $q.when(chartOptions);
            }
        }
    }
})();

