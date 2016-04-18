'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    var ptor;
    beforeEach(function(){
        browser.get('#/edit');
        ptor = browser;
    });

    it('should add a tree element when toolbox element is dragged to the tree', function(){

        element(by.css('div.toolbox-input-datatype-box:nth-child(1)')).click();
        element(by.model('toolboxBottom.newElementLabel')).sendKeys('firstName');
        element(by.css('div.layout-align-space-around-center:nth-child(5) > div:nth-child(2) > button:nth-child(1)')).click();
        var toolboxElement = element(by.css('body > div.jsonFormsEditor-Body.ng-scope > div > div:nth-child(1) > div:nth-child(2) > md-content > md-content.md-padding.tree-view.flex > div > ol > li'));
        var parentTreeElement = element(by.css('md-content.tree-view:nth-child(2) > div:nth-child(1) > ol:nth-child(1) > li:nth-child(1)'));


        ptor.actions().mouseMove(toolboxElement).mouseDown().perform();

        browser.manage().timeouts().pageLoadTimeout(1000);

        ptor.actions().mouseMove(parentTreeElement).mouseMove(parentTreeElement, {y: parentTreeElement.clientHeight}).mouseUp().perform();

        browser.manage().timeouts().pageLoadTimeout(1000);
        var res = parentTreeElement.all(by.className('.angular-ui-tree-node')).count();

        expect(res).toBe(1);
    });
});
