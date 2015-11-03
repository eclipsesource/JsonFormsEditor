/**
 * Created by Felix on 01.11.2015.
 */
/**
 * Created by Felix on 01.11.2015.
 */
(function() {
    'use strict';
    angular.module('app.tree')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('tree', {
                url: '/tree',
                views: {
                    'main': {
                        controller: 'TreeController',
                        templateUrl: 'app/src/tree/tree.html'
                    }
                }
            });
        }]);
})();





