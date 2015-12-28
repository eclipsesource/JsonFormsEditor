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
         * The name of the definition, e.g. 'control' or 'layout'.
         * @returns {string}
         */
        getName():string {
            return this.name;
        }

        /**
         * The types (labels) this definition can exhibit (e.g. 'VerticalLayout' / 'HorizontalLayout' for Definition 'layout').
         * @returns {string[]}
         */
        getTypes():string[] {
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
         * The types (labels) this definition accepts as child elements.
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
                    elements.push({
                        "type": "Control",
                        "label": _.capitalize(key),
                        "scope": {
                            "$ref": "#/properties/" + key
                        }
                    })
                });
            }
            return {
                "type": "VerticalLayout",
                "elements": elements
            }
        }
    }
}
