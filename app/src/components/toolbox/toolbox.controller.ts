/// <reference path="../tree/model/control.ts" />
/// <reference path="../tree/model/layout.ts" />

module app.toolbox {
    class ToolboxController {
        public elements : app.tree.TreeElement[] = [];
        private schema : app.core.metaschema.Metaschema;

        static $inject = ['$scope', 'MetaschemaService', 'TreeService'];

        constructor($scope, metaschemaService : app.core.metaschema.MetaschemaService, treeService:app.tree.TreeService){
            this.schema = metaschemaService.getSchema();
            _.forEach(this.schema.getControls(), () => {
                this.elements.push(new app.tree.Control(-1));
            });

            _.forEach(this.schema.getLayouts(), (layoutName : string) => {
                this.elements.push(new app.tree.Layout(-1, layoutName));
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