var app;
(function (app) {
    var detail;
    (function (detail) {
        var DetailService = (function () {
            function DetailService(metaSchemaService) {
                this.metaSchemaService = metaSchemaService;
                this.metaSchema = metaSchemaService.getMetaSchema();
            }
            DetailService.prototype.setElement = function (element) {
                this.currentElement = element;
                this.schema = this.metaSchema.getDefinition(element.type).schema;
                this.uiSchema = this.metaSchema.getDefinition(element.type).uiSchema;
            };
            DetailService.$inject = ["MetaSchemaService"];
            return DetailService;
        })();
        detail.DetailService = DetailService;
        angular.module('app.detail').service('DetailService', DetailService);
    })(detail = app.detail || (app.detail = {}));
})(app || (app = {}));
//# sourceMappingURL=detail.service.js.map