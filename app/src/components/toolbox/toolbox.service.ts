/**
 * Created by pancho111203 on 20/12/15.
 */

module app.toolbox {

    // TODO validation so that there cannot be 2 schema elements with the same name in the same path of the toolbox(nor in dataschema)
    import JsonSchemaService = app.core.jsonschema.JsonSchemaService;
    import MetaSchemaService = app.core.metaschema.MetaSchemaService;
    import GeneralToolboxElement = app.core.model.GeneralToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import TreeElement = app.core.model.TreeElement;

    export class ToolboxService {
        static $inject = ['JsonSchemaService', 'MetaSchemaService'];

        public expertElements:GeneralToolboxElement[] = [];
        public schemaElements:ControlToolboxElement[] = [];


        constructor(public jsonSchemaService:JsonSchemaService, public metaSchemaService:MetaSchemaService) {
            this.initializeGeneralElements();
            this.loadSchemaElements(demoSchema);
        }

        private initializeGeneralElements() {
            var metaSchema:app.core.metaschema.MetaSchema = this.metaSchemaService.getMetaSchema();
            var elementType:string;
            for (var i = 0; i < metaSchema.getDefinitions().length; i++) {
                for (var j = 0; j < metaSchema.getDefinitions()[i].getTypeEnum().length; j++) {
                    elementType = metaSchema.getDefinitions()[i].getTypeEnum()[j];

                    //Ignore control, as it's handled on the controltoolbox
                    if (elementType == 'Control') {
                        continue;
                    }
                    var element = new GeneralToolboxElement(elementType, elementType);

                    element.setAcceptedElements(JSON.parse(JSON.stringify(metaSchema.getDefinitions()[i].acceptedElements)));
                    this.expertElements.push(element);
                }
            }
        }

        private loadSchemaElements(jsonWithDataSchema:any) {
            this.jsonSchemaService.loadFromJson(jsonWithDataSchema);

            var schemaProperties:any[] = this.jsonSchemaService.getFields();
            for (var i = 0; i < schemaProperties.length; i++) {
                var element:ControlToolboxElement = new ControlToolboxElement(this.convertScopeToLabel(schemaProperties[i].name), schemaProperties[i].type, schemaProperties[i].name);
                this.schemaElements.push(element);

            }


        }

        //adds new data element into schema and into toolbox
        //returns if the addition was successful
        //PARAMETERS: content has to be an object containing the property 'type'
        public addSchemaElement(scope:string, content:any):boolean {
            if (this.jsonSchemaService.getNames().indexOf(scope) != -1) {
                console.log('ERROR: Trying to add a duplicated schema element');
                return false;
            }

            var bundle = this.convertScopeToPathAndName(scope);
            var name = bundle.name;
            var path = bundle.path;


            //Schema elements always need a type property
            if (!content.hasOwnProperty('type')) {
                return false;
            }
            //if the addition works on the schema, the element gets added into the toolbox array
            if (this.jsonSchemaService.addNewProperty(name, content, path)) {

                var element:ControlToolboxElement = new ControlToolboxElement(this.convertScopeToLabel(scope), content.type, scope);
                this.schemaElements.push(element);
                return true;
            }
            return false;
        }


        public removeSchemaElement(scope:string):boolean {
            var bundle = this.convertScopeToPathAndName(scope);
            var name = bundle.name;
            var path = bundle.path;
            if (this.jsonSchemaService.removeProperty(name, path)) {

                for (var i = 0; i < this.schemaElements.length; i++) {
                    if (this.schemaElements[i].getScope() == scope) {

                        this.schemaElements.splice(i, 1);
                        return true;
                    }
                }

            } else {
                return false;
            }

            console.log('ERROR: schema element was removed on the Json Schema, but it could not be found in the toolbox!');
            return true;

        }


        private convertScopeToPathAndName(scope:string):any {
            var path:string[] = scope.split('/');
            var name = path[path.length - 1];

            path.splice(path.length - 1, 1);

            return {
                name: name,
                path: path
            }
        }

        private convertPathAndNameToScope(name:string, path:string[]):string {
            var res = '';
            res += path.join('/');
            if (res != '') {
                res += '/';
            }
            res += name;
            return res;
        }

        private convertScopeToLabel(scope:string):string {
            var sc = scope.split('/').pop();

            return sc
            // insert a space before all caps
                .replace(/([A-Z])/g, ' $1')
                // uppercase the first character
                .replace(/^./, function (str) {
                    return str.toUpperCase();
                })
        }

        public getExpertElementOfType(type:string):GeneralToolboxElement {
            var element:GeneralToolboxElement;
            for (var i = 0; i < this.expertElements.length; i++) {

                element = this.expertElements[i];
                if (element.getType() == type) {
                    return element;
                }
            }
            return null;
        }

        public getSchemaElementWithScope(scope:string):ControlToolboxElement {
            var element:ControlToolboxElement;
            for (var i = 0; i < this.schemaElements.length; i++) {

                element = this.schemaElements[i];
                if (element.getScope() == scope) {
                    return element;
                }
            }
            return null;
        }

        //used for retrieving the data element associated with this treeelement
        //if its a layout, it only uses the type to get it
        //if its a control, it uses the scope value
        public getAssociatedToolboxElement(treeElement:TreeElement):ToolboxElement {
            if (treeElement.getType() != 'Control') {
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
