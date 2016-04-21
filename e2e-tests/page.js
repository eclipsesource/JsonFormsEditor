var BASIC_EXAMPLE_URL = 'http://localhost:1234/#/edit';

var BasicExamplePageNode = function (treeId, nodeLocation) {
  var subnodesXpath = 'ol/li[contains(@class,"angular-ui-tree-node")]';
  var nodeHandlesLocator = by.css('[ui-tree-handle]');

  var nodeElement = element(by.xpath(xpathStringForNodeAtPosition(treeId, nodeLocation)));
  var handle = nodeElement.all(nodeHandlesLocator).first();

  this.getElement = function() { return nodeElement; };
  this.getHandle = function() { return handle; };
  this.getText = function () {
    return handle.getText();
  };
  this.getLocation = function () {
    return nodeElement.getLocation();
  };
  this.getSubnodes = function() {
    return nodeElement.all(by.xpath(subnodesXpath));
  };

  function xpathStringForNodeAtPosition(treeId, nodeLocation) {
    var xpathChunks = ['//*[@id="' + treeId + '"]'];
    nodeLocation.forEach(function(index) {
      xpathChunks.push(subnodesXpath + '[' + index + ']')
    });
    return xpathChunks.join('/');
  }
};

var BasicExamplePage = function () {
  this.get = function () {
    browser.get(BASIC_EXAMPLE_URL);
  };

  this.getRootNodes = function() {
    return element.all(by.repeater('node in data'));
  };

  this.getNodeAtPosition = function () {
    return new BasicExamplePageNode([].slice.call(arguments, 0, 1), [].slice.call(arguments, 1));
  };
};

module.exports = new BasicExamplePage();
