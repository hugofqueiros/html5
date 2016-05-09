(function () {
    'use strict';

    angular
        .module('app')
        .controller('VisitorsController', [
            'visitorsService',
            VisitorsController
        ]);

    function VisitorsController(visitorsService) {

        this.visitorsChartData = null;
        this.chartOptions = null;

        visitorsService.fetchChartData()
            .then(function(data) {
                this.visitorsChartData = data;
            }.bind(this));

        visitorsService.fetchChartOptions()
            .then(function(data) {
                this.chartOptions = data;
            }.bind(this));
    }
})();
