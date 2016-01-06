module app.tree {

    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import ToolboxService = app.toolbox.ToolboxService;
    import DetailService = app.detail.DetailService;
    import DataschemaService = app.core.dataschema.DataschemaService;
    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;

    class MyTreeController {

        public elements:TreeElement[] = [];
        public treeOptions:{};

        static $inject = ['TreeService', 'DataschemaService', 'ToolboxService', 'DetailService'];

        constructor(private treeService:TreeService, private dataschemaService:DataschemaService, private toolboxService:ToolboxService, private detailService:DetailService) {
            this.elements = treeService.elements;

            this.treeOptions = {
                // don't accept more than one element (layout) in the root of the tree
                accept: (sourceNodeScope, destNodesScope) => {

                    var source:ToolboxElement = sourceNodeScope.$modelValue;

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
                    this.treeService.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(this.treeService.exportUISchemaAsJSON())));
                    this.decreasePlacedTimesOfChilds(treeElement);
                }
            };
        }

        /**
         * Removes the element from the tree.
         * @param scope Scope Element from ui.tree.
         */
        remove(scope):void {
            scope.removeNode(scope);
        }

        /**
         * Shows the Detail-Window for the given element.
         * @param node
         */
        showDetails(node:TreeElement):void {
            this.detailService.setElement(node);
        }

        /**
         * Collapses or expands the current element.
         * @param scope Scope Element from ui.tree.
         */
        toggle(scope):void {
            scope.toggle();
        }

        private decreasePlacedTimesOfChilds(treeElement:TreeElement) {
            this.toolboxService.getAssociatedToolboxElement(treeElement).then((toolboxElement:ToolboxElement) => {
                _.forEach(treeElement.elements, this.decreasePlacedTimesOfChilds.bind(this));

                if (toolboxElement instanceof ControlToolboxElement) {
                    toolboxElement.decreasePlacedTimes();
                }
            });
        }
    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

