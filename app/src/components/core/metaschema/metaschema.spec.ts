/// <reference path="../../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../../typings/angularjs/angular-mocks.d.ts" />

import MetaSchema = app.core.metaschema.MetaSchema;
'use strict';

describe('app.core.Metaschema', () => {

    var metaschema:MetaSchema;

    beforeAll(() => {
        metaschema = MetaSchema.fromJSON(json);
    });

    it('should create metaschema from JSON', () => {
        var metaschema:MetaSchema = MetaSchema.fromJSON(json);
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
});