/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {
    import ElementConfig = app.core.elementsConfig.ElementConfig;
    export class ControlToolboxElement extends ToolboxElement {
        private alreadyPlaced:number = 0;

        constructor(name:string, public datatype:string, private scope:string) {
            super(name, "", null);
            var config, type;
            if(datatype == 'folder'){
                config = new ElementConfig('Folder', '', 'folder');
                type = 'folder';
            } else {
                config = new ElementConfig('Control', '', 'code');
                type = 'Control';
            }
            this.elementConfig = config;
            this.type = type;

        }

        isFolder(): boolean {
            if(this.datatype == 'folder'){
                return true;
            }
            return false;
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