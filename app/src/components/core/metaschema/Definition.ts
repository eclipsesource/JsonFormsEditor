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
        constructor(private name:string, private dataschema:{}, private acceptedElements:string[]) {
            this.uischema = this.generateUISchema(dataschema);
        }

        getName():string {
            return this.name;
        }

        /**
         * The labels of the types this definition can exhibit (e.g. 'VerticalLayout' / 'HorizontalLayout' for Definition 'layout').
         * @returns {string[]}
         */
        getTypeLabels():string[] {
            return this.types;
        }

        setTypes(newTypes:string[]) {
            this.types = newTypes;
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

        setAcceptedElements(newAcceptedElements:string[]) {
            this.acceptedElements = newAcceptedElements;
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

            return {
                "type": "VerticalLayout",
                "elements": elements
            }
        }
    }
}
