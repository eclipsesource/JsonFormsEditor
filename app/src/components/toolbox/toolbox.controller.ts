module app.toolbox {
    class ToolboxController {
        public elements : app.tree.TreeElement[] = [];
        private schema : app.core.metaschema.Metaschema;

        static $inject = ['$scope', 'MetaschemaService', 'TreeService'];

        constructor($scope, metaschemaService : app.core.metaschema.MetaschemaService, treeService:app.tree.TreeService){
            this.schema = metaschemaService.getSchema();

            _.forEach(this.schema.getDefinitions(), (definition: string) => {
                this.elements.push(new app.tree.TreeElement(-1, definition));
            });

            $scope.treeOptionsToolbox = {
                beforeDrop: function(event) {
                    var node: app.tree.TreeElement = event.source.nodeScope.$modelValue;
                    node.setId(treeService.getNewId());
                    event.source.nodeScope.$modelValue = node;
                }
            };
        }
    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}