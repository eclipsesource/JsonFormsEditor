/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="model/treeElement.ts" />
var app;
(function (app) {
    var tree;
    (function (tree) {
        'use strict';
        var MyTreeController = (function () {
            function MyTreeController($scope, treeService, detailService) {
                this.$scope = $scope;
                this.treeService = treeService;
                this.detailService = detailService;
                this.data = treeService.elements;
                $scope.treeOptions = {
                    // no accept more than one element (layout) in the root of the tree
                    accept: function (sourceNodeScope, destNodesScope, destIndex) {
                        return (destNodesScope.$nodeScope
                            && destNodesScope.$nodeScope.$modelValue.getNodes());
                    }
                };
            }
            MyTreeController.prototype.remove = function (scope) {
                scope.remove();
            };
            MyTreeController.prototype.toggle = function (scope) {
                scope.toggle();
            };
            MyTreeController.prototype.collapseAll = function () {
                this.$scope.$broadcast('collapseAll');
            };
            MyTreeController.prototype.expandAll = function () {
                this.$scope.$broadcast('expandAll');
            };
            MyTreeController.prototype.showDetails = function (node) {
                this.detailService.setElement(node);
            };
            MyTreeController.$inject = ['$scope', 'TreeService', 'DetailService'];
            return MyTreeController;
        })();
        angular.module('app.tree').controller('MyTreeController', MyTreeController);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=tree.controller.js.map