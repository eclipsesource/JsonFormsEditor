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
            if (json.hasOwnProperty('properties')) {
                this.json = json;
            }
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

            var requiredProperties = parent['required'];
            _.forEach(parent.properties, (property:any, name:string) => {
                result.push(new ControlToolboxElement(name, property.type, this.generateScope(name, path), this.isPropertyRequired(requiredProperties, name)));
            });


            return result;
        }

        private isPropertyRequired(requiredProperties: string[], propertyName: string) {
            if (!requiredProperties) {
                return false;
            }
            return requiredProperties.indexOf(propertyName) >= 0;
        }

        generateScope(name: string, path: string[]) : string{
            var scope = '';
            if(path.length<=0){
                scope = name;
            }else {
                scope = path.join('/properties/') + '/properties/' + name;
            }

            return scope;

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

        getPropertiesNames():string[] {
            var propertiesNames = [];

            _.forOwn(this.json['properties'], (value, key) => {
                DataschemaService.retrievePropertiesNames(propertiesNames, key, value);
            });

            return propertiesNames;
        }

        private static retrievePropertiesNames(propertiesNames:string[], name:string, property:{}) {
            if (property['properties']) {
                _.forOwn(property['properties'], (value, key) => {
                    DataschemaService.retrievePropertiesNames(propertiesNames, name + "/properties/" + key, value);
                });
            } else {
                propertiesNames.push(name);
            }
        }

        /**
         * Adds a new Property to the data-schema.
         *
         * @param property The property to add. If the name of the property already exists it gets updated.
         * @param path path is an array of string containing the name of the parent properties in order eg. : ['person', 'appearance', 'head']
         * @returns {boolean} indicating if the addition was succesful(when false, it means the element was not added)
         */
        addNewProperty(name: string, type: string, config: any, path:string[]):boolean {
            config = config || {};
            var property: any = {};
            property.type = type;

            if (!(name&&type)) {
                console.log('ERROR: name or type undefined');
                return false;
            }
            var parent = this.getFolderAt(path);

            if (!parent || !parent.hasOwnProperty('properties')) {
                console.log('ERROR: the path accessed is not a folder');
                return false;
            }

            // Check if there is a property with same name already
            if (parent.properties.hasOwnProperty(name)) {
                console.log('ERROR: a property with the same name exists already in the current folder');
                return false;
            }
            //Initialize properties object if its a folder
            if (type == 'object') {
                property.properties = {};
            }

            if (config['required'] === true) {
                this.addPropertyToRequired(name, parent);
            }

            if (config['format']){
                property['format'] = config['format'];
            }

            if (config['allowsEnum'] && config['enum'].length > 0) {
                property['enum'] = config['enum'];
            }

            parent.properties[name] = property;
            this.notifyObservers(new PreviewUpdateEvent(this.getDataSchema(), null));
            return true;
        }


        addPropertyToRequired(name: string, parent: any){

            if(!parent['required']){
                parent.required = [];
            }
            if(!~parent.required.indexOf(name)){
                parent.required.push(name);
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

