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
                this.elements.push(root);
                this.id = 1;
            }
            TreeService.prototype.getNewId = function () {
                return this.id++;
            };
            //not tested
            TreeService.prototype.getElement = function (id) {
                var res = null;
                for (var i = 0; i < this.elements.length; i++) {
                    res = this.getElementRec(id, this.elements[i]);
                    if (res != null)
                        return res;
                }
                return null;
            };
            TreeService.prototype.getElementRec = function (id, el) {
                if (el.id == id) {
                    return el;
                }
                else {
                    var res;
                    for (var i = 0; el.getNodes() && i < el.getNodes().length; i++) {
                        res = this.getElementRec(id, el.getNodes()[i]);
                        if (res != null) {
                            return res;
                        }
                    }
                }
                return null;
            };
            return TreeService;
        })();
        tree.TreeService = TreeService;
        angular.module('app.tree')
            .service('TreeService', TreeService);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=tree.service.js.map