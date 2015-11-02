/**
 * Created by Felix on 01.11.2015.
 */
/**
 * Created by Felix on 01.11.2015.
 */
(function() {
    'use strict';
    angular.module('app.tree')
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/tree', {
                templateUrl: 'app/src/tree/tree.html',
                controller: 'TreeController'
            });
        }]);
})();





