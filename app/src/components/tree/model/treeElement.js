var app;
(function (app) {
    var tree;
    (function (tree) {
        var TreeElement = (function () {
            function TreeElement(id, type) {
                this.id = id;
                this.data = {};
                switch (type) {
                    case "Control":
                        this.data["id"] = id;
                        this.data["type"] = type;
                        this.data["label"] = "";
                        this.data["scope"] = "";
                        break;
                    case "VerticalLayout":
                    case "HorizontalLayout":
                    case "Group":
                        this.data["id"] = id;
                        this.data["type"] = type;
                        this.data["label"] = "";
                        this.elements = [];
                }
            }
            TreeElement.prototype.getTitle = function () {
                return this.data["type"];
            };
            TreeElement.prototype.getNodes = function () {
                return this.elements;
            };
            return TreeElement;
        })();
        tree.TreeElement = TreeElement;
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=treeElement.js.map