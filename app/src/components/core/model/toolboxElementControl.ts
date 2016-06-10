module app.core.model {

    import ElementConfig = app.core.elementsConfig.ElementConfig;

    export class ControlToolboxElement extends ToolboxElement{

        constructor(name: string, public datatype: string, private scope: string, private required:boolean) {
            super(name, "", null);
            this.generateLabel(name);
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

        generateLabel(name) {
            this.label = _.startCase(name);
            if (this.required) {
                this.label += '*';
            }
        }

        isObject(): boolean {
            return this.datatype == 'object';
        }

        isRequired(): boolean {
            return this.required;
        }

        convertToTreeElement():TreeElement {
            var treeElement = new TreeElement();
            treeElement.setType("Control");
            treeElement.setDataType(this.datatype);
            treeElement.setScope(this.scope);
            treeElement.setReadOnly(false);
            treeElement.setLabel(this.getLabel());
            treeElement.setAcceptedElements(this.getAcceptedElements());
            return treeElement;
        }

        getScope():string {
            return this.scope;
        }

        clone():ControlToolboxElement {
            return new ControlToolboxElement(this.label, this.datatype, this.scope, this.required);
        }

    }
}