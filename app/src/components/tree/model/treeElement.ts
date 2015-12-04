module app.tree {

    export class TreeElement {

        public data: any = {};
        public elements: TreeElement[];

        constructor(public id: number, type: string) {
            switch(type) {
                case "Control":
                    this.data["id"] = id;
                    this.data["type"] = type;
                    this.data["label"] = "";
                    this.data["scope"] = "";
                    break;
                case "VerticalLayout":
                case "HorizontalLayout":
                case "Group":
                    this.data["id"] = id;
                    this.data["type"] = type;
                    this.data["label"] = "";
                    this.elements = [];
            }
        }

        public getTitle() : string {
            return this.data["type"];
        }

        public getNodes() : TreeElement[] {
            return this.elements;
        }

        public isDeletable() : boolean {
            return true;
        }

    }
}