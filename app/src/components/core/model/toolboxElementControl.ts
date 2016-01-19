/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {
    import ElementConfig = app.core.elementsConfig.ElementConfig;
    export class ControlToolboxElement extends ToolboxElement {

        constructor(name:string, public datatype:string, private scope:string) {
            super(name, "", null);
            var config, type;
            if(datatype == 'object'){
                config = new ElementConfig('object', '', 'folder');
                type = 'object';
            } else {
                config = new ElementConfig('Control', '', 'code');
                type = 'Control';
            }
            this.elementConfig = config;
            this.type = type;

        }

        isFolder(): boolean {
            if(this.datatype == 'object'){
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

        getScope():string {
            return this.scope;
        }

    }
}