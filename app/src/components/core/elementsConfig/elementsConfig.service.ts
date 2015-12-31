module app.core.elementsConfig {
    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;
    import IDeferred = angular.IDeferred;
    import IQService = angular.IQService;

    export class ElementsConfigService {

        static $inject = ['$http', '$q'];

        private elements:IPromise<ElementConfig[]>;

        constructor($http:IHttpService, private $q:IQService) {
            var defer:IDeferred<ElementConfig[]> = $q.defer();

            $http.get('resource/elementsConfig.json').success((json:any) => {
                var elements = [];

                _.forEach(json, (property:any) => {
                    elements.push(new ElementConfig(property['typeLabel'], property['description'], property['iconFont']));
                });

                defer.resolve(elements);
            });

            this.elements = defer.promise;
        }

        getElements():IPromise<ElementConfig[]> {
            return this.elements;
        }
    }

    angular.module('app.core').service('ElementsConfigService', ElementsConfigService);
}