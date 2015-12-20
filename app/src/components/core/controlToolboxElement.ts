/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core {
    export class ControlToolboxElement extends ToolboxElement{
        constructor(name: string, private datatype: string, private scope: string){
            super(name, 'Control');
        }

        getDatatype(): string {
            return this.datatype;
        }
        setDatatype(dt: string) {
            this.datatype = dt;
        }
        insertIntoTree(id: number): TreeElement {
            var res = new TreeElement();
            res.setId(id);
            res.setType("Control");
            res.setScope(this.scope);
            res.setLabel(this.getName());
            res.setAcceptedElements(this.getAcceptedElements());
            return res;
        }

        getIcon() {
            //TODO custom icon for each datatype
            return 'code';
        }
    }
}