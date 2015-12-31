/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {
    import ElementConfig = app.core.elementsConfig.ElementConfig;
    export class ControlToolboxElement extends ToolboxElement {
        private alreadyPlaced:number = 0;

        constructor(name:string, public datatype:string, private scope:string) {
            super(name, 'Control', new ElementConfig('Control', '', 'code'));
        }

        convertToTreeElement():TreeElement {
            var treeElement = new TreeElement();
            treeElement.setType("Control");
            treeElement.setScope(this.scope);
            treeElement.setLabel(this.getLabel());
            treeElement.setAcceptedElements(this.getAcceptedElements());
            return treeElement;
        }

        decreasePlacedTimes():void {
            this.alreadyPlaced--;
        }

        increasePlacedTimes():void {
            this.alreadyPlaced++;
        }

        isAlreadyPlaced():boolean {
            return this.alreadyPlaced > 0;
        }

        getScope():string {
            return this.scope;
        }

        canBeRemoved():boolean {
            return !this.isAlreadyPlaced();
        }
    }
}