module app.tree {

    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import ToolboxService = app.toolbox.ToolboxService;
    import DetailService = app.detail.DetailService;
    import DataschemaService = app.core.dataschema.DataschemaService;


    class MyTreeController {

        static $inject = ['$scope', 'TreeService', 'DataschemaService', 'ToolboxService', 'DetailService'];

        public elements: any = [];

        public treeOptions:{};

        constructor(
            public $scope, 
            public treeService: TreeService,
            public dataschemaService: DataschemaService,
            public toolboxService: ToolboxService,
            public detailService: DetailService){

            this.elements = treeService.elements;

            this.treeOptions = {
                // don't accept more than one element (layout) in the root of the tree
                accept: (sourceNodeScope, destNodesScope, destIndex) => {

                    var source:ToolboxElement = sourceNodeScope.$modelValue;
                    //var dest: TreeElement = source.insertIntoTree(TreeElement.getNewId());

                    var parent:any = destNodesScope.$nodeScope;

                    if (parent == null) {
                        //Means that the element has no parent and therefore is outside the root
                        return false;
                    }

                    var destParent:TreeElement = parent.$modelValue;


                    var accepted:boolean = destParent.acceptsElement(source.getType());

                    return accepted;
                },
                removed: (node) => {
                    var treeElement:TreeElement = node.$modelValue;
                    this.decreasePlacedTimesOfChilds(treeElement);
                }
            };

            $scope.isPreview = false;
            $scope.previewUISchema = {};
            $scope.previewSchema = {};
            $scope.previewData = {};
        }

        decreasePlacedTimesOfChilds(treeElement:TreeElement) {
            this.toolboxService.getAssociatedToolboxElement(treeElement).then((toolboxElement:ToolboxElement) => {
                for (var i = 0; i < treeElement.elements.length; i++) {
                    this.decreasePlacedTimesOfChilds(treeElement.elements[i]);
                }

                if (toolboxElement instanceof ControlToolboxElement) {
                    toolboxElement.decreasePlacedTimes();
                }
            });
        }

        updatePreview():void {
            this.$scope.previewUISchema = JSON.parse(this.treeService.exportUISchemaAsJSON());
            this.$scope.previewSchema = this.dataschemaService.getDataSchema();
            // The data introduced into the preview is not stored, as it's not relevant
            this.$scope.previewData = {};
        }

        preview(bool):void {
            if (bool) {
                this.updatePreview();
            }
            this.$scope.isPreview = bool;
        }

        remove(scope):void {
            scope.removeNode(scope);

        }

        showDetails(node: any) : void {
            this.detailService.setElement(node);
        }

        toggle(scope):void {
            scope.toggle();
        }

    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

