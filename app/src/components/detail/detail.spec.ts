/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />

import DetailService = app.detail.DetailService;
'use strict';

describe('app.detail', () => {

    var detailService:DetailService;

    beforeEach(angular.mock.module('app.detail'));
    beforeEach(angular.mock.module('app.core'));

    beforeEach(angular.mock.inject(['DetailService', (ds) => {
        detailService = ds;
    }]));

    it('should set schema and uiSchema of detail view', () => {
        var treeElement:TreeElement = new TreeElement();
        treeElement.setType("VerticalLayout");
        detailService.setElement(treeElement);
        setTimeout(() => {
            expect(detailService.schema).toBeDefined();
            expect(detailService.uiSchema).toBeDefined();
        }, 200);
    })
});