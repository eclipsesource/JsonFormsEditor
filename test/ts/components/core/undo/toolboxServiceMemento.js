var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var core;
    (function (core) {
        var undo;
        (function (undo) {
            var ToolboxServiceMemento = (function (_super) {
                __extends(ToolboxServiceMemento, _super);
                function ToolboxServiceMemento(elements, placedTimes) {
                    _super.call(this);
                    this.elements = elements;
                    this.placedTimes = placedTimes;
                }
                ToolboxServiceMemento.prototype.getElements = function () {
                    return this.elements;
                };
                ToolboxServiceMemento.prototype.getPlacedTimes = function () {
                    return this.placedTimes;
                };
                return ToolboxServiceMemento;
            })(Memento);
            undo.ToolboxServiceMemento = ToolboxServiceMemento;
        })(undo = core.undo || (core.undo = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=toolboxServiceMemento.js.map