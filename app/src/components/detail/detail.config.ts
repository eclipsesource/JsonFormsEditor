/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.detail {
    'use strict';


    class DetailConfig {
        static $inject = ["$stateProvider"];

        constructor($stateProvider : ng.ui.IStateProvider) {
            $stateProvider.state('detail', {
                url: '/detail/{id:int}',
                views: {
                    'main': {
                        controller: 'DetailController',
                        controllerAs: 'detail',
                        templateUrl: 'app/src/components/detail/detail.html'
                    }
                }
            });

        }
    }

    angular.module('app.detail')
        .config(DetailConfig);
}




