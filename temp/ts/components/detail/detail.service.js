var app;
(function (app) {
    var detail;
    (function (detail) {
        var DetailService = (function () {
            function DetailService(metaschemaService, dataschemaService, $q) {
                this.metaschemaService = metaschemaService;
                this.dataschemaService = dataschemaService;
                this.$q = $q;
            }
            DetailService.prototype.setElement = function (element) {
                var _this = this;
                var deferred = this.$q.defer();
                this.metaschemaService.getMetaschema().then(function (metaschema) {
                    _this.schema = metaschema.getDefinitionByTypeLabel(element.getType()).getDataschema();
                    if (_this.schema['properties']['rule']) {
                        _this.schema['properties']['rule']['properties']['condition']['properties']['scope']['enum'] = [""].concat(_this.dataschemaService.getPropertiesNames());
                    }
                    _this.uiSchema = metaschema.getDefinitionByTypeLabel(element.getType()).getUISchema();
                    _this.currentElement = element;
                    /*if (this.currentElement.getType() == 'Control') {
                        this.currentElement.setType(this.currentElement.getLongType());
                    }*/
                    deferred.resolve(true);
                });
                return deferred.promise;
            };
            DetailService.$inject = ['MetaschemaService', 'DataschemaService', '$q'];
            return DetailService;
        })();
        detail.DetailService = DetailService;
        angular.module('app.detail').service('DetailService', DetailService);
    })(detail = app.detail || (app.detail = {}));
})(app || (app = {}));
