module app.core.dataschema {
    export class DataschemaProperty {
        constructor(private name:string, private type:string) {

        }

        getName():string {
            return this.name;
        }

        getType():string {
            return this.type;
        }

        isValid():boolean {
            return this.getName() !== null && this.getType() !== null;
        }
    }
}
