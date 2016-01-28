module app.tree {

    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import ToolboxService = app.toolbox.ToolboxService;
    import DetailService = app.detail.DetailService;
    import DataschemaService = app.core.dataschema.DataschemaService;
    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
    import UndoService = app.core.undo.UndoService;

    class MyTreeController {
        public treeOptions:{};

        static $inject = ['TreeService', 'DataschemaService', 'ToolboxService', 'DetailService', 'UndoService'];

        constructor(private treeService:TreeService, private dataschemaService:DataschemaService, private toolboxService:ToolboxService, private detailService:DetailService, private undoService:UndoService) {
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
                beforeDrop: () => {
                    this.undoService.snapshot();
                },
                dropped: () => {
                    this.treeService.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(this.treeService.exportUISchemaAsJSON())));
                },
                beforeDrag: (sourceNodeScope) => {
                    var dragElement:TreeElement = sourceNodeScope.$modelValue;
                    return !dragElement['root'];
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
            this.undoService.snapshot();
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
            for(var i = 0; i <treeElement.elements.length; i++){
                this.decreasePlacedTimesOfChilds(treeElement.elements[i]);
            }
            if(treeElement.getType() === 'Control'){
                this.toolboxService.decreasePlacedTimes(treeElement.getScope());
            }
        }
    }

    angular.module('app.tree').controller('MyTreeController', MyTreeController);
}

