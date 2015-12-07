module app.tree {

    class MyTreeController {

        static $inject = ['$scope', 'TreeService', 'DetailService', 'ElementsFactoryService'];

        public elements: any = [];

        constructor(private $scope, treeService: app.tree.TreeService, private detailService: app.detail.DetailService, private elementsFactoryService: app.core.ElementsFactoryService) {
            this.elements = treeService.elements;

            $scope.treeOptions = {
                // no accept more than one element (layout) in the root of the tree
                accept: function (sourceNodeScope, destNodesScope, destIndex) {
                    return (destNodesScope.$nodeScope
                    && destNodesScope.$nodeScope.$modelValue.acceptedElements.indexOf(sourceNodeScope.$modelValue.type) >= 0);
                },
            };
        }

        remove(scope) : void {
            scope.remove();

        }

        newSubItem(scope) : void {
            var node: any = scope.$modelValue;
            node.elements.push(this.elementsFactoryService.getNewElement(node.acceptedElements[0]));
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

        showDetails(node: any) : void {
            this.detailService.setElement(node);
        }
    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

