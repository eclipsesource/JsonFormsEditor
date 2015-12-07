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
                        this.data.type = type;
                        this.data.label = "";
                        this.data.scope = "";
                        break;
                    case "VerticalLayout":
                    case "HorizontalLayout":
                    case "Group":
                        this.data.type = type;
                        this.data.label = "";
                        this.elements = [];
                        this.data.acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];
                        break;
                    case "Categorization":
                        this.data.type = type;
                        this.elements = [];
                        this.data.acceptedElements = ["Category"];
                        break;
                    case "Category":
                        this.data.type = type;
                        this.elements = [];
                        this.data.acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];
                }
            }
            TreeElement.prototype.getId = function () {
                return this.id;
            };
            TreeElement.prototype.setId = function (newId) {
                this.id = newId;
            };
            TreeElement.prototype.getData = function () {
                return this.data;
            };
            TreeElement.prototype.getType = function () {
                return this.data.type;
            };
            TreeElement.prototype.getLabel = function () {
                return this.data.label;
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
                for (var i = 0; i < this.data.acceptedElements.length; i++) {
                    if (type == this.data.acceptedElements[i])
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