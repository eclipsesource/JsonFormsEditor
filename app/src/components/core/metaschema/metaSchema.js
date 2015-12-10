var app;
(function (app) {
    var core;
    (function (core) {
        var metaschema;
        (function (metaschema) {
            var MetaSchema = (function () {
                function MetaSchema(jsonSchemaService, json) {
                    this.definitions = [];
                    var schema;
                    var uiSchema;
                    var initialData;
                    // TODO derive the schema, uiSchema and initialData of the different definitions automatically from the metaschema
                    // Control definition
                    schema = {
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
                                "type": "string",
                                "enum": jsonSchemaService.getFields()
                            }
                        },
                        "required": [
                            "type",
                            "scope"
                        ]
                    };
                    uiSchema = {
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
                    initialData = {
                        "type": undefined,
                        "label": undefined,
                        "scope": undefined
                    };
                    this.definitions.push(new metaschema.Definition(schema, uiSchema, initialData));
                    // Layout Definition
                    schema = {
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
                        },
                        "required": [
                            "type"
                        ]
                    };
                    uiSchema = {
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
                    initialData = {
                        "type": "",
                        "label": undefined,
                        "elements": [],
                        "acceptedElements": ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"]
                    };
                    this.definitions.push(new metaschema.Definition(schema, uiSchema, initialData));
                    // Categorization Definition
                    schema = {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string",
                                "enum": [
                                    "Categorization"
                                ]
                            }
                        },
                        "required": [
                            "type"
                        ]
                    };
                    uiSchema = {
                        "type": "VerticalLayout",
                        "elements": [
                            {
                                "type": "Control",
                                "label": "Type",
                                "scope": { "$ref": "#/properties/type" }
                            }
                        ]
                    };
                    initialData = {
                        "type": undefined,
                        "elements": [],
                        "acceptedElements": ["Category"]
                    };
                    this.definitions.push(new metaschema.Definition(schema, uiSchema, initialData));
                    // Category Definition
                    schema = {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string",
                                "enum": [
                                    "Category"
                                ]
                            }
                        },
                        "required": [
                            "type"
                        ]
                    };
                    uiSchema = {
                        "type": "VerticalLayout",
                        "elements": [
                            {
                                "type": "Control",
                                "label": "Type",
                                "scope": { "$ref": "#/properties/type" }
                            }
                        ]
                    };
                    initialData = {
                        "type": undefined,
                        "elements": [],
                        "acceptedElements": ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"]
                    };
                    this.definitions.push(new metaschema.Definition(schema, uiSchema, initialData));
                }
                MetaSchema.prototype.getDefinitions = function () {
                    return this.definitions;
                };
                MetaSchema.prototype.getDefinition = function (type) {
                    var definition = null;
                    for (var i = 0; i < this.definitions.length; i++) {
                        for (var j = 0; j < this.definitions[i].getTypeEnum().length; j++) {
                            if (type == this.definitions[i].getTypeEnum()[j])
                                definition = this.definitions[i];
                        }
                    }
                    return definition;
                };
                return MetaSchema;
            })();
            metaschema.MetaSchema = MetaSchema;
        })(metaschema = core.metaschema || (core.metaschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=metaSchema.js.map