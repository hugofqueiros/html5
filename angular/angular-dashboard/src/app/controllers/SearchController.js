/**
 * Created by hugo.queiros on 10/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchController', [
            'countriesService', '$timeout', '$q',
            searchController
        ]);

    function searchController(countriesService, $timeout, $q) {
        var self = this;

        self.countries = countriesService.loadAll();
        self.selectedCountry = null;
        self.searchText = null;
        self.querySearch = querySearch;
        self.disableCaching = true;

        function querySearch (query) {
            var results = query ? self.countries.filter( createFilterFor(query) ) : [],
                deferred;
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }
    }
})();