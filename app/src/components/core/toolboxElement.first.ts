/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core {
    export abstract class ToolboxElement {

        private acceptedElements: string[];
        constructor(private name: string, private type: string) {

        }

        setAcceptedElements(acceptedElements:string[]) {
            this.acceptedElements = acceptedElements;
        }

        getAcceptedElements(): string[] {
            return this.acceptedElements;
        }

        setType(type: string) {
            this.type = type;
        }

        setName(name: string) {
            this.name = name;
        }

        getType(): string {
            return this.type;
        }

        getName(): string {
            return this.name;
        }

        abstract getIcon(): string;

        //returns a converted element suitable for inserting into the tree with a given id
        abstract insertIntoTree(id: number): TreeElement;

    }
}