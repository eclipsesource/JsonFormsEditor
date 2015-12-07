module app.toolbox {

    class ToolboxController {

        public elements : any = [];

        static $inject = ['$scope', 'ElementsFactoryService'];

        constructor($scope, elementsFactoryService: app.core.ElementsFactoryService){
            this.elements = elementsFactoryService.getElementsAsArray();

            $scope.treeOptionsToolbox = {
                beforeDrop: function(event) {
                    var node: any = event.source.nodeScope.$modelValue;
                    node.id = elementsFactoryService.getNewId();
                    event.source.nodeScope.$modelValue = node;
                }
            };
        }
    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}