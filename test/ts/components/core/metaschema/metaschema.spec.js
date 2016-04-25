/// <reference path="../../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../../typings/angularjs/angular-mocks.d.ts" />
var Metaschema = app.core.metaschema.Metaschema;
var Definition = app.core.metaschema.Definition;
'use strict';
describe('app.core.Metaschema', function () {
    var metaschema;
    beforeAll(function () {
        metaschema = Metaschema.fromJSON(json);
    });
    it('should resolve runtimeProps', function () {
        var controlDefinition = metaschema.getDefinitionByTypeLabel("Control");
        expect(controlDefinition.getDataschema()['properties']['rule']).toBeDefined();
    });
    it('should merge the properties', function () {
        var ab = { "properties": { "a": 1, "b": 2 } };
        var cd = { "properties": { "c": 3, "d": 4 } };
        var abcd = Metaschema.mergeDefinitionProperties([ab, cd]);
        expect(abcd).toEqual({ "a": 1, "b": 2, "c": 3, "d": 4 });
    });
    it('should merge only the properties', function () {
        var ab = { "properties": { "a": 1, "b": 2 } };
        var cd = { "c": 3, "d": 4 };
        var abcd = Metaschema.mergeDefinitionProperties([ab, cd]);
        expect(abcd).toEqual({ "a": 1, "b": 2 });
    });
    it('should generate a correct definition dataschema', function () {
        var controlResolvedMetaschema = {
            "allOf": [{
                    "properties": {
                        "type": {
                            "type": "string",
                            "enum": ["ExampleType"]
                        },
                        "scope": {
                            "type": "object",
                            "properties": {
                                "$ref": {
                                    "type": "string"
                                }
                            }
                        },
                        "elements": {}
                    }
                }, {
                    "properties": {
                        "rule": {
                            "type": "object",
                            "properties": {
                                "condition": {
                                    "type": "object",
                                    "properties": {
                                        "scope": {
                                            "type": "object",
                                            "properties": {
                                                "$ref": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }]
        };
        var controlDataschema = Metaschema.generateDefinitionDataschema(controlResolvedMetaschema);
        expect(controlDataschema['allOf']).toBeUndefined();
        expect(controlDataschema['properties']).toBeDefined();
        expect(controlDataschema['properties']['elements']).toBeUndefined();
        expect(controlDataschema['properties']['type']['enum']).toBeUndefined();
        expect(controlDataschema['properties']['scope']["type"]).toBe("string");
        expect(controlDataschema['properties']['rule']).toBeDefined();
    });
    it('should create metaschema from JSON', function () {
        var metaschema = Metaschema.fromJSON(json);
        expect(metaschema).toBeDefined();
    });
    it('should read definitions from metaschema', function () {
        expect(metaschema.getDefinitions()).toBeDefined();
        expect(metaschema.getDefinitions().length).toBeGreaterThan(0);
    });
    it('should read one element from label', function () {
        expect(metaschema.getDefinitionByTypeLabel('Control')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('VerticalLayout')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('HorizontalLayout')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('Group')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('Categorization')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('Category')).toBeDefined();
    });
    it('should correctly read accepted elements', function () {
        expect(metaschema.getDefinitionByTypeLabel('Control').acceptsElements()).toBeFalsy();
        expect(metaschema.getDefinitionByTypeLabel('VerticalLayout').acceptsElements()).toBeTruthy();
        expect(metaschema.getDefinitionByTypeLabel('VerticalLayout').getAcceptedElements().length).toBeGreaterThan(0);
        expect(metaschema.getDefinitionByTypeLabel('Categorization').getAcceptedElements()).toEqual(['Category']);
    });
    /**
     * The metaschema-definition.
     */
    var json = {
        "definitions": {
            "rule": {
                "type": "object",
                "required": ["condition", "effect"],
                "properties": {
                    "effect": {
                        "type": "string",
                        "enum": ["", "HIDE"]
                    },
                    "condition": {
                        "type": "object",
                        "properties": {
                            "scope": {
                                "type": "object",
                                "properties": {
                                    "$ref": {
                                        "type": "string"
                                    }
                                }
                            },
                            "expectedValue": {
                                "type": "string"
                            }
                        }
                    }
                }
            },
            "runtimeProps": {
                "type": "object",
                "properties": {
                    "rule": {
                        "$ref": "#/definitions/rule"
                    }
                }
            },
            "control": {
                "type": "object",
                "allOf": [{
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
                            },
                            "readOnly": {
                                "type": "boolean"
                            }
                        }
                    }, {
                        "$ref": "#/definitions/runtimeProps"
                    }],
                "required": ["type", "scope"]
            },
            "layout": {
                "type": "object",
                "required": ["type", "elements"],
                "allOf": [{
                        "properties": {
                            "type": {
                                "type": "string",
                                "enum": [
                                    "HorizontalLayout",
                                    "VerticalLayout"
                                ]
                            },
                            "elements": {
                                "type": "array",
                                "items": {
                                    "$ref": "#"
                                }
                            }
                        }
                    }, {
                        "$ref": "#/definitions/runtimeProps"
                    }]
            },
            "group": {
                "type": "object",
                "required": ["type", "elements"],
                "allOf": [{
                        "properties": {
                            "type": {
                                "type": "string",
                                "enum": ["Group"]
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
                        }
                    }, {
                        "$ref": "#/definitions/runtimeProps"
                    }]
            },
            "category": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "Category"
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
                "required": ["type", "elements"]
            },
            "categorization": {
                "type": "object",
                "required": ["type", "elements"],
                "allOf": [{
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
                                    "$ref": "#/definitions/category"
                                }
                            }
                        }
                    }, {
                        "$ref": "#/definitions/runtimeProps"
                    }]
            }
        },
        "type": "object",
        "anyOf": [{
                "$ref": "#/definitions/categorization"
            }, {
                "$ref": "#/definitions/layout"
            }, {
                "$ref": "#/definitions/group"
            }, {
                "$ref": "#/definitions/control"
            }]
    };
});
//# sourceMappingURL=metaschema.spec.js.map