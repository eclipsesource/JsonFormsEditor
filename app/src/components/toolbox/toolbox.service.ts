/**
 * Created by pancho111203 on 20/12/15.
 */

module app.toolbox {

    // TODO validation so that there cannot be 2 schema elements with the same name in the same path of the toolbox(nor in dataschema)
    import DataschemaService = app.core.dataschema.DataschemaService;
    import GeneralToolboxElement = app.core.model.GeneralToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import JsonschemaProperty = app.core.dataschema.DataschemaProperty;
    import MetaSchema = app.core.metaschema.MetaSchema;
    import Definition = app.core.metaschema.Definition;
    import MetaSchemaService = app.core.metaschema.MetaSchemaService;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;

    export class ToolboxService {
        static $inject = ['DataschemaService', 'MetaSchemaService', '$q'];

        public expertElements:GeneralToolboxElement[] = [];
        public schemaElements:ControlToolboxElement[] = [];


        constructor(public dataschemaService:DataschemaService, private metaschemaService:MetaSchemaService, private $q:IQService) {
            this.getGeneralElements().then((elements:GeneralToolboxElement[]) => {
                this.expertElements = elements;
            });
            this.loadSchemaElements(demoSchema);
        }

        private getGeneralElements():IPromise<GeneralToolboxElement[]> {
            var defer:IDeferred<GeneralToolboxElement[]> = this.$q.defer();

            this.metaschemaService.getMetaSchema().then((schema:MetaSchema) => {
                var result:GeneralToolboxElement[] = [];

                _.forEach(schema.getDefinitions(), (definition:Definition) => {
                    _.forEach(definition.getTypeEnum(), (type:string)=> {
                        //Ignore control, as it's handled on the controltoolbox
                        if (type === 'Control') {
                            return;
                        }
                        var element = new GeneralToolboxElement(type, type);

                        element.setAcceptedElements(definition.getAcceptedElements());
                        result.push(element);
                    });
                });

                defer.resolve(result);
            });
            return defer.promise;
        }


        private loadSchemaElements(jsonWithDataSchema:any) {
            this.dataschemaService.loadFromJson(jsonWithDataSchema);

            var schemaProperties:JsonschemaProperty[] = this.dataschemaService.getProperties();
            for (var i = 0; i < schemaProperties.length; i++) {
                var element:ControlToolboxElement = new ControlToolboxElement(this.convertScopeToLabel(schemaProperties[i].getName()), schemaProperties[i].getType(), schemaProperties[i].getName());
                this.schemaElements.push(element);

            }
        }

        //adds new data element into schema and into toolbox
        //returns if the addition was successful
        //PARAMETERS: content has to be an object containing the property 'type'
        public addSchemaElement(scope:string, content:any):boolean {
            if (this.dataschemaService.getNames().indexOf(scope) != -1) {
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
            if (this.dataschemaService.addNewProperty(new JsonschemaProperty(name, content.type), path)) {

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
            if (this.dataschemaService.removeProperty(name, path)) {

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

        public getExpertElementOfType(type:string):IPromise<GeneralToolboxElement> {
            var deffered:IDeferred<GeneralToolboxElement> = this.$q.defer();

            this.getGeneralElements().then((elements:GeneralToolboxElement[]) => {
                deffered.resolve(_.find(this.expertElements, (element:GeneralToolboxElement) => {
                    return element.getType() === type;
                }));
            });

            return deffered.promise;
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
        public getAssociatedToolboxElement(treeElement:TreeElement):IPromise<ToolboxElement> {
            var deffered:IDeferred<GeneralToolboxElement> = this.$q.defer();

            if (treeElement.getType() != 'Control') {
                //Layouts
                this.getExpertElementOfType(treeElement.getType()).then((element:GeneralToolboxElement)=> {
                    deffered.resolve(element);
                });
            } else {
                //Controls
                deffered.resolve(this.getSchemaElementWithScope(treeElement.getScope()));
            }

            return deffered.promise;
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
