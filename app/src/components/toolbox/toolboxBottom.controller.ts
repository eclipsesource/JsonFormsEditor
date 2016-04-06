/**
 * Created by pancho111203 on 5/04/16.
 */

module app.toolbox {

    import ControlToolboxElement = app.core.model.ControlToolboxElement;

    class ToolboxBottomController {


        public showAdvanced: boolean = false;
        public advancedTemplate: string = null;


        public newElementLabel:string = '';
        public newElementTypeLabel:string = null;


        public newEnumElements = [];
        public currentEnumElementLabel = '';


        public elementTypes = {
            'string': 'basicProperties.html',
            'number': 'basicProperties.html',
            'boolean': 'basicProperties.html',
            'object': null
        };

        public newElementConfig: any = {};

        static $inject = ['ToolboxService'];

        constructor(public toolboxService: ToolboxService){
        }

        changeType(label: string, template: string){
            this.setNewElementTypeLabel(label);
            this.setTypeTemplate(template);
            this.showAdvanced = false;
            this.newElementConfig = {};
        }

        /**
         * Setter for the label of the tobe created dataschema element.
         * @param type
         */
        setNewElementTypeLabel(type:string) {
            this.newElementTypeLabel = type;
        }

        setTypeTemplate(template:string){
            this.advancedTemplate = template;
        }

        //TODO support different scopes(inside folders)
        //TODO add more data into content(required, min chars, etc)
        /**
         * Submits the current newElementLabel and newElementTypeLabel and creates a new DataschemaPropery.
         */
        addNewElement() {
            if (!this.toolboxService.addSchemaElement(this.newElementLabel, this.newElementTypeLabel, this.newElementConfig)) {
                console.log("ERROR: failed to add the element into the schema");
            }

            this.newElementLabel = '';
            this.newElementConfig = {};
            this.newEnumElements = [];
        }

        addEnumElement(){
            if(~this.newEnumElements.indexOf(this.currentEnumElementLabel)){
                console.log("ERROR: element already exists");
                this.currentEnumElementLabel = "";
                return;
            }
            this.newEnumElements.push(this.currentEnumElementLabel);
            this.currentEnumElementLabel = "";
        }
    }

    angular.module('app.toolbox').controller('ToolboxBottomController', ToolboxBottomController);
}
