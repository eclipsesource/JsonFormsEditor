var app;
(function (app) {
    var detail;
    (function (detail) {
        var DetailService = (function () {
            function DetailService(jsonSchemaService) {
                this.jsonSchemaService = jsonSchemaService;
            }
            DetailService.prototype.setElement = function (element) {
                this.currentElement = element;
                switch (this.currentElement.getType()) {
                    case "Control":
                        this.schema = {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string"
                                },
                                "label": {
                                    "type": "string"
                                },
                                "scope": {
                                    "type": "object",
                                    "properties": {
                                        "$ref": {
                                            "type": "string",
                                            "enum": this.jsonSchemaService.getFields()
                                        }
                                    }
                                }
                            }
                        };
                        this.uischema = {
                            "type": "VerticalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "label": "Label",
                                    "scope": { "$ref": "#/properties/label" }
                                },
                                {
                                    "type": "Control",
                                    "label": "Type",
                                    "scope": { "$ref": "#/properties/type" }
                                },
                                {
                                    "type": "Control",
                                    "label": "Scope",
                                    "scope": { "$ref": "#/properties/scope" }
                                }
                            ]
                        };
                        break;
                    case "VerticalLayout":
                    case "HorizontalLayout":
                    case "Group":
                        this.schema = {
                            "type": "object",
                            "properties": {
                                "label": {
                                    "type": "string"
                                },
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "HorizontalLayout",
                                        "VerticalLayout",
                                        "Group"
                                    ]
                                }
                            }
                        };
                        this.uischema = {
                            "type": "VerticalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "label": "Label",
                                    "scope": { "$ref": "#/properties/label" }
                                },
                                {
                                    "type": "Control",
                                    "label": "Type",
                                    "scope": { "$ref": "#/properties/type" }
                                }
                            ]
                        };
                        break;
                    case "Categorization":
                    case "Category":
                        this.schema = {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string"
                                }
                            }
                        };
                        this.uischema = {
                            "type": "VerticalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "label": "Type",
                                    "scope": { "$ref": "#/properties/type" }
                                }
                            ]
                        };
                }
                this.data = this.currentElement.getData();
            };
            DetailService.$inject = ["JsonSchemaService"];
            return DetailService;
        })();
        detail.DetailService = DetailService;
        angular.module('app.detail').service('DetailService', DetailService);
    })(detail = app.detail || (app.detail = {}));
})(app || (app = {}));
//# sourceMappingURL=detail.service.js.map