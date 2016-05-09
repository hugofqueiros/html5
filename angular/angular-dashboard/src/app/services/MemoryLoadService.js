/**
 * Created by hugo.queiros on 06/05/16.
 */
(function() {
    'use strict';

    angular.module('app')
        .service('memoryLoadService', [
            '$q',
            memoryLoadService
        ]);

    function memoryLoadService($q) {
        var totalMem = (Math.floor(Math.random() * (950 - 1 + 1)) + 1) / 10;
        var freeMem = 100 - totalMem;

        var chartOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: totalMem + ' %',
                align: 'center',
                verticalAlign: 'middle',
                y: 45,
                style: {
                    display: 'block',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '0px 1px 2px black'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '50%',
                data: [
                    ['Used Memory', totalMem],
                    ['Free Memory', freeMem]
                ]
            }]
        };

        return {
            fetchChartOptions: function() {
                return $q.when(chartOptions);
            }
        }
    }
})();