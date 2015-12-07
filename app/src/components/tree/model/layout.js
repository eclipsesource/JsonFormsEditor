var app;
(function (app) {
    var tree;
    (function (tree) {
        var Layout = (function () {
            function Layout(id, type) {
                this.id = id;
                this.type = type;
                this.propertiesSchema = {};
                this.propertiesUISchema = {};
                this.propertiesData = {};
                this.nodes = [];
                // obtained from the "control" part of the metaSchema
                this.propertiesSchema = {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "type": {
                            "type": "string",
                            "enum": [
                                "HorizontalLayout",
                                "VerticalLayout",
                                "Group"
                            ]
                        },
                        "label": {
                            "type": "string"
                        }
                    }
                };
                this.propertiesUISchema = {
                    "type": "VerticalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "label": "Id",
                            "scope": { "$ref": "#/properties/id" }
                        },
                        {
                            "type": "Control",
                            "label": "Type",
                            "scope": { "$ref": "#/properties/type" }
                        },
                        {
                            "type": "Control",
                            "label": "Label",
                            "scope": { "$ref": "#/properties/label" }
                        }
                    ]
                };
                this.propertiesData["id"] = id;
                this.propertiesData["type"] = type;
                this.propertiesData["label"] = "";
            }
            Layout.prototype.getId = function () { return this.propertiesData["id"]; };
            Layout.prototype.setId = function (newId) { this.propertiesData["id"] = newId; };
            Layout.prototype.getTitle = function () { return this.propertiesData["type"]; };
            Layout.prototype.getNodes = function () { return this.nodes; };
            Layout.prototype.getPropertiesSchema = function () { return this.propertiesSchema; };
            Layout.prototype.getPropertiesUISchema = function () { return this.propertiesUISchema; };
            Layout.prototype.getPropertiesData = function () { return this.propertiesData; };
            return Layout;
        })();
        tree.Layout = Layout;
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=layout.js.map