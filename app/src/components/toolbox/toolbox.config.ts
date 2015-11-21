/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.toolbox {
    'use strict';

    class ToolboxConfig {
        static inject = ['$stateProvider'];

        constructor($stateProvider : ng.ui.IStateProvider){
            $stateProvider.state('toolbox', {
                url: '/toolbox',
                views: {
                    'main': {
                        controller: 'ToolboxController',
                        controllerAs: 'toolbox',
                        templateUrl: 'app/src/components/toolbox/toolbox.html'
                    }
                }
            });
        }
    }

    angular.module('app.toolbox').config(ToolboxConfig);
}