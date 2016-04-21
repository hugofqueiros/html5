export default class MainController {
    constructor($log, $scope, CONFIG) {
        $log.debug('It works');
        //$scope.foo = 'bar';
        //$scope.foo = CONFIG.foo;
        this.foo = CONFIG;
        $log.debug(this, $scope.main, this == $scope.main)
    }
}

// same as module.exports


// the best way would be

/*
ExampleController.$inject = ['$scope'];

function ExampleController($scope) {
    // Injecting $scope just for comparison
    var vm = this;*/
