/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />

import TreeService = app.tree.TreeService;
import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
import TreeElement = app.core.model.TreeElement;
'use strict';

describe('app.tree', () => {

    var treeService:TreeService;
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

    beforeEach(angular.mock.module('app.tree'));
    beforeEach(angular.mock.module('app.layouts'));
    beforeEach(angular.mock.module('app.core'));
    beforeEach(angular.mock.module('app.toolbox'));

    beforeEach(angular.mock.inject(['TreeService', (ts) => {
        treeService = ts;
    }]));

    it('should generate a tree from existing UI Schema and export it as string', () => {
        treeService.generateTreeFromExistingUISchema(uiSchema);
        setTimeout(() => {
            expect(treeService.elements.length).toBe(1);
            expect(treeService.elements[0].elements.length).toBe(1);
            expect(treeService.exportUISchemaAsJSON()).toEqual(uiSchema);
        }, 1000);
    });
});