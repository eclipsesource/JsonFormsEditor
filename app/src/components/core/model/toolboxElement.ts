/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {

    import ElementConfig=app.core.elementsConfig.ElementConfig;

    export abstract class ToolboxElement {

        private acceptedElements:string[];

        constructor(public label:string, public type:string, public elementConfig:ElementConfig) {

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

        getDescription():string {
            return this.elementConfig.getDescription();
        }

        getIcon():string {
            return this.elementConfig.getIconFont();
        }

        /**
         * Returns a converted element suitable for inserting into the tree.
         */
        abstract convertToTreeElement():TreeElement;

    }
}