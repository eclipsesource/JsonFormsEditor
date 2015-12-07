module app.tree {

    export class TreeElement {

        private type: string;
        private label: string;
        private scope: string;
        private acceptedElements: [string];

        private elements: TreeElement[];

        constructor(private id: number, type: string) {
            switch(type) {
                case "Control":
                    this.type = type;
                    this.label = "";
                    this.scope = "";
                    break;
                case "VerticalLayout":
                case "HorizontalLayout":
                case "Group":

                    this.type = type;
                    this.label = "";
                    this.elements = [];
                    this.acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];
                    break;
                case "Categorization":
                    this.type = type;
                    this.elements = [];
                    this.acceptedElements = ["Category"];
                    break;
                case "Category":
                    this.type = type;
                    this.elements = [];
                    this.acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];
            }
        }

        public getId() : number {
            return this.id;
        }

        public setId(newId: number) {
            this.id = newId;
        }

        public getData() : any {
            return this;
        }

        public getType() : string {
            return this.type;
        }

        public getLabel() : string {
            return this.label;
        }

        public getElements() : TreeElement[] {
            return this.elements;
        }

        public hasElements() : boolean {
            return this.elements && this.elements.length > 0;
        }

        public acceptElement(type: string) {
            if(!this.elements) return false;
            for(var i = 0; i < this.acceptedElements.length; i++) {
                if(type == this.acceptedElements[i]) return true;
            }
            return false;
        }

        public isDeletable() : boolean {
            return true;
        }

    }
}