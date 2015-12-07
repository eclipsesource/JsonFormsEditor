var app;
(function (app) {
    var tree;
    (function (tree) {
        var Control = (function () {
            function Control(id) {
                this.propertiesSchema = {};
                this.propertiesUISchema = {};
                this.propertiesData = {};
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
                                "Control"
                            ]
                        },
                        "label": {
                            "type": "string"
                        },
                        "scope": {
                            "type": "object",
                            "properties": {
                                "$ref": {
                                    "type": "string"
                                }
                            }
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
                        },
                        {
                            "type": "Control",
                            "label": "Scope",
                            "scope": { "$ref": "#/properties/scope/properties/$ref" }
                        }
                    ]
                };
                this.propertiesData["id"] = id;
                this.propertiesData["type"] = "Control";
                this.propertiesData["label"] = "";
                this.propertiesData["scope"] = "";
            }
            Control.prototype.getId = function () { return this.propertiesData["id"]; };
            Control.prototype.setId = function (newId) { this.propertiesData["id"] = newId; };
            Control.prototype.getTitle = function () { return "Control"; };
            Control.prototype.getNodes = function () { return null; };
            Control.prototype.getPropertiesSchema = function () { return this.propertiesSchema; };
            Control.prototype.getPropertiesUISchema = function () { return this.propertiesUISchema; };
            Control.prototype.getPropertiesData = function () { return this.propertiesData; };
            return Control;
        })();
        tree.Control = Control;
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=control.js.map