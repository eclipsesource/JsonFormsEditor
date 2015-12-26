module app.detail {

    import MetaSchema = app.core.metaschema.MetaSchema;
    import TreeElement = app.core.model.TreeElement;
    import MetaSchemaService = app.core.metaschema.MetaSchemaService;

    export class DetailService {

        public currentElement : TreeElement;
        public schema: any;
        public uiSchema: any;

        static $inject = ["MetaSchemaService"];

        constructor(private metaschemaService: MetaSchemaService) {

        }

        setElement(element: TreeElement) : void {
            this.metaschemaService.getMetaSchema().then((metaschema:MetaSchema) => {
                this.schema = metaschema.getDefinitionFromLabel(element.getType()).getDataschema();
                this.uiSchema = metaschema.getDefinitionFromLabel(element.getType()).getUISchema();
                this.currentElement = element;
            });
        }

        reset() : void {
            this.currentElement = null;
        }

    }

    angular.module('app.detail').service('DetailService', DetailService);
}