var app;
(function (app) {
    var tree;
    (function (tree) {
        var MyTreeController = (function () {
            function MyTreeController($scope, treeService, detailService, elementsFactoryService) {
                this.$scope = $scope;
                this.detailService = detailService;
                this.elementsFactoryService = elementsFactoryService;
                this.elements = [];
                this.elements = treeService.elements;
                $scope.treeOptions = {
                    // no accept more than one element (layout) in the root of the tree
                    accept: function (sourceNodeScope, destNodesScope, destIndex) {
                        return (destNodesScope.$nodeScope
                            && destNodesScope.$nodeScope.$modelValue.acceptedElements.indexOf(sourceNodeScope.$modelValue.type) >= 0);
                    }
                };
            }
            MyTreeController.prototype.remove = function (scope) {
                scope.remove();
            };
            MyTreeController.prototype.newSubItem = function (scope) {
                var node = scope.$modelValue;
                node.elements.push(this.elementsFactoryService.getNewElement(node.acceptedElements[0]));
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
            MyTreeController.$inject = ['$scope', 'TreeService', 'DetailService', 'ElementsFactoryService'];
            return MyTreeController;
        })();
        angular.module('app.tree').controller('MyTreeController', MyTreeController);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=tree.controller.js.map