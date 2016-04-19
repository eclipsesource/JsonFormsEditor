describe('app', function () {
  var page = require('./page.js');

  beforeEach(function () {
    page.get();

    // create toolbox element

  });

  it('should add a tree element when toolbox element is dragged to the tree', function () {
    element(by.css('div.toolbox-input-datatype-box:nth-child(1)')).click();
    element(by.model('toolboxBottom.newElementLabel')).sendKeys('firstName');
    element(by.css('div.layout-align-space-around-center:nth-child(5) > div:nth-child(2) > button:nth-child(1)')).click();

    var toolboxElement = page.getNodeAtPosition("toolbox-root", 1);
    var parentTreeElement = page.getNodeAtPosition("tree-root", 1);

    browser.actions()
      .mouseMove(toolboxElement.getHandle())
      .mouseDown()
      .perform();

    browser.sleep(1000);

    browser.actions()
      .mouseMove(parentTreeElement.getHandle(), {x: 160, y: 0})
      .mouseMove({x: 0, y: 30})
      .perform();

    browser.sleep(1000);

    browser.actions()
      .mouseMove({x: 0, y: 40})
      .perform();

    browser.sleep(1000);

    browser.actions()
      .mouseUp()
      .perform();

    parentTreeElement.getSubnodes().count().then(function (count) {
      expect(count).toEqual(1);
    });
  });
});
