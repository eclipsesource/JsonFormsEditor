var app;
(function (app) {
    var core;
    (function (core) {
        var undo;
        (function (undo) {
            var PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
            var UndoService = (function () {
                function UndoService(treeService, toolboxService) {
                    this.treeService = treeService;
                    this.toolboxService = toolboxService;
                    this.treeServiceMementoStack = [];
                    this.toolboxServiceMementoStack = [];
                }
                UndoService.prototype.snapshot = function () {
                    //this.treeServiceMementoStack.push(this.treeService.createMemento());
                    //this.toolboxServiceMementoStack.push(this.toolboxService.createMemento());
                };
                UndoService.prototype.canUndo = function () {
                    return this.treeServiceMementoStack.length > 0 && this.toolboxServiceMementoStack.length > 0;
                };
                UndoService.prototype.undo = function () {
                    if (this.canUndo()) {
                        this.treeService.setMemento(this.treeServiceMementoStack.pop());
                        this.toolboxService.setMemento(this.toolboxServiceMementoStack.pop());
                        this.treeService.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(this.treeService.exportUISchemaAsJSON())));
                    }
                };
                UndoService.$inject = ['TreeService', 'ToolboxService'];
                return UndoService;
            })();
            undo.UndoService = UndoService;
            angular.module('app.core').service('UndoService', UndoService);
        })(undo = core.undo || (core.undo = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
