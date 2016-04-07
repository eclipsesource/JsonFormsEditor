declare var JsonRefs;

module app.core.metaschema {

    export class Metaschema {

        constructor(private definitions:Definition[] = []) {

        }

        /**
         * Factory-Method to create a Metaschema from a json-object.
         *
         * @param metaschema the json structure to create the metaschema from
         *
         * @returns {app.core.metaschema.Metaschema}
         */
        static fromJSON(metaschema:{}):Metaschema {
            var definitions:Definition[] = [];
            var rootDefinitionsNames:string[] = [];
            var alreadyGenerated:string[] = [];

            // Resolve references of the metaschema
            var resolvedMetaschema;
            JsonRefs.resolveRefs(metaschema, {}, function(err, res) {
                resolvedMetaschema = res;
            });

            // save root definitions names
            for (var i = 0; i < metaschema['anyOf'].length; i++) {
                rootDefinitionsNames.push(Metaschema.extractDefinitionNameFromRef(metaschema['anyOf'][i]['$ref']));
            }

            // generate definitions
            for (var i = 0; i < resolvedMetaschema['anyOf'].length; i++) {
                var definitionName = rootDefinitionsNames[i];
                Metaschema.generateDefinition(definitions, definitionName, metaschema, resolvedMetaschema, rootDefinitionsNames, alreadyGenerated);
            }

            // resolve accepted elements
            Metaschema.resolveTypesAndAcceptedElements(definitions, metaschema);

            return new Metaschema(definitions);
        }

        private static extractDefinitionNameFromRef(ref:string):string {
            return ref.substring(("#/definitions/").length);
        }

        private static generateDefinition(definitions:Definition[], definitionName:string, metaschema:{}, resolvedMetaschema:{}, rootDefinitionsNames:string[], alreadyGenerated:string[]) {
            if (alreadyGenerated.indexOf(definitionName) < 0) {
                var definitionMetaschema:{} = metaschema['definitions'][definitionName];
                var resolvedDefinitionMetaschema:{} = resolvedMetaschema['definitions'][definitionName];
                var definitionDataschema:{} = Metaschema.generateDefinitionDataschema(resolvedDefinitionMetaschema);

                var acceptedElements:string[] = Metaschema.retrieveAcceptedElements(definitionMetaschema, rootDefinitionsNames);

                definitions.push(new Definition(definitionName, definitionDataschema, acceptedElements));
                alreadyGenerated.push(definitionName);

                // child definitions
                var notGeneratedChildDefinitions = acceptedElements.filter(function (name:string) {
                    return !_.contains(rootDefinitionsNames, name) && !_.contains(alreadyGenerated, name);
                });
                for (var i = 0; i < notGeneratedChildDefinitions.length; i++) {
                    Metaschema.generateDefinition(definitions, notGeneratedChildDefinitions[i], metaschema, resolvedMetaschema, rootDefinitionsNames, alreadyGenerated);
                }
            }
        }

        private static generateDefinitionDataschema(resolvedDefinitionMetaschema:{}):{} {
            var definitionDataschema = {};

            _.forOwn(resolvedDefinitionMetaschema, (value, key) => {
                // resolve properties
                if (key == 'allOf' || key == 'properties') {
                    var properties = Metaschema.extractPropertiesFromDefinitionMetaschema(resolvedDefinitionMetaschema);
                    definitionDataschema['properties'] = _.omit(properties, ['elements']);
                } else {
                    definitionDataschema[key] = value;
                }
            });

            return definitionDataschema;
        }

        private static extractPropertiesFromDefinitionMetaschema(definitionMetaschema:{}):{} {
            var properties = {};

            if (definitionMetaschema['properties']) {
                properties = definitionMetaschema['properties'];
            } else if (definitionMetaschema['allOf']) {
                properties = Metaschema.mergeDefinitionProperties(definitionMetaschema['allOf']);
            }

            return properties;
        }

        static mergeDefinitionProperties(propertiesSources:{}[]):{} {
            return propertiesSources.reduce(function(propertiesObject, propertySource) {
                return _.merge(propertiesObject, propertySource['properties']);
             }, {});
        }

        private static retrieveAcceptedElements(definitionMetaschema:{}, rootDefinitionsNames:string[]):string[] {
            var acceptedElements:string[] = [];

            var properties = Metaschema.extractPropertiesFromDefinitionMetaschema(definitionMetaschema);
            if (properties['elements']) {
                var ref = properties['elements']['items']['$ref'];
                if (ref == "#") {
                    acceptedElements = acceptedElements.concat(rootDefinitionsNames);
                } else {
                    acceptedElements.push(Metaschema.extractDefinitionNameFromRef(ref));
                }
            }

            return acceptedElements;
        }

        private static resolveTypesAndAcceptedElements(definitions, metaschema) {
            var nameTypeMap = {};
            console.log(definitions);
            for (var i = 0; i < definitions.length; i++) {
                var definition:Definition = definitions[i];
                var definitionName = definition.getName();
                var definitionTypes = Metaschema.retrieveDefinitionTypes(definitionName, metaschema);
                definition.setTypes(definitionTypes);
                nameTypeMap[definitionName] = definitionTypes
            }
            for (var i = 0; i < definitions.length; i++) {
                var definition:Definition = definitions[i];
                var acceptedElements = definition.getAcceptedElements();
                var resolvedAcceptedElements = [];
                for (var j = 0; j < acceptedElements.length; j++) {
                    resolvedAcceptedElements = resolvedAcceptedElements.concat(nameTypeMap[acceptedElements[j]]);
                }
                definition.setAcceptedElements(resolvedAcceptedElements);
            }
        }

        private static retrieveDefinitionTypes(definitionName:string, metaschema:{}):string[] {
            var definitionMetaschema:{} = metaschema['definitions'][definitionName];
            var properties = Metaschema.extractPropertiesFromDefinitionMetaschema(definitionMetaschema);
            return properties['type']['enum'];
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

