/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />

'use strict';

describe('app.tree.TreeService', () => {

    var treeService : app.tree.TreeService;

    beforeEach(angular.mock.module('app.tree'));
    beforeEach(inject(($injector) => {
        treeService = $injector.get('TreeService');
    }));


    it('should be able to return elements via id', () => {
        expect(treeService.getElement(1)).toBeDefined();
        expect(treeService.getElement(1)).toEqual(new app.tree.TreeElement(1, app.tree.TreeElementType.Button, []))
    })
});
