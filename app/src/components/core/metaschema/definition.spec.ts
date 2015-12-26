/// <reference path="../../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../../typings/angularjs/angular-mocks.d.ts" />

import Definition = app.core.metaschema.Definition;
'use strict';

describe('app.core.Definition', () => {

    var layoutDefinition:Definition;
    var controlDefinition:Definition;

    beforeAll(() => {
        layoutDefinition = new Definition('layout', {
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
        });
        controlDefinition = new Definition('control', {
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
        });
    });

    it('should get the labels of the defintion', () => {
        expect(layoutDefinition.getTypeEnum()).toContain('VerticalLayout');
        expect(layoutDefinition.getTypeEnum()).toContain('HorizontalLayout');
        expect(layoutDefinition.getTypeEnum()).toContain('Group');
    });

    it('should get accepted elements for layout', () => {
        expect(layoutDefinition.getAcceptedElements()).toContain('Control');
        expect(layoutDefinition.getAcceptedElements()).toContain('VerticalLayout');
        expect(layoutDefinition.getAcceptedElements()).toContain('HorizontalLayout');
        expect(layoutDefinition.getAcceptedElements()).toContain('Group');
        expect(layoutDefinition.getAcceptedElements()).toContain('Categorization');
    });

    it('should get accepted elements for control', () => {
        expect(controlDefinition.getAcceptedElements()).toBe([]);
    });

});