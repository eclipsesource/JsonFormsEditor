module app.core.metaschema {

    export class Metaschema {

        constructor(private definitions:Definition[] = []) {

        }

        /**
         * Factory-Method to create a Metaschema from a json-object.
         *
         * @param json the json structure to create the metaschema from
         *
         * @returns {app.core.metaschema.Metaschema}
         */
        static fromJSON(json:any):Metaschema {
            var definitions:Definition[] = [];

            // array contains all names of the elements in the root scope of the json, so they can be referenced by '#'.
            var rootElements:string[] = [];

            if (json.hasOwnProperty('definitions')) {
                _.forOwn(json['definitions'], (value:{}, name:string) => {
                    // we are only looking at object definitions (e.g. 'label' gets sorted out)
                    if (value.hasOwnProperty('type')) {
                        if (value['type'] === 'object') {
                            var definition:Definition = new Definition(name, Metaschema.cleanupDataschema(value), Metaschema.retrieveAcceptedElements(value, rootElements));

                            // now continue with all child elements that the current element can accept
                            _.forEach(Metaschema.retrieveChildElements(value, rootElements), (child:Definition) => {
                                definitions.push(child);
                            });

                            // add everything to the result
                            definitions.push(definition);
                            _.forEach(definition.getTypeLabels(), (type:string) => {
                                if (rootElements.indexOf(type) === -1) {
                                    rootElements.push(type);
                                }
                            });
                        }
                    }
                });
            }
            return new Metaschema(definitions);
        }

        private static retrieveAcceptedElements(value:{}, rootElements:string[]):string[] {
            var result:string[] = [];
            if (value.hasOwnProperty('properties') && value['properties'].hasOwnProperty('elements') && value['properties']['elements'].hasOwnProperty('items')) {
                var items = value['properties']['elements']['items'];

                if (items.hasOwnProperty('$ref') && items['$ref'] === '#') {
                    result = rootElements;
                } else {
                    // a new object is declared, so get its label
                    if (items.hasOwnProperty('properties') && items['properties'].hasOwnProperty('type') && items['properties']['type'].hasOwnProperty('enum')) {
                        result = items['properties']['type']['enum'];
                    }
                }
            }

            return result;
        }

        private static retrieveChildElements(schema:{}, rootElements:string[]):Definition[] {
            var result:Definition[] = [];

            if (schema.hasOwnProperty('properties') && schema['properties'].hasOwnProperty('elements')) {
                var elements = schema['properties']['elements'];

                if (elements.hasOwnProperty('type') && elements['type'] === 'array' && elements.hasOwnProperty('items')) {
                    var items = elements['items'];
                    if (items.hasOwnProperty('type')) {
                        if (items['type'] === 'array') {
                            if (!items.hasOwnProperty('$ref')) {
                                // a new object is introduced, otherwise $ref would be used

                            }
                        } else if (items['type'] === 'object') {
                            // we are sure that there is a new object introduced here
                            if (items.hasOwnProperty('properties') && items['properties'].hasOwnProperty('type')) {
                                if (items['properties']['type'].hasOwnProperty('enum')) {
                                    _.forEach(items['properties']['type']['enum'], (name:string) => {
                                        result.push(new Definition(name.toLowerCase(), Metaschema.cleanupDataschema(items), Metaschema.retrieveAcceptedElements(items, rootElements)));
                                    });
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }

        private static cleanupDataschema(dataschema:{}):{} {
            var result = {};

            if (dataschema.hasOwnProperty('properties')) {
                result['properties'] = _.omit(dataschema['properties'], ['elements']);

                if (dataschema['properties'].hasOwnProperty('scope')) {
                    result['properties']['scope'] = {'type': 'string'};
                }

                if (dataschema['properties'].hasOwnProperty('type')) {
                    if (dataschema['properties']['type'].hasOwnProperty('enum')) {
                        if (dataschema['properties']['type']['enum'].length > 1) {
                            result['properties']['type'] = dataschema['properties']['type'];
                        }
                        else {
                            result['properties']['type'] = _.omit(dataschema['properties']['type'], ['enum']);
                        }
                    }
                }
            }

            if (dataschema.hasOwnProperty('required')) {
                result['required'] = dataschema['required'];
            }

            return result;
        }

        /**
         * Gets all definitions associated with the Metaschema.
         * @returns {Definition[]}
         */
        getDefinitions():Definition[] {
            return this.definitions;
        }

        /**
         * Gets all definitions with the given type label.
         * @param typeLabel the label of the type (e.g. 'VerticalLayout')
         * @returns {Definition} the definition or undefined if not found
         */
        getDefinitionByTypeLabel(typeLabel:String):Definition {
            return _.find(this.definitions, (definition:Definition) => {
                return _.contains(definition.getTypeLabels(), typeLabel);
            })
        }


    }
}

