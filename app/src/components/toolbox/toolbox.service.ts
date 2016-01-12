/**
 * Created by pancho111203 on 20/12/15.
 */

module app.toolbox {

    import DataschemaService = app.core.dataschema.DataschemaService;
    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import Metaschema = app.core.metaschema.Metaschema;
    import Definition = app.core.metaschema.Definition;
    import MetaschemaService = app.core.metaschema.MetaschemaService;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;
    import ElementsConfigService = app.core.elementsConfig.ElementsConfigService;
    import ElementConfig = app.core.elementsConfig.ElementConfig;
    import LayoutsService = app.layouts.LayoutsService;

    export class ToolboxService {
        static $inject = ['DataschemaService', '$q', 'LayoutsService'];

        public elements:ControlToolboxElement[] = [];
        public currentPath: string[] = [];

        constructor(public dataschemaService:DataschemaService, private $q:IQService, private layoutsService:LayoutsService) {
            this.loadSchema(demoSchema);
            this.loadSchemaElements();
        }

        /**
         * Adds a new DataschemaProperty into the dataschema and adds the corresponding ToolboxElement.
         * @param property the DataschemaProperty to add
         * @param path the path to the property in the dataschema, e.g. ['person', 'adress']
         * @returns {boolean} true, if the addition was successful
         */
        addSchemaElement(label: string, type: string):boolean {

            if (this.dataschemaService.addNewProperty(label, type, this.currentPath)) {
                var element:ControlToolboxElement = new ControlToolboxElement(label, type, label);
                this.elements.push(element);
                return true;
            } else {
                return false;
            }
        }

        accessFolder(folderName: string){


            this.currentPath.push(folderName);

            //If folder exists
            if(this.dataschemaService.getFolderAt(this.currentPath)){
                this.loadSchemaElements();
            }else{
                this.currentPath.pop();
            }

        }

        previousFolder(){
            this.currentPath.pop();
            this.loadSchemaElements();
        }

        /**
         * Removes the ControlToolboxElement from the Dataschema.
         *
         * @param element the element to be removed.
         * @returns {boolean} returns true, if the element was successfully removed
         */
        removeSchemaElement(element:ControlToolboxElement):boolean {

            var name = element.getScope();
            var path = this.currentPath;
            
            if (this.dataschemaService.removeProperty(name, path)) {
                return _.remove(this.elements, element).length === 1;
            } else {
                return false;
            }
        }

        /**
         * Used for retrieving the data element associated with the given TreeElement.
         * @param treeElement
         * @returns {IPromise<ToolboxElement>}
         */
        getAssociatedToolboxElement(treeElement:TreeElement):IPromise<ToolboxElement> {
            var deffered:IDeferred<LayoutToolboxElement> = this.$q.defer();

            if (treeElement.getType() != 'Control') {
                //Layouts
                this.layoutsService.getElementByType(treeElement.getType()).then((element:LayoutToolboxElement)=> {
                    deffered.resolve(element);
                });
            } else {
                //Controls
                deffered.resolve(this.getElementByScope(treeElement.getScope()));
            }

            return deffered.promise;
        }

        /*
        * Used to load a schema into the dataschemaservice(without loading the elements for the toolbar)
        * @param json the json file to load
        */
        private loadSchema(json: any){
            this.dataschemaService.loadFromJson(json);
        }


        /*
        * Used to load the schema elements for the toolbar from a specified folder (uses currentPath)
        *
        * */
        private loadSchemaElements() {
            this.elements = this.dataschemaService.convertPropertiesToControls(this.currentPath);
        }


        private getElementByScope(scope:string):ControlToolboxElement {
            return _.find(this.elements, (element:ControlToolboxElement) => {
                return element.getScope() === scope;
            });
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
        },
        "father": {
            "type": "folder",
            "properties": {
                "age": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                }
            }
        }
    }
};
