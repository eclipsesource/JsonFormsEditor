var app;
(function (app) {
    var core;
    (function (core) {
        var elementsConfig;
        (function (elementsConfig) {
            var ElementsConfigService = (function () {
                function ElementsConfigService($http, $q) {
                    this.$q = $q;
                    var defer = $q.defer();
                    $http.get('resource/elementsConfig.json').success(function (json) {
                        var elements = [];
                        _.forEach(json, function (property) {
                            elements.push(new elementsConfig.ElementConfig(property['typeLabel'], property['description'], property['iconFont']));
                        });
                        defer.resolve(elements);
                    });
                    this.elements = defer.promise;
                }
                ElementsConfigService.prototype.getElements = function () {
                    return this.elements;
                };
                ElementsConfigService.$inject = ['$http', '$q'];
                return ElementsConfigService;
            })();
            elementsConfig.ElementsConfigService = ElementsConfigService;
            angular.module('app.core').service('ElementsConfigService', ElementsConfigService);
        })(elementsConfig = core.elementsConfig || (core.elementsConfig = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=elementsConfig.service.js.map