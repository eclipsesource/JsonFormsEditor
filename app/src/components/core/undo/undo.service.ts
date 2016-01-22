module app.core.undo {
    import TreeService = app.tree.TreeService;
    import ToolboxService = app.toolbox.ToolboxService;
    import DetailService = app.detail.DetailService;
    export class UndoService {

        private treeServiceMementoStack:TreeServiceMemento[] = [];
        private toolboxServiceMementoStack:ToolboxServiceMemento[] = [];

        static $inject = ['TreeService', 'ToolboxService'];

        constructor(private treeService:TreeService, private toolboxService:ToolboxService){

        }

        snapshot():void {
            this.treeServiceMementoStack.push(this.treeService.createMemento());
            this.toolboxServiceMementoStack.push(this.toolboxService.createMemento());
        }

        canUndo():boolean {
            return this.treeServiceMementoStack.length > 0 && this.toolboxServiceMementoStack.length > 0;
        }

        undo():void {
            if(this.canUndo()){
                this.treeService.setMemento(this.treeServiceMementoStack.pop());
                this.toolboxService.setMemento(this.toolboxServiceMementoStack.pop());
            }
        }

    }

    angular.module('app.core').service('UndoService', UndoService);
}