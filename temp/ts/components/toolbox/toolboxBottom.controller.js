/**
 * Created by pancho111203 on 5/04/16.
 */
var app;
(function (app) {
    var toolbox;
    (function (toolbox) {
        var ToolboxBottomController = (function () {
            function ToolboxBottomController(toolboxService) {
                this.toolboxService = toolboxService;
                this.showAdvanced = false;
                this.advancedTemplate = null;
                this.newElementLabel = '';
                this.newElementTypeLabel = null;
                this.newEnumElements = [];
                this.currentEnumElementLabel = '';
                this.elementTypes = {
                    'string': 'basicProperties.html',
                    'number': 'basicProperties.html',
                    'boolean': 'basicProperties.html',
                    'object': null
                };
                this.newElementConfig = {};
            }
            ToolboxBottomController.prototype.changeType = function (label, template) {
                this.setNewElementTypeLabel(label);
                this.setTypeTemplate(template);
                this.showAdvanced = false;
                this.newElementConfig = {};
            };
            /**
             * Setter for the label of the tobe created dataschema element.
             * @param type
             */
            ToolboxBottomController.prototype.setNewElementTypeLabel = function (type) {
                this.newElementTypeLabel = type;
            };
            ToolboxBottomController.prototype.setTypeTemplate = function (template) {
                this.advancedTemplate = template;
            };
            //TODO support different scopes(inside folders)
            //TODO add more data into content(required, min chars, etc)
            /**
             * Submits the current newElementLabel and newElementTypeLabel and creates a new DataschemaPropery.
             */
            ToolboxBottomController.prototype.addNewElement = function () {
                if (!this.toolboxService.addSchemaElement(this.newElementLabel, this.newElementTypeLabel, this.newElementConfig)) {
                    console.log("ERROR: failed to add the element into the schema");
                }
                this.newElementLabel = '';
                this.newElementConfig = {};
                this.newEnumElements = [];
            };
            ToolboxBottomController.prototype.addEnumElement = function () {
                if (~this.newEnumElements.indexOf(this.currentEnumElementLabel)) {
                    console.log("ERROR: element already exists");
                    this.currentEnumElementLabel = "";
                    return;
                }
                this.newEnumElements.push(this.currentEnumElementLabel);
                this.currentEnumElementLabel = "";
            };
            ToolboxBottomController.$inject = ['ToolboxService'];
            return ToolboxBottomController;
        })();
        angular.module('app.toolbox').controller('ToolboxBottomController', ToolboxBottomController);
    })(toolbox = app.toolbox || (app.toolbox = {}));
})(app || (app = {}));
