module app.core.dataschema {
    export class DataschemaProperty {
        constructor(private name:string, private type:string) {

        }

        /**
         * The name of the property
         * @returns {string}
         */
        getName():string {
            return this.name;
        }

        /**
         * The type of the property (e.g.: 'string', 'number')
         * @returns {string}
         */
        getType():string {
            return this.type;
        }

        isValid():boolean {
            return this.getName() !== null && this.getType() !== null;
        }
    }
}
