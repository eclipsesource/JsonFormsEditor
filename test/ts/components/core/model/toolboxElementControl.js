var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var core;
    (function (core) {
        var model;
        (function (model) {
            var ElementConfig = app.core.elementsConfig.ElementConfig;
            var ControlToolboxElement = (function (_super) {
                __extends(ControlToolboxElement, _super);
                function ControlToolboxElement(name, datatype, scope) {
                    _super.call(this, name, "", null);
                    this.datatype = datatype;
                    this.scope = scope;
                    var config, type;
                    if (datatype == 'object') {
                        config = new ElementConfig('object', '', 'folder');
                        type = 'object';
                    }
                    else {
                        config = new ElementConfig('Control', '', 'code');
                        type = 'Control';
                    }
                    this.elementConfig = config;
                    this.type = type;
                }
                ControlToolboxElement.prototype.isObject = function () {
                    return this.datatype == 'object';
                };
                ControlToolboxElement.prototype.convertToTreeElement = function () {
                    var treeElement = new model.TreeElement();
                    treeElement.setType("Control");
                    treeElement.setDataType(this.datatype);
                    treeElement.setScope(this.scope);
                    treeElement.setLabel(this.getLabel());
                    treeElement.setAcceptedElements(this.getAcceptedElements());
                    return treeElement;
                };
                ControlToolboxElement.prototype.getScope = function () {
                    return this.scope;
                };
                ControlToolboxElement.prototype.clone = function () {
                    return new ControlToolboxElement(this.label, this.datatype, this.scope);
                };
                return ControlToolboxElement;
            })(model.ToolboxElement);
            model.ControlToolboxElement = ControlToolboxElement;
        })(model = core.model || (core.model = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=toolboxElementControl.js.map