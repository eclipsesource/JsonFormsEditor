var app;
(function (app) {
    var tree;
    (function (tree) {
        var TreeService = (function () {
            function TreeService(elementsFactoryService) {
                this.elements = [];
                var rootElement = elementsFactoryService.getNewElement("VerticalLayout");
                rootElement.root = "root";
                this.elements.push(rootElement);
            }
            TreeService.prototype.exportUISchemaAsJSON = function () {
                return JSON.stringify(this.elements[0], function (key, value) {
                    if (value == "") {
                        return undefined;
                    }
                    switch (key) {
                        case "id":
                        case "acceptedElements":
                        case "$$hashKey":
                        case "root":
                            return undefined;
                            break;
                    }
                    return value;
                });
            };
            TreeService.$inject = ['ElementsFactoryService'];
            return TreeService;
        })();
        tree.TreeService = TreeService;
        angular.module('app.tree')
            .service('TreeService', TreeService);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=tree.service.js.map