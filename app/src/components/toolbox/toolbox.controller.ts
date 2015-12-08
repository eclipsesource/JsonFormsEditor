module app.toolbox {

    class ToolboxController {

        public expertElements:any = [];
        public schemaElements:any = [];
        private tab:number = 1;

        static $inject = ['$scope', 'ElementsFactoryService', 'JsonSchemaService'];

        constructor($scope, private elementsFactoryService:app.core.ElementsFactoryService, private jsonSchemaService:app.core.jsonschema.JsonSchemaService) {
            this.expertElements = elementsFactoryService.getElementsAsArray();

            this.initializeSchemaElements();

            $scope.treeOptionsToolbox = {
                beforeDrop: function (event) {
                    var node:any = event.source.nodeScope.$modelValue;
                    node.id = elementsFactoryService.getNewId();
                    event.source.nodeScope.$modelValue = node;
                }
            };
        }

        private initializeSchemaElements() {
            var schemaProperties:string[] = this.jsonSchemaService.getFields();
            for(var i = 0; i < schemaProperties.length; i++) {
                var element:any = this.elementsFactoryService.getFakeElement("Control");
                element.scope = schemaProperties[i];
                element.label = this.convertScopeToLabel(schemaProperties[i]);
                    this.schemaElements.push(element);
            }
        }

        private convertScopeToLabel(scope:string):string {
            return scope
                // insert a space before all caps
                .replace(/([A-Z])/g, ' $1')
                // uppercase the first character
                .replace(/^./, function(str){ return str.toUpperCase(); })
        }

        isSet(checkTab):boolean {
            return this.tab == checkTab;
        }

        setTab(activeTab) {
            this.tab = activeTab;
        }
    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}