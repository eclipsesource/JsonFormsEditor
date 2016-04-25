var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var tree;
    (function (tree) {
        var TreeServiceMemento = app.core.undo.TreeServiceMemento;
        var TreeService = (function (_super) {
            __extends(TreeService, _super);
            function TreeService(layoutsService, toolboxService, $q, validatorService) {
                var _this = this;
                _super.call(this);
                this.layoutsService = layoutsService;
                this.toolboxService = toolboxService;
                this.$q = $q;
                this.validatorService = validatorService;
                this.elements = [];
                layoutsService.getElementByType('VerticalLayout').then(function (element) {
                    var rootElement = element.convertToTreeElement();
                    rootElement['root'] = 'root';
                    _this.elements.push(rootElement);
                    _this.validateTree();
                });
            }
            TreeService.prototype.exportUISchemaAsJSON = function () {
                if (this.elements[0] === null || typeof this.elements[0] === "undefined") {
                    return "";
                }
                return this.elements[0].toJSONString();
            };
            TreeService.prototype.generateTreeFromExistingUISchema = function (uiSchema) {
                var _this = this;
                this.elements.splice(0, this.elements.length);
                this.layoutsService.getElementByType(uiSchema.type).then(function (element) {
                    var rootElement = element.convertToTreeElement();
                    rootElement['root'] = 'root';
                    for (var i = 0; i < uiSchema.elements.length; i++) {
                        _this.generateTreeElement(rootElement, uiSchema.elements[i]);
                    }
                    _this.elements.push(rootElement);
                });
            };
            TreeService.prototype.generateTreeElement = function (parent, uiSchema) {
                var _this = this;
                var treeElement;
                if (uiSchema.type == "Control") {
                    this.toolboxService.increasePlacedTimes(this.toolboxService.getElementByScope(uiSchema.scope.$ref.substring(13)).getScope());
                    treeElement = this.toolboxService.getElementByScope(uiSchema.scope.$ref.substring(13)).convertToTreeElement();
                    treeElement.setLabel(uiSchema.label);
                    parent.addElement(treeElement);
                }
                else {
                    this.layoutsService.getElementByType(uiSchema.type).then(function (element) {
                        treeElement = element.convertToTreeElement();
                        for (var i = 0; i < uiSchema.elements.length; i++) {
                            _this.generateTreeElement(treeElement, uiSchema.elements[i]);
                        }
                        parent.addElement(treeElement);
                    });
                }
            };
            TreeService.prototype.setMemento = function (memento) {
                this.elements[0]['elements'] = memento.getElements()[0]['elements'];
            };
            TreeService.prototype.createMemento = function () {
                var elements = [];
                _.forEach(this.elements, function (element) {
                    elements.push(element.clone());
                });
                return new TreeServiceMemento(elements);
            };
            TreeService.prototype.modifiedTree = function () {
                this.validateTree();
            };
            TreeService.prototype.validateTree = function () {
                var _this = this;
                try {
                    var validation = this.validatorService.validateUISchema(this.exportUISchemaAsJSON());
                }
                catch (error) {
                    this.elements[0].addError('Unexpected Error validating');
                    return;
                }
                if (!validation || validation.valid === undefined || validation.errors === undefined) {
                    this.elements[0].addError('Unexpected Error validating');
                    return;
                }
                this.resetAllErrors();
                if (validation.valid === false) {
                    validation.errors.forEach(function (error) {
                        _this.processError(error);
                    });
                }
            };
            TreeService.prototype.resetAllErrors = function () {
                this.getAllElements().forEach(function (element) {
                    element.resetErrors();
                });
            };
            TreeService.prototype.getAllElements = function () {
                var res = [];
                for (var i = 0; i < this.elements.length; i++) {
                    res.push(this.elements[i]);
                    this.getChildElements(this.elements[i], res);
                }
                return res;
            };
            TreeService.prototype.getChildElements = function (element, res) {
                var childs = element.elements;
                if (!childs) {
                    return;
                }
                for (var i = 0; i < childs.length; i++) {
                    res.push(childs[i]);
                    this.getChildElements(childs[i], res);
                }
            };
            TreeService.prototype.processError = function (error) {
                if (!error) {
                    return;
                }
                var dataPath = error.dataPath;
                var message = error.message;
                var subErrors = error.subErrors || [];
                if (dataPath === undefined || message === undefined) {
                    return;
                }
                this.getElementByPath(dataPath).addError(message);
                for (var i = 0; i < subErrors.length; i++) {
                    this.processError(subErrors[i]);
                }
            };
            TreeService.prototype.getElementByPath = function (path) {
                var element = this.elements[0];
                var split = path.split('/');
                if (split === undefined)
                    split = [];
                for (var i = 0; i < split.length; i++) {
                    if (split[i] === '') {
                        continue;
                    }
                    //check if the value is neither a number nor 'elements'
                    if (isNaN(parseInt(split[i])) && split[i] !== 'elements') {
                        break;
                    }
                    element = element[split[i]];
                }
                return element;
            };
            TreeService.$inject = ['LayoutsService', 'ToolboxService', '$q', 'ValidatorService'];
            return TreeService;
        })(Observable);
        tree.TreeService = TreeService;
        angular.module('app.tree').service('TreeService', TreeService);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=tree.service.js.map