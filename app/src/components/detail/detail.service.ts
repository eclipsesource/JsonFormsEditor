module app.detail {

    import Metaschema = app.core.metaschema.Metaschema;
    import TreeElement = app.core.model.TreeElement;
    import MetaschemaService = app.core.metaschema.MetaschemaService;
    import DataschemaService = app.core.dataschema.DataschemaService;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    export class DetailService {

        public currentElement:TreeElement;
        public schema:any;
        public uiSchema:any;

        static $inject = ['MetaschemaService', 'DataschemaService', '$q'];

        constructor(private metaschemaService:MetaschemaService, private dataschemaService:DataschemaService, private $q:IQService) {

        }

        setElement(element:TreeElement):IPromise<boolean> {
            this.currentElement = element;

            var deferred = this.$q.defer();
            this.metaschemaService.getMetaschema().then((metaschema:Metaschema) => {
                if (element) {
                    this.schema = metaschema.getDefinitionByTypeLabel(element.getType()).getDataschema();
                    if (this.schema['properties']['rule']) {
                        this.schema['properties']['rule']['properties']['condition']['properties']['scope']['enum'] = [""].concat(this.dataschemaService.getPropertiesNames());
                    }
                    this.uiSchema = metaschema.getDefinitionByTypeLabel(element.getType()).getUISchema();
                }

                deferred.resolve(true);
            }, (error: any) => {
                deferred.resolve(false);
            });
            return deferred.promise;
        }
    }

    angular.module('app.detail').service('DetailService', DetailService);
}