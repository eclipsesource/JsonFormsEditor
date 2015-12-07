var app;
(function (app) {
    var tree;
    (function (tree) {
        var TreeElement = (function () {
            function TreeElement(id, type) {
                this.id = id;
                switch (type) {
                    case "Control":
                        this.type = type;
                        this.label = "";
                        this.scope = "";
                        break;
                    case "VerticalLayout":
                    case "HorizontalLayout":
                    case "Group":
                        this.type = type;
                        this.label = "";
                        this.elements = [];
                        this.acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];
                        break;
                    case "Categorization":
                        this.type = type;
                        this.elements = [];
                        this.acceptedElements = ["Category"];
                        break;
                    case "Category":
                        this.type = type;
                        this.elements = [];
                        this.acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];
                }
            }
            TreeElement.prototype.getId = function () {
                return this.id;
            };
            TreeElement.prototype.setId = function (newId) {
                this.id = newId;
            };
            TreeElement.prototype.getData = function () {
                return this;
            };
            TreeElement.prototype.getType = function () {
                return this.type;
            };
            TreeElement.prototype.getLabel = function () {
                return this.label;
            };
            TreeElement.prototype.getElements = function () {
                return this.elements;
            };
            TreeElement.prototype.hasElements = function () {
                return this.elements && this.elements.length > 0;
            };
            TreeElement.prototype.acceptElement = function (type) {
                if (!this.elements)
                    return false;
                for (var i = 0; i < this.acceptedElements.length; i++) {
                    if (type == this.acceptedElements[i])
                        return true;
                }
                return false;
            };
            TreeElement.prototype.isDeletable = function () {
                return true;
            };
            return TreeElement;
        })();
        tree.TreeElement = TreeElement;
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=treeElement.js.map