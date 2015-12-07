module app.tree {

    export class TreeElement {


        private data: any = {};
        private elements: TreeElement[];

        constructor(private id: number, type: string) {
            switch(type) {
                case "Control":
                    this.data.type = type;
                    this.data.label = "";
                    this.data.scope = "";
                    break;
                case "VerticalLayout":
                case "HorizontalLayout":
                case "Group":

                    this.data.type = type;
                    this.data.label = "";
                    this.elements = [];
                    this.data.acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];
                    break;
                case "Categorization":
                    this.data.type = type;
                    this.elements = [];
                    this.data.acceptedElements = ["Category"];
                    break;
                case "Category":
                    this.data.type = type;
                    this.elements = [];
                    this.data.acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];
            }
        }

        public getId() : number {
            return this.id;
        }

        public setId(newId: number) {
            this.id = newId;
        }

        public getData() : any {
            return this.data;
        }

        public getType() : string {
            return this.data.type;
        }

        public getLabel() : string {
            return this.data.label;
        }

        public getElements() : TreeElement[] {
            return this.elements;
        }

        public hasElements() : boolean {
            return this.elements && this.elements.length > 0;
        }

        public acceptElement(type: string) {
            if(!this.elements) return false;
            for(var i = 0; i < this.data.acceptedElements.length; i++) {
                if(type == this.data.acceptedElements[i]) return true;
            }
            return false;
        }

        public isDeletable() : boolean {
            return true;
        }

    }
}