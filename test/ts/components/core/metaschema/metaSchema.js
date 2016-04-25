var app;
(function (app) {
    var core;
    (function (core) {
        var metaschema;
        (function (metaschema_1) {
            var Metaschema = (function () {
                function Metaschema(definitions) {
                    if (definitions === void 0) { definitions = []; }
                    this.definitions = definitions;
                }
                /**
                 * Factory-Method to create a Metaschema from a json-object.
                 *
                 * @param metaschema the json structure to create the metaschema from
                 *
                 * @returns {app.core.metaschema.Metaschema}
                 */
                Metaschema.fromJSON = function (metaschema) {
                    var definitions = [];
                    var rootDefinitionsNames = [];
                    var alreadyGenerated = [];
                    // Resolve references of the metaschema
                    var resolvedMetaschema;
                    JsonRefs.resolveRefs(metaschema, {}, function (err, res) {
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
                };
                Metaschema.extractDefinitionNameFromRef = function (ref) {
                    return ref.substring(("#/definitions/").length);
                };
                Metaschema.generateDefinition = function (definitions, definitionName, metaschema, resolvedMetaschema, rootDefinitionsNames, alreadyGenerated) {
                    if (alreadyGenerated.indexOf(definitionName) < 0) {
                        var definitionMetaschema = metaschema['definitions'][definitionName];
                        var resolvedDefinitionMetaschema = resolvedMetaschema['definitions'][definitionName];
                        var definitionDataschema = Metaschema.generateDefinitionDataschema(resolvedDefinitionMetaschema);
                        var acceptedElements = Metaschema.retrieveAcceptedElements(definitionMetaschema, rootDefinitionsNames);
                        definitions.push(new metaschema_1.Definition(definitionName, definitionDataschema, acceptedElements));
                        alreadyGenerated.push(definitionName);
                        // child definitions
                        var notGeneratedChildDefinitions = acceptedElements.filter(function (name) {
                            return !_.contains(rootDefinitionsNames, name) && !_.contains(alreadyGenerated, name);
                        });
                        for (var i = 0; i < notGeneratedChildDefinitions.length; i++) {
                            Metaschema.generateDefinition(definitions, notGeneratedChildDefinitions[i], metaschema, resolvedMetaschema, rootDefinitionsNames, alreadyGenerated);
                        }
                    }
                };
                Metaschema.generateDefinitionDataschema = function (resolvedDefinitionMetaschema) {
                    var definitionDataschema = {};
                    _.forOwn(resolvedDefinitionMetaschema, function (value, key) {
                        if (key == 'allOf' || key == 'properties') {
                            var properties = Metaschema.extractPropertiesFromDefinitionMetaschema(resolvedDefinitionMetaschema);
                            properties = _.omit(properties, ['elements']);
                            if (properties['type']['enum'].length == 1) {
                                properties['type'] = _.omit(properties['type'], ['enum']);
                            }
                            if (properties['scope']) {
                                properties['scope'] = properties['scope']['properties']['$ref'];
                            }
                            if (properties['rule']) {
                                properties['rule']['properties']['condition']['properties']['scope'] = properties['rule']['properties']['condition']['properties']['scope']['properties']['$ref'];
                            }
                            definitionDataschema['properties'] = properties;
                        }
                        else {
                            definitionDataschema[key] = value;
                        }
                    });
                    return definitionDataschema;
                };
                Metaschema.extractPropertiesFromDefinitionMetaschema = function (definitionMetaschema) {
                    var properties = {};
                    if (definitionMetaschema['properties']) {
                        properties = definitionMetaschema['properties'];
                    }
                    else if (definitionMetaschema['allOf']) {
                        properties = Metaschema.mergeDefinitionProperties(definitionMetaschema['allOf']);
                    }
                    return properties;
                };
                Metaschema.mergeDefinitionProperties = function (propertiesSources) {
                    return propertiesSources.reduce(function (propertiesObject, propertySource) {
                        return _.merge(propertiesObject, propertySource['properties']);
                    }, {});
                };
                Metaschema.retrieveAcceptedElements = function (definitionMetaschema, rootDefinitionsNames) {
                    var acceptedElements = [];
                    var properties = Metaschema.extractPropertiesFromDefinitionMetaschema(definitionMetaschema);
                    if (properties['elements']) {
                        var ref = properties['elements']['items']['$ref'];
                        if (ref == "#") {
                            acceptedElements = acceptedElements.concat(rootDefinitionsNames);
                        }
                        else {
                            acceptedElements.push(Metaschema.extractDefinitionNameFromRef(ref));
                        }
                    }
                    return acceptedElements;
                };
                Metaschema.resolveTypesAndAcceptedElements = function (definitions, metaschema) {
                    var nameTypeMap = {};
                    for (var i = 0; i < definitions.length; i++) {
                        var definition = definitions[i];
                        var definitionName = definition.getName();
                        var definitionTypes = Metaschema.retrieveDefinitionTypes(definitionName, metaschema);
                        definition.setTypes(definitionTypes);
                        nameTypeMap[definitionName] = definitionTypes;
                    }
                    for (var i = 0; i < definitions.length; i++) {
                        var definition = definitions[i];
                        var acceptedElements = definition.getAcceptedElements();
                        var resolvedAcceptedElements = [];
                        for (var j = 0; j < acceptedElements.length; j++) {
                            resolvedAcceptedElements = resolvedAcceptedElements.concat(nameTypeMap[acceptedElements[j]]);
                        }
                        definition.setAcceptedElements(resolvedAcceptedElements);
                    }
                };
                Metaschema.retrieveDefinitionTypes = function (definitionName, metaschema) {
                    var definitionMetaschema = metaschema['definitions'][definitionName];
                    var properties = Metaschema.extractPropertiesFromDefinitionMetaschema(definitionMetaschema);
                    return properties['type']['enum'];
                };
                /**
                 * Gets all definitions associated with the Metaschema.
                 * @returns {Definition[]}
                 */
                Metaschema.prototype.getDefinitions = function () {
                    return this.definitions;
                };
                /**
                 * Gets all definitions with the given type label.
                 * @param typeLabel the label of the type (e.g. 'VerticalLayout')
                 * @returns {Definition} the definition or undefined if not found
                 */
                Metaschema.prototype.getDefinitionByTypeLabel = function (typeLabel) {
                    return _.find(this.definitions, function (definition) {
                        return _.contains(definition.getTypeLabels(), typeLabel);
                    });
                };
                return Metaschema;
            })();
            metaschema_1.Metaschema = Metaschema;
        })(metaschema = core.metaschema || (core.metaschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=metaSchema.js.map