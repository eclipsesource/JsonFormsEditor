module app.toolbox {

    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import ConfigDialogService = app.header.ConfigDialogService;
    import DataschemaProperty = app.core.dataschema.DataschemaProperty;

    class ToolboxController {

        public newElementLabel:string = '';
        public newElementTypeLabel:string = 'string';

        public elementTypes = ['string', 'number', 'boolean'];

        public treeOptions:{};

        static $inject = ['ToolboxService', 'ConfigDialogService'];

        constructor(public toolboxService:ToolboxService, private configService:ConfigDialogService) {
            this.treeOptions = {
                accept: () => {
                    return false;
                },
                dropped: (event) => {
                    //if the element is being dragged into the toolbar itself, return
                    if (event.dest.nodesScope.$modelValue == event.source.nodesScope.$modelValue) {
                        return;
                    }

                    var toolboxElement:ToolboxElement = event.source.nodeScope.$modelValue;
                    if (toolboxElement instanceof ControlToolboxElement) {
                        toolboxElement.increasePlacedTimes();
                    }

                    // Convert the ToolboxElement into a TreeElement
                    var index = event.dest.index;
                    var destination:ToolboxElement = event.dest.nodesScope.$modelValue[index];
                    event.dest.nodesScope.$modelValue[index] = destination.convertToTreeElement();
                }
            };
        }

        /**
         * Checks, if the element should be hidden from the toolbox, because it is already used in the tree.
         * @param element
         * @returns {boolean}
         */
        shouldHide(element:ToolboxElement):boolean {
            if (!this.configService.enableFilter) {
                return false;
            }
            if (element instanceof ControlToolboxElement) {
                if (element.isAlreadyPlaced()) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Setter for the label of the tobe created dataschema element.
         * @param type
         */
        setNewElementTypeLabel(type:string) {
            this.newElementTypeLabel = type;
        }

        //TODO support different scopes(inside folders)
        //TODO add more data into content(required, min chars, etc)
        /**
         * Submits the current newElementLabel and newElementTypeLabel and creates a new DataschemaPropery.
         */
        addNewElement() {
            var property:DataschemaProperty = new DataschemaProperty(this.newElementLabel, this.newElementTypeLabel);

            if (!this.toolboxService.addSchemaElement(property, [])) {
                console.log("ERROR: failed to add the element into the schema");
            }

            this.newElementLabel = '';
        }

        /**
         * Removes the specified ControlToolboxElement from the Dataschema.
         * @param element
         */
        removeDataElement(element:ControlToolboxElement) {
            if (element.canBeRemoved()) {
                if (!this.toolboxService.removeSchemaElement(element)) {
                    console.log("ERROR: failed to remove the element from the schema");
                }
            }
        }
    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}

