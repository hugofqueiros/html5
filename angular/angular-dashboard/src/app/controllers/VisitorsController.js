(function () {
    'use strict';

    angular
        .module('app')
        .controller('VisitorsController', [
            VisitorsController
        ]);

    function VisitorsController() {
        // TODO: move data to the service
        this.visitorsChartData = [
            {
                key: 'Mobile',
                y: Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000
            },
            {
                key: 'Desktop',
                y: Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000
            },
            {
                key: 'Tablet',
                y: Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000
            }];

        this.chartOptions = {
            chart: {
                type: 'pieChart',
                height: 210,
                donut: true,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                valueFormat: (d3.format(".0f")),
                color: ['rgb(0, 150, 136)', '#E75753'],
                showLabels: false,
                showLegend: false,
                title: 'Over 9K',
                margin: { top: -10 }
            }
        };
    }
})();
