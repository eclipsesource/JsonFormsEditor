/**
 * Created by pancho111203 on 19/12/15.
 */
var app;
(function (app) {
    var core;
    (function (core) {
        var model;
        (function (model) {
            var ToolboxElement = (function () {
                function ToolboxElement(label, type, elementConfig) {
                    this.label = label;
                    this.type = type;
                    this.elementConfig = elementConfig;
                }
                ToolboxElement.prototype.setAcceptedElements = function (acceptedElements) {
                    this.acceptedElements = acceptedElements;
                };
                ToolboxElement.prototype.getAcceptedElements = function () {
                    return this.acceptedElements;
                };
                ToolboxElement.prototype.getType = function () {
                    return this.type;
                };
                ToolboxElement.prototype.getLabel = function () {
                    return this.label;
                };
                ToolboxElement.prototype.getDescription = function () {
                    return this.elementConfig.getDescription();
                };
                ToolboxElement.prototype.getIcon = function () {
                    return this.elementConfig.getIconFont();
                };
                return ToolboxElement;
            })();
            model.ToolboxElement = ToolboxElement;
        })(model = core.model || (core.model = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=toolboxElement.js.map