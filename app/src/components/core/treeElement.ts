module app.core {

    export class TreeElement {

        private id:number;
        private type:string;
        public label:string;
        private scope:string;
        public elements:TreeElement[] = [];
        public metaData:any = {};

        static id = 0;
        static getNewId(): number {
            return TreeElement.id++;
        }

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

        public getElements() : TreeElement[] {
            return this.elements;
        }

        public hasElements() : boolean {
            return this.elements && this.elements.length > 0;
        }

        public addElement(element: TreeElement) {
            this.elements.push(element);
        }

        public acceptsElement(type:string) {
            if(!this.metaData.hasOwnProperty('acceptedElements')){
                return false;
            }
            return this.metaData.acceptedElements.indexOf(type) >= 0;
        }

        public setAcceptedElements(acceptedElements: string[]) {
            this.metaData['acceptedElements'] = acceptedElements;
        }

        public getAcceptedElements(): string[] {
            return this.metaData['acceptedElements'];
        }

        public isDeletable() : boolean {
            return true;
        }

        public hasLabel() : boolean {
            if(this.type=='HorizontalLayout' || this.type == 'VerticalLayout' || this.type == 'Categorization') {
                return false;
            }
            return true;
        }

    }
}