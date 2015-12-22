module app.detail {

    import MetaSchemaService = app.core.metaschema.MetaSchemaService;
    import MetaSchema = app.core.metaschema.MetaSchema;
    import TreeElement = app.core.model.TreeElement;

    export class DetailService {

        public currentElement : TreeElement;
        public schema: any;
        public uiSchema: any;

        private metaSchema: MetaSchema;

        static $inject = ["MetaSchemaService"];

        constructor(metaSchemaService: MetaSchemaService) {
            this.metaSchema = metaSchemaService.getMetaSchema();
        }

        setElement(element: TreeElement) : void {
            this.currentElement = element;
            this.metaSchema.reloadData();
            this.schema = this.metaSchema.getDefinition(element.getType()).schema;
            this.uiSchema = this.metaSchema.getDefinition(element.getType()).uiSchema;
        }

        reset() : void {
            this.currentElement = null;
        }

    }

    angular.module('app.detail').service('DetailService', DetailService);
}