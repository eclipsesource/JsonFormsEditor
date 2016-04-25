var app;
(function (app) {
    var core;
    (function (core) {
        var metaschema;
        (function (metaschema) {
            var MetaschemaService = (function () {
                function MetaschemaService($http, $q) {
                    var _this = this;
                    var deffered = $q.defer();
                    $http.get('resource/metaschema.json').success(function (json) {
                        _this.jsonMetaschema = json;
                        deffered.resolve(metaschema.Metaschema.fromJSON(json));
                    });
                    this.metaschema = deffered.promise;
                }
                /**
                 * Gets a promise of the Metaschema.
                 *
                 * @returns {IPromise<Metaschema>}
                 */
                MetaschemaService.prototype.getMetaschema = function () {
                    return this.metaschema;
                };
                MetaschemaService.prototype.getJsonMetaschema = function () {
                    if (!this.jsonMetaschema) {
                        console.log('ERROR: The metaschema has not been loaded yet');
                        return undefined;
                    }
                    return this.jsonMetaschema;
                };
                MetaschemaService.$inject = ['$http', '$q'];
                return MetaschemaService;
            })();
            metaschema.MetaschemaService = MetaschemaService;
            angular.module('app.core').service('MetaschemaService', MetaschemaService);
        })(metaschema = core.metaschema || (core.metaschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=metaSchema.service.js.map