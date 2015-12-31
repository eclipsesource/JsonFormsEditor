/// <reference path="../../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.core.dataschema {

    export class DataschemaService {
        private properties:DataschemaProperty[] = [];
        private json:any = {};

        /**
         * Initializes the dataschema from JSON.
         * @param json a dataschema json structure.
         */
        loadFromJson(json:any) {
            this.json = json;
            this.properties = this.getPropertiesRecursive(json, '');
        }

        /**
         * Returns all names of all properties.
         * @returns {string[]}
         */
        getNames():string[] {
            return _.map(this.properties, (property:DataschemaProperty) => {
                return property.getName();
            });
        }

        /**
         *  Returns all DataschemaProperties in the dataschema.
          * @returns {DataschemaProperty[]}
         */
        getProperties():DataschemaProperty[] {
            return this.properties;
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
        addNewProperty(property:DataschemaProperty, path:string[]):boolean {
            if (!property.isValid()) {
                return false;
            }
            var parent = this.getPropertyAt(path);
            if (parent === null) {
                return false;
            }

            parent[property.getName()] = property;
            this.properties.push(property);
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
            var parent = this.getPropertyAt(path);

            if (parent === null || !parent.hasOwnProperty(name)) {
                return false;
            }

            return delete parent[name];
        }

        /**
         * From a json object, returns all the property names inside it recursively and by adding a prefix with its location
         */
        private getPropertiesRecursive(json:any, prefix:string):DataschemaProperty[] {
            var result:DataschemaProperty[] = [];

            if (json.hasOwnProperty('properties')) {
                for (var key in json['properties']) {
                    if (json['properties'].hasOwnProperty(key)) {
                        var name = prefix == '' ? key : prefix + '/' + key;

                        var childProps = this.getPropertiesRecursive(json['properties'][key], name);
                        if (childProps.length > 0) {
                            result = result.concat(childProps);
                        } else {
                            result.push(new DataschemaProperty(name, json['properties'][key].type));
                        }
                    }

                }
            }
            return result;
        }


        /**
         * Retrieves the property at the specified path in the data-schema.
         * @param path the path to the property: e.g. ['person','adress','street']
         * @returns {DataschemaProperty} the property or null, if no property was found at the path
         */
        private getPropertyAt(path:string[]):DataschemaProperty {
            var currentElement = this.json;
            var index = 0;

            if (path.length === 0) {
                return currentElement.properties
            }

            while (index < path.length) {
                if (currentElement.hasOwnProperty('properties') && currentElement.properties.hasOwnProperty(path[index])) {
                    currentElement = currentElement.properties[path[index]];
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

