module app.core.model {

    export class TreeElement {

        private type:string;
        private label:string;
        private scope:string;
        public elements:TreeElement[] = [];
        public metaData:any = {};

        public getType():string {
            return this.type;
        }

        public setType(newType:string):void {
            this.type = newType;
        }

        public getLabel():string {
            return this.label;
        }

        public setLabel(newLabel:string):void {
            this.label = newLabel;
        }

        public getScope():string {
            return this.scope;
        }

        public setScope(newScope:string):void {
            this.scope = newScope;
        }

        public initElements():void {
            this.elements = [];
        }

        public getElements():TreeElement[] {
            return this.elements;
        }

        public hasElements():boolean {
            return this.elements && this.elements.length > 0;
        }

        public addElement(element:TreeElement):void {
            this.elements.push(element);
        }

        public acceptsElement(type:string):boolean {
            if (!this.metaData.hasOwnProperty('acceptedElements')) {
                return false;
            }
            return this.metaData.acceptedElements.indexOf(type) >= 0;
        }

        public setAcceptedElements(acceptedElements:string[]):void {
            this.metaData['acceptedElements'] = acceptedElements;
        }

        public getAcceptedElements():string[] {
            return this.metaData['acceptedElements'];
        }

        public isDeletable():boolean {
            return true;
        }

    }
}