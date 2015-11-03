/// <reference path="../../../typings/angularjs/angular.d.ts" />

module app.tree {
    'use strict';
    class TreeController {

        static $inject = ['$scope', 'TreeService'];

        constructor($scope, treeService : app.tree.TreeService){
            $scope.world = treeService.sayHello();
        }
    }

    angular.module('app.tree').controller('TreeController', TreeController);
}

