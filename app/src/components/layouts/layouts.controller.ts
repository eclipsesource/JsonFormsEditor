/**
 * Created by pancho111203 on 23/12/15.
 */
module app.layouts {
    import ToolboxService = app.toolbox.ToolboxService;
    import ToolboxElement = app.core.ToolboxElement;
    import ControlToolboxElement = app.core.ControlToolboxElement;
    import TreeElement = app.core.TreeElement;

    
    class LayoutsController {
        static $inject = ['$scope', 'ToolboxService'];

        constructor($scope, public toolboxService: ToolboxService){
            var _this = this;
            $scope.treeOptionsToolbox = {
                accept: function (sourceNodeScope, destNodesScope, destIndex) {
                    return false;
                },
                dropped: function(e) {

                    console.log(e);
                    //if the element is being dragged into the toolbar itself, return
                    if(e.dest.nodesScope.$modelValue == e.source.nodesScope.$modelValue) {
                        return;
                    }

                    // Convert the ToolboxElement into a TreeElement
                    var index = e.dest.index;
                    var modelDest: ToolboxElement = e.dest.nodesScope.$modelValue[index];

                    var modelSource: ToolboxElement = e.source.nodeScope.$modelValue;
                    if(modelSource instanceof ControlToolboxElement) {
                        var control: ControlToolboxElement = modelSource;
                        control.increasePlacedTimes();
                    }
                    e.dest.nodesScope.$modelValue[index] = modelDest.insertIntoTree(TreeElement.getNewId());

                }

            };
        }

        getService(): ToolboxService {
            return this.toolboxService;
        }
    }
    console.log(typeof LayoutsController)
    angular.module('app.layouts').controller('LayoutsController', LayoutsController);
}