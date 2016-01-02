/**
 * Created by pancho111203 on 23/12/15.
 */
module app.layouts {
    import ToolboxElement = app.core.model.ToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;

    class LayoutsController {

        public treeOptions:{};

        static $inject = ['LayoutsService'];

        constructor(public layoutsService:LayoutsService) {
            this.treeOptions = {
                accept: () => {
                    return false;
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
                }
            };
        }
    }

    angular.module('app.layouts').controller('LayoutsController', LayoutsController);
}