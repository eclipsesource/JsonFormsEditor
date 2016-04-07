module app.toolbox {

    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import ConfigService = app.core.ConfigService;
    import TreeService = app.tree.TreeService;
    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
    import UndoService = app.core.undo.UndoService;

    class ToolboxController {


        public treeOptions:{};

        static $inject = ['ToolboxService', 'ConfigService', 'TreeService', 'UndoService'];

        constructor(public toolboxService:ToolboxService, private configService:ConfigService, private treeService:TreeService, private undoService:UndoService) {
            this.treeOptions = {
                accept: () => {
                    return false;
                },
                beforeDrag: (sourceNodeScope) => {
                    var dragElement:ControlToolboxElement = sourceNodeScope.$modelValue;
                    return !dragElement.isObject();
                },
                beforeDrop: (event) => {
                    if(event['pos']['moving']){
                        this.undoService.snapshot();
                    }
                },
                dropped: (event) => {
                    //if the element is being dragged into the toolbar itself, return
                    if (event.dest.nodesScope.$modelValue == event.source.nodesScope.$modelValue) {
                        return;
                    }

                    var toolboxElement:ToolboxElement = event.source.nodeScope.$modelValue;
                    if (toolboxElement instanceof ControlToolboxElement) {
                        this.toolboxService.increasePlacedTimes(toolboxElement.getScope());
                    }

                    // Convert the ToolboxElement into a TreeElement
                    var index = event.dest.index;
                    var destination:ToolboxElement = event.dest.nodesScope.$modelValue[index];
                    event.dest.nodesScope.$modelValue[index] = destination.convertToTreeElement();

                    this.treeService.modifiedTree();
                    this.treeService.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(treeService.exportUISchemaAsJSON())));
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
            if (this.isPlaced(element)) {
                return true;
            }
            return false;
        }
        /*
        * Returns true if the element is placed on the tree
        * */
        isPlaced(element: ToolboxElement):boolean{
            if (element instanceof ControlToolboxElement) {
                if (this.toolboxService.isAlreadyPlaced(element)) {
                    return true;
                }
            }
            return false;
        }



        clickedBack(){
            this.toolboxService.previousFolder();
        }

        clickedIcon(element: ControlToolboxElement){
            if(element.datatype == 'object'){
                this.toolboxService.accessFolder(element.getScope().split('/').pop());
            }
        }

        canBeRemoved(element: ControlToolboxElement): boolean{
            return this.toolboxService.canBeRemoved(element);
        }
        isParentFolder(){
            return this.toolboxService.currentPath.length == 0;
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

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}

