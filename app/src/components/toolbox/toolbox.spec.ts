/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />

import ToolboxService = app.toolbox.ToolboxService;
import ControlToolboxElement = app.core.model.ControlToolboxElement;
'use strict';


describe('toolbox', ()=> {
    var service;

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('app.toolbox'));
    beforeEach(angular.mock.module('app.tree'));
    beforeEach(angular.mock.module('app.core'));
    beforeEach(angular.mock.module('app.layouts'));

    beforeEach(inject((ToolboxService)=>{
        service = ToolboxService;
    }));

    beforeEach(function(){
        service.elements = [];
    });

    it('should add element when creating new one', () => {
        service.addSchemaElement('test', 'string');
        expect(service.elements.length).toEqual(1);
    });

    it('should delete element when clicking on delete', (inject(($rootScope, $controller) => {
        var scope = $rootScope.$new();
        var controller = $controller('ToolboxController', {$scope: scope});

        service.addSchemaElement('test', 'string');

        controller.removeDataElement(service.elements[0]);

        expect(service.elements.length).toEqual(0);
    })));

    it('when adding element to tree, should not be deletable', (inject(($rootScope) => {
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

    it("if object has non-deletable childs, it shouldn't be deletable either", (inject(($rootScope) => {
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

describe('toolbox.directive', ()=>{
    beforeEach(angular.mock.module('app.toolbox'));
    beforeEach(angular.mock.module('app.tree'));
    beforeEach(angular.mock.module('app.core'));
    beforeEach(angular.mock.module('app.layouts'));
    it("focus on element if directive with toolbox-focus-input was clicked", (inject(($rootScope, $compile)=>{
        var parent = document.createElement('div');
        var input = document.createElement('input');
        input.setAttribute('id','test-input');
        input.setAttribute('type', 'text');

        var inputNoFocus = document.createElement('input');
        inputNoFocus.setAttribute('id','test-input-no-focus');
        inputNoFocus.setAttribute('type', 'text');

        var button = document.createElement('button');
        button.setAttribute('toolbox-focus-input', 'test-input');
        button.setAttribute('id', 'test-button');

        parent.appendChild(input);
        parent.appendChild(inputNoFocus);
        parent.appendChild(button);

        var scope = $rootScope.$new();
        document.body.appendChild(parent);
        $compile(document)(scope);

        $rootScope.$digest();

        document.getElementById('test-input-no-focus').focus();
        expect(document.activeElement).toBe(document.getElementById('test-input-no-focus'));

        document.getElementById('test-button').click();
        expect(document.activeElement).toBe(document.getElementById('test-input'));


    })));
});
