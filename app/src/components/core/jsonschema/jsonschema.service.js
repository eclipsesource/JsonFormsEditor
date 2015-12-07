/// <reference path="../../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/**
 * Created by pancho111203 on 4/12/15.
 */
var app;
(function (app) {
    var core;
    (function (core) {
        var jsonschema;
        (function (jsonschema) {
            var JsonSchemaService = (function () {
                function JsonSchemaService() {
                    this.fields = [];
                    this.loadFromJson(exampleFieldSchema);
                }
                JsonSchemaService.prototype.loadFromJson = function (json) {
                    for (var key in json.properties) {
                        if (json.properties.hasOwnProperty(key)) {
                            this.fields.push(key);
                        }
                    }
                };
                JsonSchemaService.prototype.getFields = function () {
                    return this.fields;
                };
                return JsonSchemaService;
            })();
            jsonschema.JsonSchemaService = JsonSchemaService;
            angular.module("app.core").service("JsonSchemaService", JsonSchemaService);
        })(jsonschema = core.jsonschema || (core.jsonschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//TODO flatten fieldschema to include all the properties (use lodash)
//TODO load from user
var exampleFieldSchema = {
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        }
    }
};
//# sourceMappingURL=jsonschema.service.js.map