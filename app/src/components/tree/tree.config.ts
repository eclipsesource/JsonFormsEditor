/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.tree {
    'use strict';


    class TreeConfig {
        static $inject = ["$stateProvider"];

        constructor($stateProvider : ng.ui.IStateProvider) {
            $stateProvider.state('tree', {
                url: '/tree',
                views: {
                    'main': {
                        controller: 'MyTreeController',
                        controllerAs: 'tree',
                        templateUrl: 'app/src/components/tree/tree.html'
                    }
                }
            });

        }
    }

    angular.module('app.tree')
        .config(TreeConfig);
}




