/**
 * Created by pancho111203 on 23/12/15.
 */
module app.layouts {
    import ToolboxElement = app.core.model.ToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import UndoService = app.core.undo.UndoService;
    import TreeService = app.tree.TreeService;
    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;

    class LayoutsController {

        public treeOptions:{};

        static $inject = ['LayoutsService', 'TreeService', 'UndoService'];

        constructor(public layoutsService:LayoutsService, private treeService:TreeService, private undoService:UndoService) {
            this.treeOptions = {
                accept: () => {
                    return false;
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
                    // Convert the ToolboxElement into a TreeElement
                    var index = event.dest.index;
                    var destination:ToolboxElement = event.dest.nodesScope.$modelValue[index];
                    event.dest.nodesScope.$modelValue[index] = destination.convertToTreeElement();

                    this.treeService.modifiedTree();
                }
            };
        }
    }

    angular.module('app.layouts').controller('LayoutsController', LayoutsController);
}