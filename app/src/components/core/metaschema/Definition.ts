module app.core.metaschema {

    export class Definition {

        private types:string[] = [];
        private dataschema:{};
        private uischema:{};

        /**
         * Constructs a new definition.
         *
         * @param name the name of the definition
         * @param metaschema the metaschema of the definition
         * @param acceptedElements the labels of the elements this definition accepts as children
         */
        constructor(private name:string, private metaschema:{}, private acceptedElements:string[]) {
            this.dataschema = Metaschema.generateDefinitionDataschema(metaschema);
            this.uischema = Metaschema.generateDefinitionUISchema(this.dataschema);
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

        getMetaschema():{} {
            return this.metaschema;
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
    }
}
