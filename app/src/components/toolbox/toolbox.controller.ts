module app.toolbox {

    import GeneralToolboxElement = app.core.GeneralToolboxElement;
    import ControlToolboxElement = app.core.ControlToolboxElement;
    import TreeElement = app.core.TreeElement;
    import ToolboxElement = app.core.ToolboxElement;



    class ToolboxController {

        public filterDataToolbox: boolean = true;
        private tab:number = 1;

        static $inject = ['$scope', '$filter', 'ToolboxService'];

        constructor($scope, public $filter, public toolboxService: ToolboxService) {

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

        shouldHide(element: ToolboxElement): boolean {
            if(!this.filterDataToolbox){
                return false;
            }
            if(element instanceof ControlToolboxElement){
                if(element.isAlreadyPlaced()){
                    return true;
                }
            }
            return false;
        }

        isSet(checkTab):boolean {
            return this.tab == checkTab;
        }

        setTab(activeTab) {
            this.tab = activeTab;
        }
    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}

