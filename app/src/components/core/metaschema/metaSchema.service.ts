module app.core.metaschema {

    import IHttpPromise = angular.IHttpPromise;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;

    export class MetaSchemaService {

        static $inject = ['$http', '$q'];

        private metaSchema:IPromise<MetaSchema>;

        constructor($http:ng.IHttpService, $q:IQService) {
            var deffered:IDeferred<MetaSchema> = $q.defer();

            $http.get('/resource/metaschema.json').success((json:any):void => {
                deffered.resolve(MetaSchema.fromJSON(json));
            });

            this.metaSchema = deffered.promise;
        }

        /**
         * Gets a promise of the Metaschema.
         *
         * @returns {IPromise<MetaSchema>}
         */
        getMetaSchema():IPromise<MetaSchema> {
            return this.metaSchema;
        }

    }

    angular.module('app.core').service('MetaSchemaService', MetaSchemaService);
}
