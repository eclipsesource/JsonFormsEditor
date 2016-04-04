/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />

import ToolboxService = app.toolbox.ToolboxService;
'use strict';


describe('toolbox', ()=> {
    var service;

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

    it('should delete element when clicking on delete', (inject(($rootScope, $controller, ToolboxService) => {
        var scope = $rootScope.$new();
        var controller = $controller('ToolboxController', {$scope: scope});
        var service = ToolboxService;

        service.addSchemaElement('test', 'string');

        controller.removeDataElement(service.elements[0]);

        expect(service.elements.length).toEqual(0);
    })));

    it('when adding element to tree, should not be deletable', () => {

    });
    it("if object has non-deletable childs, it shouldn't be deletable either", () => {

    });
    it('when dragging element to the tree, it should be added to it', () => {

    });

});
