/// <reference path="../../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../../typings/angularjs/angular-mocks.d.ts" />

import Metaschema = app.core.metaschema.Metaschema;
import Definition = app.core.metaschema.Definition;
'use strict';

describe('app.core.Metaschema', () => {

    var metaschema:Metaschema;

    beforeAll(() => {
        metaschema = Metaschema.fromJSON(json);
    });

    it('should resolve runtimeProps', () => {
        var metaschema:Metaschema = Metaschema.fromJSON(json);
        var controlDefinition:Definition = metaschema.getDefinitionByTypeLabel("Control");
        expect(controlDefinition.getDataschema()['properties']['rule']).toBeDefined();
    });

    it('should merge the properties', () => {
        var ab = { "properties": { "a": 1, "b": 2 } };
        var cd = { "properties": { "c": 3, "d": 4 } }
        var abcd = Metaschema.mergeDefinitionProperties([ab, cd]);
        expect(abcd).toEqual({ "a": 1, "b": 2, "c": 3, "d": 4 });
    });

    it('should merge only the properties', () => {
        var ab = { "properties": { "a": 1, "b": 2 } };
        var cd = { "c": 3, "d": 4 };
        var abcd = Metaschema.mergeDefinitionProperties([ab, cd]);
        expect(abcd).toEqual({ "a": 1, "b": 2 });
    });



    it('should create metaschema from JSON', () => {
        var metaschema:Metaschema = Metaschema.fromJSON(json);
        expect(metaschema).toBeDefined();
    });

    it('should read definitions from metaschema', () => {
        expect(metaschema.getDefinitions()).toBeDefined();
        expect(metaschema.getDefinitions().length).toBeGreaterThan(0);
    });

    it('should read one element from label', () => {
        expect(metaschema.getDefinitionByTypeLabel('Control')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('VerticalLayout')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('HorizontalLayout')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('Group')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('Categorization')).toBeDefined();
        expect(metaschema.getDefinitionByTypeLabel('Category')).toBeDefined();
    });

    it('should correctly read accepted elements', () => {
        expect(metaschema.getDefinitionByTypeLabel('Control').acceptsElements()).toBeFalsy();
        expect(metaschema.getDefinitionByTypeLabel('VerticalLayout').acceptsElements()).toBeTruthy();
        expect(metaschema.getDefinitionByTypeLabel('VerticalLayout').getAcceptedElements().length).toBeGreaterThan(0);
        expect(metaschema.getDefinitionByTypeLabel('Categorization').getAcceptedElements().length).toBe(1);
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
                    "$ref": "#/definitions/runtimeProps"
                }, {
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
                }],
                "required": ["type", "scope"]
            },
            "layout": {
                "type": "object",
                "required": ["type", "elements"],
                "additionalProperties": false,
                "allOf": [{
                    "$ref": "#/definitions/runtimeProps"
                }, {
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
                }]
            },
            "group": {
                "type": "object",
                "required": ["type", "elements"],
                "additionalProperties": false,
                "allOf": [{
                    "$ref": "#/definitions/runtimeProps"
                }, {
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
                "required": ["type", "elements"],
                "additionalProperties": false
            },
            "categorization": {
                "type": "object",
                "required": ["type", "elements"],
                "additionalProperties": false,
                "allOf": [{
                    "$ref": "#/definitions/runtimeProps"
                }, {
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