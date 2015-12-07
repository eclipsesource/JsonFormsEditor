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
                switch (this.currentElement.data["type"]) {
                    case "Control":
                        this.schema = {
                            "type": "object",
                            "properties": {
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
                                            "type": "string",
                                            "enum": this.jsonSchemaService.getFields()
                                        }
                                    }
                                }
                            }
                        };
                        break;
                    case "VerticalLayout":
                    case "HorizontalLayout":
                    case "Group":
                        this.schema = {
                            "type": "object",
                            "properties": {
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
                }
                switch (this.currentElement.data["type"]) {
                    case "Control":
                        this.uischema = {
                            "type": "VerticalLayout",
                            "elements": [
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
                        break;
                    case "VerticalLayout":
                    case "HorizontalLayout":
                    case "Group":
                        this.uischema = {
                            "type": "VerticalLayout",
                            "elements": [
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
                }
                this.data = this.currentElement.data;
            };
            DetailService.$inject = ["JsonSchemaService"];
            return DetailService;
        })();
        detail.DetailService = DetailService;
        angular.module('app.detail').service('DetailService', DetailService);
    })(detail = app.detail || (app.detail = {}));
})(app || (app = {}));
//# sourceMappingURL=detail.service.js.map