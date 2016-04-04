/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />

import ToolboxService = app.toolbox.ToolboxService;
import ControlToolboxElement = app.core.model.ControlToolboxElement;
'use strict';


describe('toolbox', ()=> {

    //beforeEach(angular.mock.module('temp/ts/templates.js'));
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('app.toolbox'));

    it('should delete element when clicking on delete', (inject(($rootScope, $templateCache) => {

        console.log($rootScope);
        console.log($templateCache.get('app/src/components/toolbox/toolbox.html'));
        console.log($templateCache.info());
    })));
    it('should add element when creating new one', () => {

    });
    it('when adding element to tree, should not be deletable', (inject(($rootScope, ToolboxService) => {
        var scope = $rootScope.$new();
        scope.schema = {
            "type": "object",
            "properties": {
                "name": { "type": "string" }
            }
        };

        ToolboxService.loadSchema(scope.schema);
        ToolboxService.increasePlacedTimes("name");
        scope.nameControl = ToolboxService.getElementByScope("name");

        expect(ToolboxService.canBeRemoved(scope.nameControl)).toBeFalsy();
    })));
    it("if object has non-deletable childs, it shouldn't be deletable either", (inject(($rootScope, ToolboxService) => {
        var scope = $rootScope.$new();
        scope.schema = {
            "type": "object",
            "properties": {
                "address": {
                    "type": "object",
                    "properties": {
                        "street": { "type": "string" },
                        "number": { "type": "integer" }
                    }
                }
            }
        };

        ToolboxService.loadSchema(scope.schema);
        ToolboxService.accessFolder("address");
        ToolboxService.increasePlacedTimes("address/properties/street");
        ToolboxService.previousFolder();
        scope.addressControl = ToolboxService.getElementByScope("address");

        expect(ToolboxService.canBeRemoved(scope.addressControl)).toBeFalsy();
    })));
    it('when dragging element to the tree, it should be added to it', () => {

    });

});
