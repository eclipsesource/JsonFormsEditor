module app.toolbox {

    import Metaschema = app.core.metaschema.Metaschema;
    interface IToolboxElement {
        getName() : string;
    }

    class ToolboxControlElement implements IToolboxElement {
        constructor(private name : string){

        }

        getName():string {
            return this.name;
        }
    }

    class ToolboxLayoutElement implements IToolboxElement {
        constructor(private type : string){

        }

        getName():string {
            return this.type;
        }
    }

    class ToolboxController {
        public controls : IToolboxElement[] = [];
        public layouts : IToolboxElement[] = [];
        private schema : Metaschema;

        static $inject = ['MetaschemaService'];

        /*constructor(metaschemaService : app.core.metaschema.MetaschemaService){
            this.schema = metaschemaService.getSchema();
            _.forEach(this.schema.getControls(), (control : string) => {
                this.controls.push(new ToolboxControlElement(control));
            });

            _.forEach(this.schema.getLayouts(), (layout : string) => {
                this.layouts.push(new ToolboxLayoutElement(layout));
            });
        }*/
    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}