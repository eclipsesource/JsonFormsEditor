/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="model/treeElement.ts" />

module app.tree {
    'use strict';
    class MyTreeController {

        static $inject = ['$scope', 'TreeService'];

        public data: TreeElement[];

        constructor(private $scope, private treeService: TreeService) {
            this.data = treeService.elements;

            $scope.treeOptions = {
                // no accept more than one element (layout) in the root of the tree
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    if(destNodesScope.$nodeScope == null
                      && (destNodesScope.$nodes.length > 0 || !sourceNodeScope.$modelValue.canHaveChildren())) return false;

                    return true;
                },
            };
        }

        remove(scope) : void {
            scope.remove();

        }

        newSubItem(scope) : void {
            var node: TreeElement = scope.$modelValue;
            node.getNodes().push(new Control(this.treeService.getNewId()));
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

    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

