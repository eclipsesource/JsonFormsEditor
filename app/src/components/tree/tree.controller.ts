/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="model/treeElement.ts" />

module app.tree {
    'use strict';
    class MyTreeController {

        static $inject = ['$scope', 'TreeService', 'DetailService'];

        public data: TreeElement[];
        public toolbox: TreeElement[];


        constructor(private $scope, public treeService : app.tree.TreeService, private detailService : app.detail.DetailService) {
            this.data = treeService.elements;

            this.toolbox = [];
            this.toolbox.push(new Control(-1));
            this.toolbox.push(new Layout(-1, LayoutType.VerticalLayout));
            this.toolbox.push(new Layout(-1, LayoutType.HorizontalLayout));

            $scope.treeOptions1 = {
                beforeDrop: function(event) {
                    var node: TreeElement = event.source.nodeScope.$modelValue;
                    node.setId(treeService.getNewId());
                    event.source.nodeScope.$modelValue = node;
                }
            };

            $scope.treeOptions2 = {
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

        showDetails(node : app.tree.TreeElement) : void {
            this.detailService.setElement(node);
        }
    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

