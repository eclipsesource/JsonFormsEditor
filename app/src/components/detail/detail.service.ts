module app.detail {

    import Metaschema = app.core.metaschema.Metaschema;
    import TreeElement = app.core.model.TreeElement;
    import MetaschemaService = app.core.metaschema.MetaschemaService;
    import DataschemaService = app.core.dataschema.DataschemaService;

    export class DetailService {

        public currentElement:TreeElement;
        public schema:any;
        public uiSchema:any;

        static $inject = ['MetaschemaService', 'DataschemaService'];

        constructor(private metaschemaService:MetaschemaService, private dataschemaService:DataschemaService) {

        }

        setElement(element:TreeElement):void {
            this.metaschemaService.getMetaschema().then((metaschema:Metaschema) => {
                this.schema = metaschema.getDefinitionByTypeLabel(element.getType()).getDataschema();
                if (this.schema['properties']['rule']) {
                    this.schema['properties']['rule']['properties']['condition']['properties']['scope']['enum'] = [""].concat(this.dataschemaService.getPropertiesNames());
                }
                this.uiSchema = metaschema.getDefinitionByTypeLabel(element.getType()).getUISchema();
                this.currentElement = element;
                /*if (this.currentElement.getType() == 'Control') {
                    this.currentElement.setType(this.currentElement.getLongType());
                }*/

            });
        }
    }

    angular.module('app.detail').service('DetailService', DetailService);
}