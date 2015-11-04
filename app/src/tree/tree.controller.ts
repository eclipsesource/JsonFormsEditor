/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="model/treeElement.ts" />

module app.tree {
    'use strict';
    class MyTreeController {

        static $inject = ['$scope', 'TreeService', '$location'];

        public data : TreeElement[];

        constructor($scope, private treeService : app.tree.TreeService, private $location: ng.ILocationService) {
            $scope.collapseAll = function () {
                $scope.$broadcast('collapseAll');
            };

            $scope.expandAll = function () {
                $scope.$broadcast('expandAll');
            };

            this.data = treeService.elements;
        }

        remove(scope) : void {
            scope.remove();
        }

        toggle(scope) : void {
            scope.toggle();
        }

        newSubItem(node: TreeElement) : void {
            //var nodeData = scope.$modelValue;
            //nodeData.nodes.push(new TreeElement(nodeData.id * 10 + nodeData.nodes.length, TreeElementType.Label, []));
            this.treeService.elements[0].nodes[this.treeService.elements[0].nodes.indexOf(node)].nodes.push(new TreeElement(6, TreeElementType.Button, []))
        }

        openDetail(node : TreeElement) : void {
            this.$location.path('/detail/' + node.id);
        }
    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

