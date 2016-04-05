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
            console.log(this.newElementConfig);

            if (!this.toolboxService.addSchemaElement(this.newElementLabel, this.newElementTypeLabel, this.newElementConfig)) {
                console.log("ERROR: failed to add the element into the schema");
            }

            this.newElementLabel = '';
        }

        /**
         * Removes the specified ControlToolboxElement from the Dataschema.
         * @param element
         */
        removeDataElement(element:ControlToolboxElement) {
            if (this.toolboxService.canBeRemoved(element)) {
                if (!this.toolboxService.removeSchemaElement(element)) {
                    console.log("ERROR: failed to remove the element from the schema");
                }
            }
        }
    }

    angular.module('app.toolbox').controller('ToolboxBottomController', ToolboxBottomController);
}
