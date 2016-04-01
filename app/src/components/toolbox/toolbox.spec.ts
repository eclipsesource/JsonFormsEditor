/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />

'use strict';


describe('toolbox', ()=> {

    //beforeEach(angular.mock.module('temp/ts/templates.js'));
    beforeEach(angular.mock.module('app'));

    it('should delete element when clicking on delete', (inject(($rootScope, $templateCache) => {

        console.log($rootScope);
        console.log($templateCache.get('app/src/components/toolbox/toolbox.html'));
        console.log($templateCache.info());
    })));
    it('should add element when creating new one', () => {

    });
    it('when adding element to tree, should not be deletable', () => {

    });
    it("if object has non-deletable childs, it shouldn't be deletable either", () => {

    });
    it('when dragging element to the tree, it should be added to it', () => {

    });

});
