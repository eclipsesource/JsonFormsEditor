/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core {
    export class GeneralToolboxElement extends ToolboxElement {
        public tooltip: string;
        constructor(name: string, type: string){
            super(name, type);

            this.tooltip = type;
        }

        insertIntoTree(id: number): TreeElement {
            var res = new TreeElement();
            res.setId(id);
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