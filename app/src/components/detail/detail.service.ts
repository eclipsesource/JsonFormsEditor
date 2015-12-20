module app.detail {
    export class DetailService {

        public currentElement : any;
        public schema: any;
        public uiSchema: any;

        private metaSchema: app.core.metaschema.MetaSchema;

        static $inject = ["MetaSchemaService"];

        constructor(private metaSchemaService: app.core.metaschema.MetaSchemaService) {
            this.metaSchema = metaSchemaService.getMetaSchema();
        }

        setElement(element: any) : void {
            this.currentElement = element;
            this.metaSchema.reloadData();
            this.schema = this.metaSchema.getDefinition(element.type).schema;
            this.uiSchema = this.metaSchema.getDefinition(element.type).uiSchema;
        }

    }

    angular.module('app.detail').service('DetailService', DetailService);
}