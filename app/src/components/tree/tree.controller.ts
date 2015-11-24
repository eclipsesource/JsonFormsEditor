/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="model/treeElement.ts" />

module app.tree {
    'use strict';
    class MyTreeController {

        static $inject = ['$scope', 'TreeService', 'DetailService'];

        public data : TreeElement[];


        constructor(private $scope, public treeService : app.tree.TreeService, private detailService : app.detail.DetailService) {
            this.data = treeService.elements;
        }

        removeElement(node: TreeElement) : void {
            this.treeService.removeElement(node);
        }

        addElementInside(node: TreeElement, type: TreeElementType) : void {
            if(type === null){
                type = TreeElementType.Control;
            }

            this.treeService.addElementInside(node, type);
        }



        toggle(scope) : void {
            scope.toggle();
        }

        collapseAll = function () {
            this.$scope.$broadcast('collapseAll');
        };

        expandAll = function () {
            this.$scope.$broadcast('expandAll');
        };

        showDetails(node : app.tree.TreeElement) : void {
            this.detailService.setElement(node);
        }
    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

