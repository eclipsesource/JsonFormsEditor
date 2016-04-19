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

    beforeEach(angular.mock.module('app'));

    /*beforeEach(function (done) {
        angular.mock.inject(['TreeService', (ts) => {
            setTimeout(function () {
                treeService = ts;
                /reeService.generateTreeFromExistingUISchema(uiSchema);
            }, 4000)
        }])
    });*/

    xit('should generate a tree from existing UI Schema and export it as string', () => {
        expect(treeService.elements.length).toBe(1);
        expect(treeService.elements[0].elements.length).toBe(1);
         expect(treeService.exportUISchemaAsJSON()).toEqual(uiSchema);
    });
});