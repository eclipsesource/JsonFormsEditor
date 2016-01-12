/// <reference path="../../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../model/toolboxElementControl.ts" />

module app.core.dataschema {

    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;

    export class DataschemaService extends Observable<PreviewUpdateEvent> {
        private json:any = {};

        /**
         * Initializes the dataschema from JSON.
         * @param json a dataschema json structure.
         */
        loadFromJson(json:any) {
            this.json = json;
        }

        /**
         * Converts all properties of the current foldeer into control elements
         * @param path - an array of strings indicating the position in the folder hierarchy
         * @returns {ControlToolboxElement[]}
         */
        convertPropertiesToControls(path?: string[]): ControlToolboxElement[] {


            if(path == null || path == undefined){
                path = [];
            }

            var result: ControlToolboxElement[] = [];

            var parent: any = this.getFolderAt(path);

            if(!parent.hasOwnProperty('properties')){
                return [];
            }

            parent = parent.properties;


            _.forEach(parent, (property:any, name:string) => {

                result.push(new ControlToolboxElement(this.convertScopeToLabel(name), property.type, name));
            });


            return result;
        }

        private convertScopeToLabel(scope:string):string {
            var name = scope.split('/').pop();

            return _.startCase(name);
        }


        /**
         * Returns the dataschema as JSON-object structure.
         * @returns {any}
         */
        getDataSchema():any {
            return this.json;
        }

        /**
         * Adds a new Property to the data-schema.
         *
         * @param property The property to add. If the name of the property already exists it gets updated.
         * @param path path is an array of string containing the name of the parent properties in order eg. : ['person', 'appearance', 'head']
         * @returns {boolean} indicating if the addition was succesful(when false, it means the element was not added)
         */
        addNewProperty(label: string, type: string, path:string[]):boolean {
            var property: any = {};
            property.type = type;

            if (!(label&&type)) {
                console.log('ERROR: label or type undefined');
                return false;
            }
            var parent = this.getFolderAt(path);

            if(parent === null || !parent.hasOwnProperty('properties')){
                console.log('ERROR: the path accessed is not a folder');
                return false;
            }
            parent = parent.properties;

            // Check if there is a property with same name already
            if(parent.hasOwnProperty(label)){
                console.log('ERROR: a property with the same name exists already in the current folder');
                return false;
            }
            //Initialize properties object if its a folder
            if(type == 'folder'){
                property.properties = {};
            }

            parent[label] = property;
            console.log(this.getDataSchema());
            this.notifyObservers(new PreviewUpdateEvent(this.getDataSchema(), null));
            return true;
        }

        /**
         * Removes a Property from the data-schema.
         *
         * @param name the name of the property.
         * @param path path is an array of string containing the name of the parent properties in order eg. : ['person', 'appearance', 'head']
         * @returns {boolean} indicating if the removal was succesful(when false, it means the element was not added)
         */
        removeProperty(name:string, path:string[]):boolean {
            var parent = this.getFolderAt(path);

            if (parent === null || !parent.hasOwnProperty('properties') || !parent.properties.hasOwnProperty(name)) {
                return false;
            }

            var res = delete parent.properties[name];
            this.notifyObservers(new PreviewUpdateEvent(this.getDataSchema(), null));

            return res;
        }


        /**
         * Retrieves the folder at the specified path in the data-schema.
         * @param path the path to the folder: e.g. ['person','adress','street']
         * @returns {DataschemaProperty} the property or null, if no property was found at the path
         */
        getFolderAt(path:string[]):any {
            var currentElement = this.json;
            var index = 0;

            if (path.length === 0) {
                return currentElement;
            }

            while (index < path.length) {
                if (currentElement.hasOwnProperty('properties') && currentElement.properties.hasOwnProperty(path[index])) {
                    currentElement = currentElement.properties[path[index]];
                    if(currentElement.type != 'folder'){
                        return null;
                    }
                    index++;
                } else {
                    // path doesnt exist
                    return null;
                }
            }

            return currentElement;
        }


    }

    angular.module("app.core").service("DataschemaService", DataschemaService);
}

