var app;
(function (app) {
    var core;
    (function (core) {
        var metaschema;
        (function (metaschema) {
            var Definition = (function () {
                function Definition(schema, uiSchema, initialData) {
                    this.schema = schema;
                    this.uiSchema = uiSchema;
                    this.initialData = initialData;
                }
                Definition.prototype.getTypeEnum = function () {
                    return this.schema.properties.type.enum;
                };
                return Definition;
            })();
            metaschema.Definition = Definition;
        })(metaschema = core.metaschema || (core.metaschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=Definition.js.map