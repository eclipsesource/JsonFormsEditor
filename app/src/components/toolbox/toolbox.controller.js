var app;
(function (app) {
    var toolbox;
    (function (toolbox) {
        var ToolboxController = (function () {
            function ToolboxController($scope, elementsFactoryService, jsonSchemaService) {
                this.elementsFactoryService = elementsFactoryService;
                this.jsonSchemaService = jsonSchemaService;
                this.expertElements = [];
                this.schemaElements = [];
                this.tab = 1;
                this.expertElements = elementsFactoryService.getElementsAsArray();
                this.initializeSchemaElements();
                $scope.treeOptionsToolbox = {
                    beforeDrop: function (event) {
                        var node = event.source.nodeScope.$modelValue;
                        node.id = elementsFactoryService.getNewId();
                        event.source.nodeScope.$modelValue = node;
                    }
                };
            }
            ToolboxController.prototype.initializeSchemaElements = function () {
                var schemaProperties = this.jsonSchemaService.getFields();
                for (var i = 0; i < schemaProperties.length; i++) {
                    var element = this.elementsFactoryService.getFakeElement("Control");
                    element.scope = schemaProperties[i];
                    element.label = this.convertScopeToLabel(schemaProperties[i]);
                    this.schemaElements.push(element);
                }
            };
            ToolboxController.prototype.convertScopeToLabel = function (scope) {
                var sc = scope.split('/').pop();
                return sc
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function (str) { return str.toUpperCase(); });
            };
            ToolboxController.prototype.isSet = function (checkTab) {
                return this.tab == checkTab;
            };
            ToolboxController.prototype.setTab = function (activeTab) {
                this.tab = activeTab;
            };
            ToolboxController.$inject = ['$scope', 'ElementsFactoryService', 'JsonSchemaService'];
            return ToolboxController;
        })();
        angular.module('app.toolbox').controller('ToolboxController', ToolboxController);
    })(toolbox = app.toolbox || (app.toolbox = {}));
})(app || (app = {}));
//# sourceMappingURL=toolbox.controller.js.map