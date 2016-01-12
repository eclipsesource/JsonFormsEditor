module app.core.metaschema {

    import IHttpPromise = angular.IHttpPromise;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;
    import DataschemaService = app.core.dataschema.DataschemaService;

    export class MetaschemaService {

        static $inject = ['$http', '$q'];

        private metaschema:IPromise<Metaschema>;

        constructor($http:ng.IHttpService, $q:IQService) {
            var deffered:IDeferred<Metaschema> = $q.defer();

            $http.get('resource/metaschema.json').success((json:any):void => {
                deffered.resolve(Metaschema.fromJSON(json));
            });

            this.metaschema = deffered.promise;
        }

        /**
         * Gets a promise of the Metaschema.
         *
         * @returns {IPromise<Metaschema>}
         */
        getMetaschema():IPromise<Metaschema> {
            return this.metaschema;
        }

    }

    angular.module('app.core').service('MetaschemaService', MetaschemaService);
}
