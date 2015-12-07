var app;
(function (app) {
    var toolbox;
    (function (toolbox) {
        var ToolboxController = (function () {
            function ToolboxController($scope, metaschemaService, treeService) {
                var _this = this;
                this.elements = [];
                this.schema = metaschemaService.getSchema();
                _.forEach(this.schema.getDefinitions(), function (definition) {
                    _this.elements.push(new app.tree.TreeElement(-1, definition));
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