var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by pancho111203 on 19/12/15.
 */
var app;
(function (app) {
    var core;
    (function (core) {
        var model;
        (function (model) {
            var LayoutToolboxElement = (function (_super) {
                __extends(LayoutToolboxElement, _super);
                function LayoutToolboxElement(name, type, elementConfig) {
                    _super.call(this, name, type, elementConfig);
                }
                LayoutToolboxElement.prototype.convertToTreeElement = function () {
                    var treeElement = new model.TreeElement();
                    treeElement.setType(this.getType());
                    treeElement.setLabel("");
                    treeElement.setAcceptedElements(this.getAcceptedElements());
                    return treeElement;
                };
                return LayoutToolboxElement;
            })(model.ToolboxElement);
            model.LayoutToolboxElement = LayoutToolboxElement;
        })(model = core.model || (core.model = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=toolboxElementLayout.js.map