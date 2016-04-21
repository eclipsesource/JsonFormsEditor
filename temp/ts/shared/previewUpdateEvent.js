var app;
(function (app) {
    var preview;
    (function (preview) {
        var PreviewUpdateEvent = (function () {
            function PreviewUpdateEvent(schema, uiSchema) {
                this.schema = schema;
                this.uiSchema = uiSchema;
            }
            PreviewUpdateEvent.prototype.containsSchema = function () {
                return this.schema != null && this.schema != undefined;
            };
            PreviewUpdateEvent.prototype.containsUiSchema = function () {
                return this.uiSchema != null && this.uiSchema != undefined;
            };
            PreviewUpdateEvent.prototype.getSchema = function () {
                return this.schema;
            };
            PreviewUpdateEvent.prototype.getUiSchema = function () {
                return this.uiSchema;
            };
            return PreviewUpdateEvent;
        })();
        preview.PreviewUpdateEvent = PreviewUpdateEvent;
    })(preview = app.preview || (app.preview = {}));
})(app || (app = {}));
