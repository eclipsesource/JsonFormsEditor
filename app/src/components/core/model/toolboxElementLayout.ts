/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {
    import ElementConfig=app.core.elementsConfig.ElementConfig;

    export class LayoutToolboxElement extends ToolboxElement {
        constructor(name:string, type:string, elementConfig:ElementConfig) {
            super(name, type, elementConfig);
        }

        convertToTreeElement():TreeElement {
            var treeElement = new TreeElement();
            treeElement.setType(this.getType());
            treeElement.setLabel("");
            treeElement.setAcceptedElements(this.getAcceptedElements());
            return treeElement;
        }
    }
}