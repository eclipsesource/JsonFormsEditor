/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {
    export class LayoutToolboxElement extends ToolboxElement {
        constructor(name:string, type:string) {
            super(name, type);
        }

        convertToTreeElement():TreeElement {
            var treeElement = new TreeElement();
            treeElement.setType(this.getType());
            treeElement.setLabel("");
            treeElement.setAcceptedElements(this.getAcceptedElements());
            return treeElement;
        }

        getIcon():string {
            switch (this.getType()) {
                case 'HorizontalLayout':
                    return 'border_horizontal';
                    break;
                case 'VerticalLayout':
                    return 'border_vertical';
                    break;
                case 'Group':
                    return 'crop_free';
                    break;
                case 'Categorization':
                    return 'view_module';
                    break;
                case 'Category':
                    return 'folder_open';
                    break;
                default:
                    return 'code';
            }
        }
    }
}