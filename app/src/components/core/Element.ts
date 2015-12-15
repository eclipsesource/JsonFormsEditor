module app.core {

    export class Element {

        private id:number;
        private type:string;
        private label:string;
        private scope:string;
        private elements:Element[];
        public metaData:any;

        public getId():number {
            return this.id;
        }

        public setId(newId:number) {
            this.id = newId;
        }

        public getType():string {
            return this.type;
        }

        public setType(newType:string) {
            this.type = newType;
        }

        public getLabel():string {
            return this.label;
        }

        public setLabel(newLabel:string) {
            this.label = newLabel;
        }

        public getScope():string {
            return this.scope;
        }

        public setScope(newScope:string) {
            this.scope = newScope;
        }

        public initElements() {
            this.elements = [];
        }

        public getElements() : Element[] {
            return this.elements;
        }

        public hasElements() : boolean {
            return this.elements && this.elements.length > 0;
        }

        public acceptElement(type:string) {
            return this.metaData.acceptedElements.indexOf(type) >= 0;
        }

        public isDeletable() : boolean {
            return true;
        }

    }
}