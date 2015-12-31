module app.toolbox {


    //TODO change scrolling in toolbox to let bottom bar and top tabs stay static

    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import ConfigDialogService = app.header.ConfigDialogService;


    class ToolboxController {

        public newElementLabel: string = '';
        public newElementTypeLabel: string = 'string';

        public elementTypes = ['string', 'number', 'boolean'];

        public treeOptions:{};

        static $inject = ['$filter', 'ToolboxService', 'ConfigDialogService'];

        constructor(public $filter, public toolboxService: ToolboxService, public configService: ConfigDialogService) {

            this.treeOptions = {
                accept: () => {
                    return false;
                },
                dropped: (event) => {
                    //if the element is being dragged into the toolbar itself, return
                    if(event.dest.nodesScope.$modelValue == event.source.nodesScope.$modelValue) {
                        return;
                    }

                    var toolboxElement: ToolboxElement = event.source.nodeScope.$modelValue;
                    if(toolboxElement instanceof ControlToolboxElement) {
                        toolboxElement.increasePlacedTimes();
                    }

                    // Convert the ToolboxElement into a TreeElement
                    var index = event.dest.index;
                    var destination: ToolboxElement = event.dest.nodesScope.$modelValue[index];
                    event.dest.nodesScope.$modelValue[index] = destination.convertToTreeElement();
                },
                dragStart: (event) => {
                    var h = 52;
                    var w = $('.tree-view').width() /2;

                    $(event.elements.placeholder).css('height',h+'px');
                    $(event.elements.placeholder).css('width',w+'px');
                }

            };
        }

        shouldHide(element: ToolboxElement): boolean {
            if(!this.configService.enableFilter){
                return false;
            }
            if(element instanceof ControlToolboxElement){
                if(element.isAlreadyPlaced()){
                    return true;
                }
            }
            return false;
        }

        setNewElementTypeLabel(type: string) {
            this.newElementTypeLabel = type;
        }

        //TODO support different scopes(inside folders)
        //TODO add more data into content(required, min chars, etc)
        addNewElement() {
            var content = {
                type: this.newElementTypeLabel
            };

            var added = this.toolboxService.addSchemaElement(this.newElementLabel, content);

            if(added==false) {
                console.log("ERROR: failed to add the element into the schema");
            }

            this.newElementLabel = '';
        }

        removeDataElement(element: ControlToolboxElement) {
            if(element.canBeRemoved()){
                var removed = this.toolboxService.removeSchemaElement(element.getScope());

                if(removed==false) {
                    console.log("ERROR: failed to remove the element from the schema");
                }
            }
        }
    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}

