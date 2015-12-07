/// <reference path="model/treeElement.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var app;
(function (app) {
    var tree;
    (function (tree) {
        var TreeService = (function () {
            function TreeService() {
                this.elements = [];
                var root = new tree.TreeElement(0, "VerticalLayout");
                root["isDeletable"] = function () {
                    return false;
                };
                this.elements.push(root);
                this.id = 1;
            }
            TreeService.prototype.getNewId = function () {
                return this.id++;
            };
            TreeService.prototype.exportUISchemaAsJSON = function () {
                return JSON.stringify(this.elements[0], function (key, value) {
                    if (value == "") {
                        return undefined;
                    }
                    switch (key) {
                        case "id":
                        case "acceptedElements":
                        case "$$hashKey":
                            return undefined;
                            break;
                    }
                    return value;
                });
            };
            return TreeService;
        })();
        tree.TreeService = TreeService;
        angular.module('app.tree')
            .service('TreeService', TreeService);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=tree.service.js.map