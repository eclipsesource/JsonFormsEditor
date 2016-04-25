/**
 * Created by pancho111203 on 6/04/16.
 */
var app;
(function (app) {
    var core;
    (function (core) {
        var ValidatorService = (function () {
            function ValidatorService(metaSchemaService) {
                this.metaSchemaService = metaSchemaService;
            }
            ValidatorService.prototype.validateUISchema = function (uiSchema) {
                if (tv4 === undefined) {
                    return;
                }
                if (!uiSchema) {
                    return;
                }
                uiSchema = JSON.parse(uiSchema);
                var metaschema = this.metaSchemaService.getJsonMetaschema();
                if (!metaschema) {
                    return;
                }
                var validation = tv4.validateMultiple(uiSchema, metaschema);
                return validation;
            };
            ValidatorService.$inject = ['MetaschemaService'];
            return ValidatorService;
        })();
        core.ValidatorService = ValidatorService;
        angular.module('app.core').service('ValidatorService', ValidatorService);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=validator.service.js.map