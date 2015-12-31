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

        getType():string {
            return this.type;
        }

        getLabel():string {
            return this.label;
        }

        abstract getIcon():string;


        /**
         * Returns a converted element suitable for inserting into the tree.
         */
        abstract convertToTreeElement():TreeElement;

    }
}