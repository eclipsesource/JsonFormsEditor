var app;
(function (app) {
    var tree;
    (function (tree) {
        var PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
        var MyTreeController = (function () {
            function MyTreeController(treeService, dataschemaService, toolboxService, detailService, undoService) {
                var _this = this;
                this.treeService = treeService;
                this.dataschemaService = dataschemaService;
                this.toolboxService = toolboxService;
                this.detailService = detailService;
                this.undoService = undoService;
                this.treeOptions = {
                    // don't accept more than one element (layout) in the root of the tree
                    accept: function (sourceNodeScope, destNodesScope) {
                        var source = sourceNodeScope.$modelValue;
                        var parent = destNodesScope.$nodeScope;
                        if (parent == null) {
                            //Means that the element has no parent and therefore is outside the root
                            return false;
                        }
                        var destParent = parent.$modelValue;
                        var accepted = destParent.acceptsElement(source.getType());
                        return accepted;
                    },
                    beforeDrop: function (event) {
                        if (event['pos']['moving']) {
                            _this.undoService.snapshot();
                            treeService.modifiedTree();
                        }
                    },
                    dropped: function () {
                        treeService.modifiedTree();
                        _this.treeService.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(_this.treeService.exportUISchemaAsJSON())));
                    },
                    beforeDrag: function (sourceNodeScope) {
                        var dragElement = sourceNodeScope.$modelValue;
                        return !dragElement['root'];
                    },
                    removed: function (node) {
                        var treeElement = node.$modelValue;
                        _this.treeService.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(_this.treeService.exportUISchemaAsJSON())));
                        _this.decreasePlacedTimesOfChilds(treeElement);
                        treeService.modifiedTree();
                    }
                };
            }
            /**
             * Removes the element from the tree.
             * @param scope Scope Element from ui.tree.
             */
            MyTreeController.prototype.remove = function (scope) {
                this.undoService.snapshot();
                scope.removeNode(scope);
            };
            /**
             * Shows the Detail-Window for the given element.
             * @param node
             */
            MyTreeController.prototype.showDetails = function (node) {
                this.detailService.setElement(node);
            };
            /**
             * Collapses or expands the current element.
             * @param scope Scope Element from ui.tree.
             */
            MyTreeController.prototype.toggle = function (scope) {
                scope.toggle();
            };
            MyTreeController.prototype.decreasePlacedTimesOfChilds = function (treeElement) {
                for (var i = 0; i < treeElement.elements.length; i++) {
                    this.decreasePlacedTimesOfChilds(treeElement.elements[i]);
                }
                if (treeElement.getType() === 'Control') {
                    this.toolboxService.decreasePlacedTimes(treeElement.getScope());
                }
            };
            MyTreeController.$inject = ['TreeService', 'DataschemaService', 'ToolboxService', 'DetailService', 'UndoService'];
            return MyTreeController;
        })();
        angular.module('app.tree').controller('MyTreeController', MyTreeController);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=tree.controller.js.map