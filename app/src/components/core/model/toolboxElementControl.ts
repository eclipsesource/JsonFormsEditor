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

        isObject(): boolean {
            return this.datatype == 'object';
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

        clone():ControlToolboxElement {
            return new ControlToolboxElement(this.label, this.datatype, this.scope);
        }

    }
}