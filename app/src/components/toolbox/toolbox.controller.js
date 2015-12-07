var app;
(function (app) {
    var toolbox;
    (function (toolbox) {
        var ToolboxController = (function () {
            function ToolboxController($scope, metaschemaService, treeService) {
                var _this = this;
                this.elements = [];
                this.schema = metaschemaService.getSchema();
                _.forEach(this.schema.getControls(), function () {
                    _this.elements.push(new app.tree.TreeElement(-1, "Control"));
                });
                _.forEach(this.schema.getLayouts(), function (layoutName) {
                    _this.elements.push(new app.tree.TreeElement(-1, layoutName));
                });
                $scope.treeOptionsToolbox = {
                    beforeDrop: function (event) {
                        var node = event.source.nodeScope.$modelValue;
                        node.id = treeService.getNewId();
                        event.source.nodeScope.$modelValue = node;
                    }
                };
            }
            ToolboxController.$inject = ['$scope', 'MetaschemaService', 'TreeService'];
            return ToolboxController;
        })();
        angular.module('app.toolbox').controller('ToolboxController', ToolboxController);
    })(toolbox = app.toolbox || (app.toolbox = {}));
})(app || (app = {}));
//# sourceMappingURL=toolbox.controller.js.map