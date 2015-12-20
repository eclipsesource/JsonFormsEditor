module app.toolbox {

    import GeneralToolboxElement = app.core.GeneralToolboxElement;
    import ControlToolboxElement = app.core.ControlToolboxElement;
    import ToolboxElement = app.core.ToolboxElement;
    import TreeElement = app.core.TreeElement;

    class ToolboxController {


        private tab:number = 1;

        static $inject = ['$scope', 'ToolboxService'];

        constructor($scope, public toolboxService: ToolboxService) {


            $scope.treeOptionsToolbox = {
                dropped: function(e) {

                    // Convert the ToolboxElement into a TreeElement
                    var index = e.dest.index;
                    var modelDest: ToolboxElement = e.dest.nodesScope.$modelValue[index];

                    e.dest.nodesScope.$modelValue[index] = modelDest.insertIntoTree(TreeElement.getNewId());

                }

            };
        }

        public getExpertElements(): GeneralToolboxElement[] {
            return this.toolboxService.expertElements;
        }

        public getSchemaElements(): ControlToolboxElement[] {
            return this.toolboxService.schemaElements;
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

