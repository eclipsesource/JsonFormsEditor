/**
 * Created by pancho111203 on 20/12/15.
 */

module app.toolbox {

    import JsonSchemaService = app.core.jsonschema.JsonSchemaService;
    import MetaSchemaService = app.core.metaschema.MetaSchemaService;
    import GeneralToolboxElement = app.core.GeneralToolboxElement;
    import ControlToolboxElement = app.core.ControlToolboxElement;
    import ToolboxElement = app.core.ToolboxElement;
    import TreeElement = app.core.TreeElement;

    export class ToolboxService {
        static $inject = ['JsonSchemaService', 'MetaSchemaService'];

        public expertElements:GeneralToolboxElement[] = [];
        public schemaElements:ControlToolboxElement[] = [];


        constructor(public jsonSchemaService: JsonSchemaService, public metaSchemaService: MetaSchemaService) {
            this.initializeGeneralElements();
            this.initializeSchemaElements();
        }

        private initializeGeneralElements() {
            var metaSchema:app.core.metaschema.MetaSchema = this.metaSchemaService.getMetaSchema();
            var elementType:string;
            for (var i = 0; i < metaSchema.getDefinitions().length; i++) {
                for (var j = 0; j < metaSchema.getDefinitions()[i].getTypeEnum().length; j++) {
                    elementType = metaSchema.getDefinitions()[i].getTypeEnum()[j];

                    //Ignore control, as it's handled on the controltoolbox
                    if(elementType=='Control'){
                        continue;
                    }
                    var element = new GeneralToolboxElement(elementType, elementType);

                    element.setAcceptedElements(JSON.parse(JSON.stringify(metaSchema.getDefinitions()[i].acceptedElements)));
                    this.expertElements.push(element);
                }
            }
        }

        private initializeSchemaElements() {
            //TODO load when user clicks button and use uploaded file
            this.jsonSchemaService.loadFromJson(demoSchema);

            var schemaProperties:any[] = this.jsonSchemaService.getFields();
            for(var i = 0; i < schemaProperties.length; i++) {
                var element:ControlToolboxElement = new ControlToolboxElement(this.convertScopeToLabel(schemaProperties[i].name),schemaProperties[i].type, schemaProperties[i].name);
                this.schemaElements.push(element);

            }


        }

        private convertScopeToLabel(scope:string):string {

            var sc = scope.split('/').pop();

            return sc
            // insert a space before all caps
                .replace(/([A-Z])/g, ' $1')
                // uppercase the first character
                .replace(/^./, function(str){ return str.toUpperCase(); })
        }

        public getExpertElementOfType(type: string): GeneralToolboxElement {
            var element: GeneralToolboxElement;
            for (var i = 0; i < this.expertElements.length; i++) {

                element = this.expertElements[i];
                if(element.getType() == type) {
                    return element;
                }
            }
            return null;
        }

        public getSchemaElementWithScope(scope: string): ControlToolboxElement {
            var element: ControlToolboxElement;
            for (var i = 0; i < this.schemaElements.length; i++) {

                element = this.schemaElements[i];
                if(element.getScope() == scope) {
                    return element;
                }
            }
            return null;
        }

        //used for retrieving the data element associated with this treeelement
        //if its a layout, it only uses the type to get it
        //if its a control, it uses the scope value
        public getAssociatedToolboxElement(treeElement:TreeElement): ToolboxElement{
            if(treeElement.getType()!='Control'){
                //Layouts
                return this.getExpertElementOfType(treeElement.getType());
            } else {
                //Controls
                return this.getSchemaElementWithScope(treeElement.getScope());

            }
        }
    }
    angular.module('app.toolbox').service('ToolboxService', ToolboxService);
}

var demoSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 3
        },
        "age": {
            "type": "integer"
        },
        "gender": {
            "type": "string",
            "enum": ["Male", "Female"]
        },
        "height": {
            "type": "number"
        }
    }
};
