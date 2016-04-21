/**
 * Created by pancho111203 on 23/12/15.
 */
var app;
(function (app) {
    var layouts;
    (function (layouts) {
        var LayoutsController = (function () {
            function LayoutsController(layoutsService, undoService) {
                var _this = this;
                this.layoutsService = layoutsService;
                this.undoService = undoService;
                this.treeOptions = {
                    accept: function () {
                        return false;
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
                        // Convert the ToolboxElement into a TreeElement
                        var index = event.dest.index;
                        var destination = event.dest.nodesScope.$modelValue[index];
                        event.dest.nodesScope.$modelValue[index] = destination.convertToTreeElement();
                    }
                };
            }
            LayoutsController.$inject = ['LayoutsService', 'UndoService'];
            return LayoutsController;
        })();
        angular.module('app.layouts').controller('LayoutsController', LayoutsController);
    })(layouts = app.layouts || (app.layouts = {}));
})(app || (app = {}));
