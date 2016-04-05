/// <reference path="../../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../model/toolboxElementControl.ts" />

module app.core.dataschema {

    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;

    export class DataschemaService extends Observable<PreviewUpdateEvent> {

        private json:any = {
            "type": "object",
            "properties": {}
        };

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
        convertPropertiesToControls(path: string[] = []): ControlToolboxElement[] {


            var result: ControlToolboxElement[] = [];

            var parent: any = this.getFolderAt(path);

            if(!parent.hasOwnProperty('properties')){
                return [];
            }

            parent = parent.properties;


            _.forEach(parent, (property:any, name:string) => {
                result.push(new ControlToolboxElement(this.convertNameToLabel(name), property.type, this.generateScope(name, path)));
            });


            return result;
        }

        generateScope(label: string, path: string[]) : string{
            var scope = '';
            if(path.length<=0){
                scope = label;
            }else {
                scope = path.join('/properties/') + '/properties/' + label;
            }

            return scope;

        }

        convertNameToLabel(name:string):string {


            return _.startCase(name);
        }


        /**
         * Returns the dataschema as JSON-object structure.
         * @returns {any}
         */
        getDataSchema():any {
            return this.json;
        }

        exportDataSchemaAsString():string {
            return JSON.stringify(this.json, (key, value) => {return value;}, 2);
        }

        /**
         * Adds a new Property to the data-schema.
         *
         * @param property The property to add. If the name of the property already exists it gets updated.
         * @param path path is an array of string containing the name of the parent properties in order eg. : ['person', 'appearance', 'head']
         * @returns {boolean} indicating if the addition was succesful(when false, it means the element was not added)
         */
        addNewProperty(label: string, type: string, config: any, path:string[]):boolean {

            var property: any = {};
            property.type = type;

            if (!(label&&type)) {
                console.log('ERROR: label or type undefined');
                return false;
            }
            var parent = this.getFolderAt(path);

            if(!parent || !parent.hasOwnProperty('properties')){
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
            if(type == 'object'){
                property.properties = {};
            }

            if(config['required'] === true){
                this.addPropertyToRequired(label, parent);
            }

            if(config['hasEnum']===true){
                property['enum'] = config['enum'];
            }

            parent[label] = property;
            this.notifyObservers(new PreviewUpdateEvent(this.getDataSchema(), null));
            return true;
        }


        addPropertyToRequired(label: string, parent: any){

            if(!parent['required']){
                parent.required = [];
            }
            if(!~parent.required.indexOf(label)){
                parent.required.push(label);
            }
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

            if (parent === null || !parent.hasOwnProperty('properties') || !parent.properties.hasOwnProperty(this.getElementNameFromScope(name))) {
                return false;
            }

            var res = delete parent.properties[name];
            this.notifyObservers(new PreviewUpdateEvent(this.getDataSchema(), null));

            return res;
        }


        getElementNameFromScope(scope: string): string {
            return scope.split('/').pop();
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
                    if(currentElement.type != 'object'){
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

        /*getPropertyFromScope(scope:string):any {
            var path:string[] = this.convertScopeToPath(scope);
            return this.getPropertyAt(path);
        }

        convertScopeToPath(scope:string):string[] {
            return scope.split('/properties/');
        }

        getPropertyAt(path:string[]):any {
            var currentElement = this.json;

            for (var i = 0; i < path.length; i++) {
                if (currentElement.hasOwnProperty('properties') && currentElement.properties.hasOwnProperty(path[i])) {
                    currentElement = currentElement.properties[path[i]];
                } else {
                    return null;
                }
            }

            return currentElement;
        }*/
    }

    angular.module("app.core").service("DataschemaService", DataschemaService);
}

