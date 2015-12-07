/// <reference path="../../../../../typings/lodash/lodash.d.ts" />
var app;
(function (app) {
    var core;
    (function (core) {
        var metaschema;
        (function (metaschema) {
            var Metaschema = (function () {
                function Metaschema(json) {
                    var _this = this;
                    this.controls = [];
                    this.layouts = [];
                    _.forEach(json.definitions.control.properties.type.enum, function (control) {
                        _this.controls.push(control);
                    });
                    _.forEach(json.definitions.layout.properties.type.enum, function (layout) {
                        _this.layouts.push(layout);
                    });
                }
                Metaschema.prototype.getControls = function () {
                    return this.controls;
                };
                Metaschema.prototype.getLayouts = function () {
                    return this.layouts;
                };
                return Metaschema;
            })();
            metaschema.Metaschema = Metaschema;
        })(metaschema = core.metaschema || (core.metaschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=metaSchema.js.map