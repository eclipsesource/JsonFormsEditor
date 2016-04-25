/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />

import TreeService = app.tree.TreeService;
import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
import TreeElement = app.core.model.TreeElement;
'use strict';

describe('app.tree', () => {

    var treeService:TreeService;
    var dataSchema = {
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            }
        }
    };
    var uiSchema = {
        "type": "VerticalLayout",
        "elements": [
            {
                "type": "Control",
                "scope": {
                    "$ref": "#/properties/name"
                }
            }
        ]
    };
    var $scope;

    beforeEach(angular.mock.module('app'));


    beforeEach(inject(($rootScope, TreeService, ToolboxService, $httpBackend) => {
        $scope = $rootScope.$new();
        treeService = TreeService;
        $httpBackend.when('GET', 'resource/metaschema.json').respond(json);
        $httpBackend.when('GET', 'resource/elementsConfig.json').respond(elementsConfig);
        $httpBackend.flush();
        ToolboxService.loadSchema(dataSchema);
        treeService.generateTreeFromExistingUISchema(uiSchema);
    }));

    it('should generate a tree from existing UI Schema and export it as string', () => {
        $scope.$apply();
        expect(treeService.elements.length).toBe(1);
        expect(treeService.elements[0].elements.length).toBe(1);
        expect(JSON.parse(treeService.exportUISchemaAsJSON())).toEqual(uiSchema);
    });

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

    var elementsConfig = [
        {
            "typeLabel": "VerticalLayout",
            "description": "Text",
            "iconFont": "view_stream"
        },
        {
            "typeLabel": "HorizontalLayout",
            "description": "Text",
            "iconFont": "view_column"
        },
        {
            "typeLabel": "Group",
            "description": "Text",
            "iconFont": "crop_free"
        },
        {
            "typeLabel": "Categorization",
            "description": "Text",
            "iconFont": "view_module"
        },
        {
            "typeLabel": "Category",
            "description": "Text",
            "iconFont": "folder_open"
        }
    ]
});