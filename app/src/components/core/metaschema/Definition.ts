module app.core.metaschema {

    export class Definition {

        private types:string[] = [];
        private uischema:{};

        /**
         * Constructs a new definition.
         *
         * @param name the name of the definition
         * @param dataschema the dataschema of the definition
         * @param acceptedElements the labels of the elements this definition accepts as children
         */
        constructor(name:string, private dataschema:{}, private acceptedElements:string[]) {
            if (this.dataschema.hasOwnProperty('properties')) {
                if (this.dataschema['properties'].hasOwnProperty('type')) {
                    if (this.dataschema['properties']['type'].hasOwnProperty('enum')) {
                        this.types = this.dataschema['properties']['type']['enum'];
                    } else {
                        this.types.push(_.capitalize(name));
                    }
                }
            }
            this.uischema = this.generateUISchema(this.dataschema);
        }

        /**
         * The labels of the types this definition can exhibit (e.g. 'VerticalLayout' / 'HorizontalLayout' for Definition 'layout').
         * @returns {string[]}
         */
        getTypeLabels():string[] {
            return this.types;
        }

        /**
         * Checks wether this definition accepts child elements.
         * @returns {boolean}
         */
        acceptsElements():boolean {
            return this.acceptedElements.length > 0;
        }

        /**
         * The labels of the types this definition accepts as child elements.
         * @returns {string[]}
         */
        getAcceptedElements():string[] {
            return this.acceptedElements;
        }

        /**
         * Gets the dataschema for this definition, so it can be edited by jsonforms.
         * @returns {{}}
         */
        getDataschema():{} {
            return this.dataschema;
        }

        /**
         * Gets the uischema for this definition, so it can be edited by jsonforms.
         * @returns {{}}
         */
        getUISchema():{} {
            return this.uischema;
        }

        private generateUISchema(dataschema:{}):{} {
            var elements = [];
            if (dataschema && dataschema.hasOwnProperty('properties')) {
                var properties = dataschema['properties'];

                _.forOwn(properties, (value, key) => {
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
                                                        "$ref": "#/properties/rule/properties/condition/properties/scope/properties/$ref"
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
                    } else {
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
            }
            console.log(JSON.stringify(elements));
            return {
                "type": "VerticalLayout",
                "elements": elements
            }
        }
    }
}
