/**
 * Created by hugo.queiros on 06/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('WarningsController', [
            'warningsService',
            WarningsController
        ]);

    function WarningsController(warningsService) {
        warningsService.fetchChartOptions()
            .then(function(data) {
                this.chartOptions = data;
            }.bind(this));
    }
})();