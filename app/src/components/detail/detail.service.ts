module app.detail {

    import Metaschema = app.core.metaschema.Metaschema;
    import TreeElement = app.core.model.TreeElement;
    import MetaschemaService = app.core.metaschema.MetaschemaService;

    export class DetailService {

        public currentElement:TreeElement;
        public schema:any;
        public uiSchema:any;

        static $inject = ["MetaschemaService"];

        constructor(private metaschemaService:MetaschemaService) {

        }

        setElement(element:TreeElement):void {
            this.metaschemaService.getMetaschema().then((metaschema:Metaschema) => {
                this.schema = metaschema.getDefinitionByTypeLabel(element.getType()).getDataschema();
                this.uiSchema = metaschema.getDefinitionByTypeLabel(element.getType()).getUISchema();
                this.currentElement = element;
            });
        }
    }

    angular.module('app.detail').service('DetailService', DetailService);
}