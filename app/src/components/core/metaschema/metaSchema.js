/// <reference path="../../../../../typings/lodash/lodash.d.ts" />
var app;
(function (app) {
    var core;
    (function (core) {
        var metaschema;
        (function (metaschema) {
            var Metaschema = (function () {
                /*private controls:string[] = [];
                private layouts:string[] = [];*/
                function Metaschema(json) {
                    this.definitions = [];
                    this.definitions.push("Control");
                    this.definitions.push("HorizontalLayout");
                    this.definitions.push("VerticalLayout");
                    this.definitions.push("Group");
                    this.definitions.push("Categorization");
                    this.definitions.push("Category");
                    _.forEach(json.definitions, function (definition) {
                    });
                    /*_.forEach(json.definitions.control.properties.type.enum, (control:string) => {
                        this.controls.push(control);
                    });
        
                    _.forEach(json.definitions.layout.properties.type.enum, (layout:string) => {
                        this.layouts.push(layout);
                    });*/
                }
                Metaschema.prototype.getDefinitions = function () {
                    return this.definitions;
                };
                return Metaschema;
            })();
            metaschema.Metaschema = Metaschema;
        })(metaschema = core.metaschema || (core.metaschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=metaSchema.js.map