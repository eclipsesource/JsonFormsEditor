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
            var TreeServiceMemento = (function (_super) {
                __extends(TreeServiceMemento, _super);
                function TreeServiceMemento(elements) {
                    _super.call(this);
                    this.elements = elements;
                }
                TreeServiceMemento.prototype.getElements = function () {
                    return this.elements;
                };
                return TreeServiceMemento;
            })(Memento);
            undo.TreeServiceMemento = TreeServiceMemento;
        })(undo = core.undo || (core.undo = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
