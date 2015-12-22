/**
 * Created by pancho111203 on 19/12/15.
 */
module app.core.model {
    export class ControlToolboxElement extends ToolboxElement{
        private alreadyPlaced: number = 0;

        constructor(name: string, public datatype: string, public scope: string){
            super(name, 'Control');
        }

        getDatatype(): string {
            return this.datatype;
        }
        setDatatype(dt: string) {
            this.datatype = dt;
        }

        convertToTreeElement(): app.core.model.TreeElement {
            var res = new TreeElement();
            res.setType("Control");
            res.setScope(this.scope);
            res.setLabel(this.getLabel());
            res.setAcceptedElements(this.getAcceptedElements());
            return res;
        }

        getIcon() {
            //TODO custom icon for each datatype
            return 'code';
        }

        decreasePlacedTimes() {
            this.alreadyPlaced--;
        }

        increasePlacedTimes() {

            this.alreadyPlaced++;
        }

        isAlreadyPlaced(): boolean {
            return (this.alreadyPlaced>0);
        }
        getScope(): string {
            return this.scope;
        }
    }
}