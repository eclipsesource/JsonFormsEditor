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

            // array contains the names of all definitions
            var definitionsNames:string[] = [];

            if (json.hasOwnProperty('definitions')) {
                var definitionsRefs = json['anyOf'];
                for (var i = 0; i < definitionsRefs.length; i++) {
                    var name = definitionsRefs[i]['$ref'].substring(("#/definitions/").length);
                    var value = json['definitions'][name];
                    if (value.hasOwnProperty('type')) {
                        if (value['type'] === 'object') {
                            var definition:Definition = new Definition(name, Metaschema.cleanupDataschema(value, json), Metaschema.retrieveAcceptedElements(value, definitionsNames));

                            // now continue with all child elements that the current element can accept
                            _.forEach(Metaschema.retrieveChildElements(value, definitionsNames, json), (child:Definition) => {
                                definitions.push(child);
                            });

                            // add everything to the result
                            definitions.push(definition);
                            _.forEach(definition.getTypeLabels(), (type:string) => {
                                if (definitionsNames.indexOf(type) === -1) {
                                    definitionsNames.push(type);
                                }
                            });
                        }
                    }
                }
            }
            return new Metaschema(definitions);
        }

        private static retrieveAcceptedElements(value:{}, definitionsNames:string[]):string[] {
            var result:string[] = [];
            var items = null;

            if (value['allOf']) {
                var index;
                for (var i = 0; i < value['allOf'].length; i++) {
                    if (value['allOf'][i]['properties']) index = i;
                }
                if (value['allOf'][index]['properties'].hasOwnProperty('elements') && value['allOf'][index]['properties']['elements'].hasOwnProperty('items')) {
                    items = value['allOf'][index]['properties']['elements']['items'];
                }
            } else if (value.hasOwnProperty('properties') && value['properties'].hasOwnProperty('elements') && value['properties']['elements'].hasOwnProperty('items')) {
                items = value['properties']['elements']['items'];
            }

            if (items && items.hasOwnProperty('$ref') && items['$ref'] === '#') {
                result = definitionsNames;
            } else {
                // a new object is declared, so get its label
                if (items && items.hasOwnProperty('properties') && items['properties'].hasOwnProperty('type') && items['properties']['type'].hasOwnProperty('enum')) {
                    result = items['properties']['type']['enum'];
                }
            }

            return result;
        }

        private static retrieveChildElements(schema:{}, definitionsNames:string[], json:{}):Definition[] {
            var result:Definition[] = [];
            var elements = null;

            if (schema['allOf']) {
                var index;
                for (var i = 0; i < schema['allOf'].length; i++) {
                    if (schema['allOf'][i]['properties']) index = i;
                }
                if (schema['allOf'][index]['properties'].hasOwnProperty('elements')) {
                    elements = schema['allOf'][index]['properties']['elements'];
                }
            } else if (schema.hasOwnProperty('properties') && schema['properties'].hasOwnProperty('elements')) {
                elements = schema['properties']['elements'];
            }

            if (elements && elements.hasOwnProperty('type') && elements['type'] === 'array' && elements.hasOwnProperty('items')) {
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
                                    result.push(new Definition(name.toLowerCase(), Metaschema.cleanupDataschema(items, json), Metaschema.retrieveAcceptedElements(items, definitionsNames)));
                                });
                            }
                        }
                    }
                }
            }

            return result;
        }

        private static cleanupDataschema(dataschema:{}, json:{}):{} {
            var result = {
                "type": "object",
                "properties" : {}
            };
            var propertiesSources = [];

            if (dataschema['properties']) {
                propertiesSources = [dataschema];
            } else {
                propertiesSources = dataschema['allOf'];
            }
            for (var i = 0; i < propertiesSources.length; i++) {
                var propertySource = propertiesSources[i];

                if (propertySource['properties']) {
                    result['properties'] = _.merge(_.omit(propertySource['properties'], ['elements']), result['properties']);

                    if (propertySource['properties'].hasOwnProperty('scope')) {
                        result['properties']['scope'] = {'type': 'string'};
                    }

                    if (propertySource['properties'].hasOwnProperty('type')) {
                        if (propertySource['properties']['type'].hasOwnProperty('enum')) {
                            if (propertySource['properties']['type']['enum'].length > 1) {
                                result['properties']['type'] = propertySource['properties']['type'];
                            }
                            else {
                                result['properties']['type'] = _.omit(propertySource['properties']['type'], ['enum']);
                            }
                        }
                    }
                } else if (propertySource['$ref']) {
                    if (propertySource['$ref'].substring(("#/definitions/").length) == 'runtimeProps') {
                        var runtimeProps = json['definitions']['runtimeProps']['properties'];
                        _.forOwn(runtimeProps, (value, key) => {
                            if (value['$ref']) {
                                result['properties'][key] = json['definitions'][value['$ref'].substring(("#/definitions/").length)];
                            }
                        });
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

