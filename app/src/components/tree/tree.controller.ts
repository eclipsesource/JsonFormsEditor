/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="model/treeElement.ts" />

module app.tree {
    'use strict';
    class MyTreeController {

        static $inject = ['$scope', 'TreeService', 'DetailService'];

        public data: TreeElement[];

        constructor(private $scope, public treeService : app.tree.TreeService, private detailService : app.detail.DetailService) {
            this.data = treeService.elements;

            $scope.treeOptions = {
                // no accept more than one element (layout) in the root of the tree
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    return (destNodesScope.$nodeScope
                    && destNodesScope.$nodeScope.$modelValue.acceptElement(sourceNodeScope.$modelValue.getType()));
                },
            };
        }

        remove(scope) : void {
            scope.remove();

        }

        newSubItem(scope) : void {
            var node: TreeElement = scope.$modelValue;
            node.getElements().push(new TreeElement(this.treeService.getNewId(), "Control"));
        }

        toggle(scope) : void {
            scope.toggle();
        }

        collapseAll() : void {
            this.$scope.$broadcast('collapseAll');
        }

        expandAll() : void {
            this.$scope.$broadcast('expandAll');
        }

        showDetails(node : app.tree.TreeElement) : void {
            this.detailService.setElement(node);
        }
    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

