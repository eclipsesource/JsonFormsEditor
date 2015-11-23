module app.toolbox {

    class ToolboxElement {
        constructor(public name : string){

        }
    }

    class ToolboxController {
        public controls : ToolboxElement[] = [];
        public layouts : ToolboxElement[] = [];
        private schema : app.core.metaschema.Metaschema;

        static $inject = ['MetaschemaService'];

        constructor(metaschemaService : app.core.metaschema.MetaschemaService){
            this.schema = metaschemaService.getSchema();
            _.forEach(this.schema.getControls(), (controlName : string) => {
                this.controls.push(new ToolboxElement(controlName));
            });

            _.forEach(this.schema.getLayouts(), (layoutName : string) => {
                this.layouts.push(new ToolboxElement(layoutName));
            });
        }
    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}