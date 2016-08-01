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
    import ToolboxServiceMemento = app.core.undo.ToolboxServiceMemento;



    export class ToolboxService implements Originator<ToolboxServiceMemento> {
        static $inject = ['DataschemaService', '$q', 'LayoutsService'];

        public elements:ControlToolboxElement[] = [];
        public currentPath:string[] = [];

        private placedTimes:any = {};

        constructor(public dataschemaService:DataschemaService, private $q:IQService, private layoutsService:LayoutsService) {
        }

        addSchemaElement(name: string, type: string, config: any): boolean {
            if (this.dataschemaService.addNewProperty(name, type, config, this.currentPath)) {
                var element:ControlToolboxElement = new ControlToolboxElement(name, type, this.generateScope(name, this.currentPath), config['required'] == true);
                this.elements.push(element);
                return true;
            } else {
                return false;
            }
        }

        generateScope(name:string, path:string[]):string {
            var scope = '';
            if (path.length <= 0) {
                scope = name;
            } else {
                scope = path.join('/properties/') + '/properties/' + name;
            }

            return scope;

        }

        accessFolder(folderName:string) {

            this.currentPath.push(folderName);

            //If folder exists
            if (this.dataschemaService.getFolderAt(this.currentPath)) {
                this.loadSchemaElements();
            } else {
                this.currentPath.pop();
            }

        }

        previousFolder() {
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

            if (this.canBeRemoved(element) && this.dataschemaService.removeProperty(name, path)) {
                return _.remove(this.elements, element).length === 1;
            } else {
                return false;
            }
        }

        decreasePlacedTimes(scope:string) {
            var splitted = scope.split('/');
            if(splitted.length > 1){
                splitted.pop();
                // The second pop is to remove the properties subfolder from the scope string
                splitted.pop();

                this.decreasePlacedTimes(splitted.join('/'));
            }
            if (!this.placedTimes.hasOwnProperty( scope)) {
                console.log("ERROR: Placed times of the element is -1")
                this.placedTimes[scope] = -1;
            } else {
                this.placedTimes[scope] = this.placedTimes[scope] - 1;
            }
        }

        increasePlacedTimes(scope:string) {
            var splitted = scope.split('/');
            if(splitted.length > 1){
                splitted.pop();
                // The second pop is to remove the properties subfolder from the scope string
                splitted.pop();
                this.increasePlacedTimes(splitted.join('/'));
            }
            //if the element hasnt been added yet to the placedTimesArray
            if (!this.placedTimes.hasOwnProperty(scope)) {
                this.placedTimes[scope] = 1;
            } else {
                this.placedTimes[scope] = this.placedTimes[scope] + 1;
            }
        }

        canBeRemoved(element:ControlToolboxElement):boolean {
            if(this.placedTimes[element.getScope()] > 0){
                return false;
            }else {
                return true;
            }
        }

        isAlreadyPlaced(element:ControlToolboxElement):boolean {
            if(element.datatype === "object" || this.canBeRemoved(element)){
                return false;
            }
            return true;
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

        /**
         * Used to load a schema into the dataschemaservice(without loading the elements for the toolbar)
         * @param json the json file to load
         */
        loadSchema(json:any) {
            this.dataschemaService.loadFromJson(json);
            this.loadSchemaElements();
        }

        /**
         * Used to load the schema elements for the toolbar from a specified folder (uses currentPath)
         */
        private loadSchemaElements() {
            this.elements = this.dataschemaService.convertPropertiesToControls(this.currentPath);
        }


        public getElementByScope(scope:string):ControlToolboxElement {
            return _.find(this.elements, (element:ControlToolboxElement) => {
                return element.getScope() === scope;
            });
        }

        setMemento(memento:ToolboxServiceMemento) {
            this.elements = memento.getElements();
            this.placedTimes = memento.getPlacedTimes();
        }

        createMemento():ToolboxServiceMemento {
            // we cannot just clone the whole array, since this doesn't preserve the functions on ControlToolboxElement
            var elementsCopy:ControlToolboxElement[] = [];

            _.forEach(this.elements, (element:ControlToolboxElement) => {
                elementsCopy.push(element.clone());
            });

            return new ToolboxServiceMemento(elementsCopy, _.clone(this.placedTimes, true));
        }
    }

    angular.module('app.toolbox').service('ToolboxService', ToolboxService);
}