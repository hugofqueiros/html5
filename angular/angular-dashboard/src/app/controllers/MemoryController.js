(function () {
    'use strict';

    angular
        .module('app')
        .controller('MemoryController', [
            'memoryLoadService',
            MemoryController
        ]);

    function MemoryController(memoryLoadService) {
        memoryLoadService.fetchChartOptions()
            .then(function(data) {
                this.chartOptions = data;
            }.bind(this));
        }
})();
