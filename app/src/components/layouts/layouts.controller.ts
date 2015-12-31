/**
 * Created by pancho111203 on 23/12/15.
 */
module app.layouts {
    import ToolboxService = app.toolbox.ToolboxService;
    import ToolboxElement = app.core.model.ToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;

    class LayoutsController {

        public treeOptions:{};

        static $inject = ['ToolboxService'];

        constructor(public toolboxService:ToolboxService) {
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
                },
                dragStart: (event) => {
                    var h = 52;
                    var w = $('.tree-view').width() / 2;

                    $(event.elements.placeholder).css('height', h + 'px');
                    $(event.elements.placeholder).css('width', w + 'px');
                }
            };
        }
    }

    angular.module('app.layouts').controller('LayoutsController', LayoutsController);
}