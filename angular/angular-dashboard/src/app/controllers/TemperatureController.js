/**
 * Created by hugo.queiros on 02/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('temperatureController', [
            'temperaturesService',
            temperatureController
        ]);

    function temperatureController(temperaturesService) {
        // Sample options for first chart
        temperaturesService.fetchChartOptions()
            .then(function(data) {
                this.chartOptions = data;
            }.bind(this));
        }
})();