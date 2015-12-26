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

    it('should read names of the definitions from metaschema', () => {
        expect(metaschema.getNames()).toContain('control');
        expect(metaschema.getNames()).toContain('layout');
        expect(metaschema.getNames()).toContain('categorization');
        expect(metaschema.getNames()).toContain('category');
    });

    it('should read all labels from metaschema', () => {
        expect(metaschema.getLabels()).toContain('Control');
        expect(metaschema.getLabels()).toContain('VerticalLayout');
        expect(metaschema.getLabels()).toContain('HorizontalLayout');
        expect(metaschema.getLabels()).toContain('Group');
        expect(metaschema.getLabels()).toContain('Categorization');
        expect(metaschema.getLabels()).toContain('Category');
    });

    it('should read one element from name', () => {
        expect(metaschema.getDefinition('control')).toBeDefined();
        expect(metaschema.getDefinition('layout')).toBeDefined();
        expect(metaschema.getDefinition('categorization')).toBeDefined();
        expect(metaschema.getDefinition('category')).toBeDefined();
    });

    it('should read one element from label', () => {
       expect(metaschema.getDefinitionFromLabel('Control')).toBeDefined();
       expect(metaschema.getDefinitionFromLabel('VerticalLayout')).toBeDefined();
       expect(metaschema.getDefinitionFromLabel('HorizontalLayout')).toBeDefined();
       expect(metaschema.getDefinitionFromLabel('Group')).toBeDefined();
       expect(metaschema.getDefinitionFromLabel('Categorization')).toBeDefined();
       expect(metaschema.getDefinitionFromLabel('Category')).toBeDefined();
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