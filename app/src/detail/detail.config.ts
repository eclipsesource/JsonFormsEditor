/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.detail {
    'use strict';


    class TreeConfig {
        static $inject = ["$stateProvider"];

        constructor($stateProvider : ng.ui.IStateProvider) {
            $stateProvider.state('detail', {
                url: '/detail/{id:int}',
                views: {
                    'main': {
                        controller: 'DetailController',
                        controllerAs: 'detail',
                        templateUrl: 'app/src/detail/detail.html'
                    }
                }
            });

        }
    }

    angular.module('app.tree')
        .config(TreeConfig);
}




