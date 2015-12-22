/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {
    export class ControlToolboxElement extends ToolboxElement {
        private alreadyPlaced:number = 0;

        constructor(name:string, public datatype:string, public scope:string) {
            super(name, 'Control');
        }

        getDatatype():string {
            return this.datatype;
        }

        setDatatype(dt:string):void {
            this.datatype = dt;
        }

        convertToTreeElement():TreeElement {
            var treeElement = new TreeElement();
            treeElement.setType("Control");
            treeElement.setScope(this.scope);
            treeElement.setLabel(this.getLabel());
            treeElement.setAcceptedElements(this.getAcceptedElements());
            return treeElement;
        }

        getIcon():string {
            //TODO custom icon for each datatype
            return 'code';
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
    }
}