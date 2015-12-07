var app;
(function (app) {
    var core;
    (function (core) {
        var metaschema;
        (function (metaschema) {
            var MetaschemaService = (function () {
                function MetaschemaService($http) {
                    //TODO implement using $http and promises, to get resource from static location on the server
                    this.schema = new Metaschema(metaSchema);
                }
                MetaschemaService.prototype.getSchema = function () {
                    return this.schema;
                };
                MetaschemaService.$inject = ['$http'];
                return MetaschemaService;
            })();
            metaschema.MetaschemaService = MetaschemaService;
            angular.module('app.core').service('MetaschemaService', MetaschemaService);
        })(metaschema = core.metaschema || (core.metaschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
var metaSchema = {
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