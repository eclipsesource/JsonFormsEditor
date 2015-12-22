/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {
    export abstract class ToolboxElement {

        private acceptedElements:string[];

        constructor(private label:string, private type:string) {

        }

        setAcceptedElements(acceptedElements:string[]) {
            this.acceptedElements = acceptedElements;
        }

        getAcceptedElements():string[] {
            return this.acceptedElements;
        }

        setType(type:string):void {
            this.type = type;
        }

        setLabel(name:string):void {
            this.label = name;
        }

        getType():string {
            return this.type;
        }

        getLabel():string {
            return this.label;
        }

        abstract getIcon():string;

        //returns a converted element suitable for inserting into the tree with a given id
        abstract convertToTreeElement():TreeElement;

    }
}