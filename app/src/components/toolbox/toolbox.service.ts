/**
 * Created by pancho111203 on 20/12/15.
 */

module app.toolbox {

    // TODO validation so that there cannot be 2 schema elements with the same name in the same path of the toolbox(nor in dataschema)
    import DataschemaService = app.core.dataschema.DataschemaService;
    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import DataschemaProperty = app.core.dataschema.DataschemaProperty;
    import Metaschema = app.core.metaschema.Metaschema;
    import Definition = app.core.metaschema.Definition;
    import MetaschemaService = app.core.metaschema.MetaschemaService;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;
    import ElementsConfigService = app.core.elementsConfig.ElementsConfigService;
    import ElementConfig = app.core.elementsConfig.ElementConfig;

    export class ToolboxService {
        static $inject = ['DataschemaService', 'MetaschemaService', '$q', 'ElementsConfigService'];

        public expertElements:LayoutToolboxElement[] = [];
        public schemaElements:ControlToolboxElement[] = [];


        constructor(public dataschemaService:DataschemaService, private metaschemaService:MetaschemaService, private $q:IQService, private elementsConfigService:ElementsConfigService) {
            this.getGeneralElements().then((elements:LayoutToolboxElement[]) => {
                this.expertElements = elements;
            });
            this.loadSchemaElements(demoSchema);
        }

        private getGeneralElements():IPromise<LayoutToolboxElement[]> {
            var defer:IDeferred<LayoutToolboxElement[]> = this.$q.defer();

            this.metaschemaService.getMetaschema().then((schema:Metaschema) => {
                this.elementsConfigService.getElements().then((elements:ElementConfig[]) => {
                    var result:LayoutToolboxElement[] = [];

                    _.forEach(schema.getDefinitions(), (definition:Definition) => {
                        _.forEach(definition.getTypeLabels(), (type:string)=> {
                            //Ignore control, as it's handled on the controltoolbox
                            if (type === 'Control') {
                                return;
                            }
                            var element = new LayoutToolboxElement(type, type, _.find(elements, {typeLabel: type}));

                            element.setAcceptedElements(definition.getAcceptedElements());
                            result.push(element);
                        });
                    });

                    defer.resolve(result);
                });
            });
            return defer.promise;
        }

        private loadSchemaElements(jsonWithDataSchema:any) {
            this.dataschemaService.loadFromJson(jsonWithDataSchema);

            var schemaProperties:DataschemaProperty[] = this.dataschemaService.getProperties();
            for (var i = 0; i < schemaProperties.length; i++) {
                var element:ControlToolboxElement = new ControlToolboxElement(this.convertScopeToLabel(schemaProperties[i].getName()), schemaProperties[i].getType(), schemaProperties[i].getName());
                this.schemaElements.push(element);
            }

            console.log(this.schemaElements);
        }

        //adds new data element into schema and into toolbox
        //returns if the addition was successful
        //PARAMETERS: content has to be an object containing the property 'type'
        public addSchemaElement(scope: string, content: any): boolean {

            if(scope == ''){
                return false;
            }

            if(this.dataschemaService.getNames().indexOf(scope)!=-1){
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
            if (this.dataschemaService.addNewProperty(new DataschemaProperty(name, content.type), path)) {

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
            console.log("Scope " + scope);

            var sc = scope.split('/').pop();

            return sc
            // insert a space before all caps
                .replace(/([A-Z])/g, ' $1')
                // uppercase the first character
                .replace(/^./, function (str) {
                    return str.toUpperCase();
                })
        }

        public getExpertElementOfType(type:string):IPromise<LayoutToolboxElement> {
            var deffered:IDeferred<LayoutToolboxElement> = this.$q.defer();

            this.getGeneralElements().then((elements:LayoutToolboxElement[]) => {
                deffered.resolve(_.find(this.expertElements, (element:LayoutToolboxElement) => {
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
            var deffered:IDeferred<LayoutToolboxElement> = this.$q.defer();

            if (treeElement.getType() != 'Control') {
                //Layouts
                this.getExpertElementOfType(treeElement.getType()).then((element:LayoutToolboxElement)=> {
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
