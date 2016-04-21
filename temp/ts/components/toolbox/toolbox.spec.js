/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
var ToolboxService = app.toolbox.ToolboxService;
var ControlToolboxElement = app.core.model.ControlToolboxElement;
'use strict';
describe('toolbox', function () {
    var service;
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('app.toolbox'));
    beforeEach(angular.mock.module('app.tree'));
    beforeEach(angular.mock.module('app.core'));
    beforeEach(angular.mock.module('app.layouts'));
    beforeEach(inject(function (ToolboxService) {
        service = ToolboxService;
    }));
    beforeEach(function () {
        service.elements = [];
    });
    it('should add element when creating new one', function () {
        service.addSchemaElement('test', 'string');
        expect(service.elements.length).toEqual(1);
    });
    it('should delete element when clicking on delete', (inject(function ($rootScope, $controller) {
        var scope = $rootScope.$new();
        var controller = $controller('ToolboxController', { $scope: scope });
        service.addSchemaElement('test', 'string');
        controller.removeDataElement(service.elements[0]);
        expect(service.elements.length).toEqual(0);
    })));
    it('when adding element to tree, should not be deletable', (inject(function ($rootScope) {
        var scope = $rootScope.$new();
        scope.schema = {
            "type": "object",
            "properties": {
                "name": { "type": "string" }
            }
        };
        service.loadSchema(scope.schema);
        service.increasePlacedTimes("name");
        scope.nameControl = service.getElementByScope("name");
        expect(service.removeSchemaElement(scope.nameControl)).toBeFalsy();
    })));
    it("if object has non-deletable childs, it shouldn't be deletable either", (inject(function ($rootScope) {
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
        service.loadSchema(scope.schema);
        service.accessFolder("address");
        service.increasePlacedTimes("address/properties/street");
        service.previousFolder();
        scope.addressControl = service.getElementByScope("address");
        expect(service.removeSchemaElement(scope.addressControl)).toBeFalsy();
    })));
});
