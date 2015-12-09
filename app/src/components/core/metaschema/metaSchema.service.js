var app;
(function (app) {
    var core;
    (function (core) {
        var metaschema;
        (function (metaschema) {
            var MetaSchemaService = (function () {
                function MetaSchemaService($http, jsonSchemaService) {
                    //TODO implement using $http and promises, to get resource from static location on the server
                    this.metaSchema = new metaschema.MetaSchema(jsonSchemaService, jsonMetaSchema);
                }
                MetaSchemaService.prototype.getMetaSchema = function () {
                    return this.metaSchema;
                };
                MetaSchemaService.$inject = ['$http', 'JsonSchemaService'];
                return MetaSchemaService;
            })();
            metaschema.MetaSchemaService = MetaSchemaService;
            angular.module('app.core').service('MetaSchemaService', MetaSchemaService);
        })(metaschema = core.metaschema || (core.metaschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
var jsonMetaSchema = {
    "definitions": {
        "label": {
            "properties": {
                "text": {
                    "type": "string"
                }
            }
        },
        "control": {
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
                            "type": "string"
                        }
                    }
                }
            },
            "required": [
                "type",
                "scope"
            ]
        },
        "layout": {
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
                },
                "elements": {
                    "type": "array",
                    "items": {
                        "$ref": "#"
                    }
                }
            },
            "required": [
                "type",
                "elements"
            ]
        },
        "categorization": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "Categorization"
                    ]
                },
                "elements": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string",
                                "enum": [
                                    "Category"
                                ]
                            },
                            "elements": {
                                "type": "array",
                                "items": {
                                    "$ref": "#"
                                }
                            }
                        },
                        "required": [
                            "type",
                            "elements"
                        ]
                    }
                }
            },
            "required": [
                "type",
                "elements"
            ]
        }
    },
    "type": "object",
    "oneOf": [
        {
            "$ref": "#/definitions/categorization"
        },
        {
            "$ref": "#/definitions/layout"
        },
        {
            "$ref": "#/definitions/control"
        },
        {
            "$ref": "#/definitions/label"
        }
    ]
};
//# sourceMappingURL=metaSchema.service.js.map