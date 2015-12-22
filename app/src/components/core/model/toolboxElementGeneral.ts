/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {
    export class GeneralToolboxElement extends ToolboxElement {
        constructor(name: string, type: string){
            super(name, type);
        }

        convertToTreeElement(): app.core.model.TreeElement {
            var res = new TreeElement();
            res.setType(this.getType());
            res.setLabel("");
            res.setAcceptedElements(this.getAcceptedElements());
            return res;
        }



        getIcon() {
            switch(this.getType()) {
                case 'HorizontalLayout': return 'border_horizontal'; break;
                case 'VerticalLayout': return 'border_vertical'; break;
                case 'Group': return 'crop_free'; break;
                case 'Categorization': return 'view_module'; break;
                case 'Category': return 'folder_open'; break;
                default: return 'code';
            }
        }
    }
}