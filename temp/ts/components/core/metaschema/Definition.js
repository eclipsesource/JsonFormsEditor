var app;
(function (app) {
    var core;
    (function (core) {
        var metaschema;
        (function (metaschema) {
            var Definition = (function () {
                /**
                 * Constructs a new definition.
                 *
                 * @param name the name of the definition
                 * @param dataschema the dataschema of the definition
                 * @param acceptedElements the labels of the elements this definition accepts as children
                 */
                function Definition(name, dataschema, acceptedElements) {
                    this.name = name;
                    this.dataschema = dataschema;
                    this.acceptedElements = acceptedElements;
                    this.types = [];
                    this.uischema = this.generateUISchema(dataschema);
                }
                Definition.prototype.getName = function () {
                    return this.name;
                };
                /**
                 * The labels of the types this definition can exhibit (e.g. 'VerticalLayout' / 'HorizontalLayout' for Definition 'layout').
                 * @returns {string[]}
                 */
                Definition.prototype.getTypeLabels = function () {
                    return this.types;
                };
                Definition.prototype.setTypes = function (newTypes) {
                    this.types = newTypes;
                };
                /**
                 * Checks wether this definition accepts child elements.
                 * @returns {boolean}
                 */
                Definition.prototype.acceptsElements = function () {
                    return this.acceptedElements.length > 0;
                };
                /**
                 * The labels of the types this definition accepts as child elements.
                 * @returns {string[]}
                 */
                Definition.prototype.getAcceptedElements = function () {
                    return this.acceptedElements;
                };
                Definition.prototype.setAcceptedElements = function (newAcceptedElements) {
                    this.acceptedElements = newAcceptedElements;
                };
                /**
                 * Gets the dataschema for this definition, so it can be edited by jsonforms.
                 * @returns {{}}
                 */
                Definition.prototype.getDataschema = function () {
                    return this.dataschema;
                };
                /**
                 * Gets the uischema for this definition, so it can be edited by jsonforms.
                 * @returns {{}}
                 */
                Definition.prototype.getUISchema = function () {
                    return this.uischema;
                };
                Definition.prototype.generateUISchema = function (dataschema) {
                    var elements = [];
                    var properties = dataschema['properties'];
                    _.forOwn(properties, function (value, key) {
                        if (key == 'rule') {
                            elements.push({
                                "type": "Group",
                                "label": _.capitalize(key),
                                "elements": [
                                    {
                                        "type": "Control",
                                        "label": "Effect",
                                        "scope": {
                                            "$ref": "#/properties/rule/properties/effect"
                                        }
                                    },
                                    {
                                        "type": "Group",
                                        "label": "Condition",
                                        "elements": [
                                            {
                                                "type": "VerticalLayout",
                                                "elements": [
                                                    {
                                                        "type": "Control",
                                                        "label": "Scope",
                                                        "scope": {
                                                            "$ref": "#/properties/rule/properties/condition/properties/scope"
                                                        }
                                                    },
                                                    {
                                                        "type": "Control",
                                                        "label": "Expected Value",
                                                        "scope": {
                                                            "$ref": "#/properties/rule/properties/condition/properties/expectedValue"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            });
                        }
                        else {
                            elements.push({
                                "type": "Control",
                                "label": _.capitalize(key),
                                "scope": {
                                    "$ref": "#/properties/" + key
                                },
                                "readOnly": !value['enum'] && (key === 'type' || key === 'scope')
                            });
                        }
                    });
                    return {
                        "type": "VerticalLayout",
                        "elements": elements
                    };
                };
                return Definition;
            })();
            metaschema.Definition = Definition;
        })(metaschema = core.metaschema || (core.metaschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
