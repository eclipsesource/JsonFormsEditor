var app;
(function (app) {
    var toolbox;
    (function (toolbox) {
        var ControlToolboxElement = app.core.model.ControlToolboxElement;
        var PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
        var ToolboxController = (function () {
            function ToolboxController(toolboxService, configService, treeService, undoService) {
                var _this = this;
                this.toolboxService = toolboxService;
                this.configService = configService;
                this.treeService = treeService;
                this.undoService = undoService;
                this.treeOptions = {
                    accept: function () {
                        return false;
                    },
                    beforeDrag: function (sourceNodeScope) {
                        var dragElement = sourceNodeScope.$modelValue;
                        return !dragElement.isObject();
                    },
                    beforeDrop: function (event) {
                        if (event['pos']['moving']) {
                            _this.undoService.snapshot();
                        }
                    },
                    dropped: function (event) {
                        //if the element is being dragged into the toolbar itself, return
                        if (event.dest.nodesScope.$modelValue == event.source.nodesScope.$modelValue) {
                            return;
                        }
                        var toolboxElement = event.source.nodeScope.$modelValue;
                        if (toolboxElement instanceof ControlToolboxElement) {
                            _this.toolboxService.increasePlacedTimes(toolboxElement.getScope());
                        }
                        // Convert the ToolboxElement into a TreeElement
                        var index = event.dest.index;
                        var destination = event.dest.nodesScope.$modelValue[index];
                        event.dest.nodesScope.$modelValue[index] = destination.convertToTreeElement();
                        _this.treeService.modifiedTree();
                        _this.treeService.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(treeService.exportUISchemaAsJSON())));
                    }
                };
            }
            /**
             * Checks, if the element should be hidden from the toolbox, because it is already used in the tree.
             * @param element
             * @returns {boolean}
             */
            ToolboxController.prototype.shouldHide = function (element) {
                if (!this.configService.enableFilter) {
                    return false;
                }
                if (this.isPlaced(element)) {
                    return true;
                }
                return false;
            };
            /*
            * Returns true if the element is placed on the tree
            * */
            ToolboxController.prototype.isPlaced = function (element) {
                if (element instanceof ControlToolboxElement) {
                    if (this.toolboxService.isAlreadyPlaced(element)) {
                        return true;
                    }
                }
                return false;
            };
            ToolboxController.prototype.clickedBack = function () {
                this.toolboxService.previousFolder();
            };
            ToolboxController.prototype.clickedIcon = function (element) {
                if (element.datatype == 'object') {
                    this.toolboxService.accessFolder(element.getScope().split('/').pop());
                }
            };
            ToolboxController.prototype.canBeRemoved = function (element) {
                return this.toolboxService.canBeRemoved(element);
            };
            ToolboxController.prototype.isParentFolder = function () {
                return this.toolboxService.currentPath.length == 0;
            };
            /**
             * Removes the specified ControlToolboxElement from the Dataschema.
             * @param element
             */
            ToolboxController.prototype.removeDataElement = function (element) {
                if (this.toolboxService.canBeRemoved(element)) {
                    if (!this.toolboxService.removeSchemaElement(element)) {
                        console.log("ERROR: failed to remove the element from the schema");
                    }
                }
            };
            ToolboxController.$inject = ['ToolboxService', 'ConfigService', 'TreeService', 'UndoService'];
            return ToolboxController;
        })();
        angular.module('app.toolbox').controller('ToolboxController', ToolboxController);
    })(toolbox = app.toolbox || (app.toolbox = {}));
})(app || (app = {}));
//# sourceMappingURL=toolbox.controller.js.map