/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="model/treeElement.ts" />

module app.tree {
    'use strict';
    class MyTreeController {

        static $inject = ['$scope', 'TreeService', '$location'];

        public data : TreeElement[];


        constructor(private $scope, public treeService : app.tree.TreeService, private $location: ng.ILocationService) {

            this.data = treeService.elements;
        }

        removeElement(node: TreeElement) : void {
            this.treeService.removeElement(node);
        }

        addElementInside(node: TreeElement) : void {
            //TODO change so that the user can choose which element to add(not only buttons)
            this.treeService.addElementInside(node, TreeElementType.Button);
        }



        toggle(scope) : void {
            scope.toggle();
        }

        openDetail(node : TreeElement) : void {
            this.$location.path('/detail/' + node.id);
        }

        collapseAll = function () {
            this.$scope.$broadcast('collapseAll');
        };

        expandAll = function () {
            this.$scope.$broadcast('expandAll');
        };

    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

