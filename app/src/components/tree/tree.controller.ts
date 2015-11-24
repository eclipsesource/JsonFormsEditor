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
        }

        remove(scope) : void {
            scope.remove();

        }

        newSubItem(scope) : void {
            var node: TreeElement = scope.$modelValue;
            node.nodes.push(new TreeElement(this.treeService.getNewId(), TreeElementType.Control, []));
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

