(function() {
    'use strict';
    angular.module('app')
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/'}
            );
        }]);
})();
