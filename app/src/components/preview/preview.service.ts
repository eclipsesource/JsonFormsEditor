module app.preview {
    import TreeService = app.tree.TreeService;
    import DataschemaService = app.core.dataschema.DataschemaService;

    export class PreviewService implements Observer<PreviewUpdateEvent> {
        public schema:{};
        public uiSchema:{};

        private tab:any;

        static $inject = ['$state', 'TreeService', 'DataschemaService'];

        constructor(private $state, private treeService:TreeService, private dataschemaService:DataschemaService) {
            this.schema = dataschemaService.getDataSchema();
            var stringifiedSchema:string = treeService.exportUISchemaAsJSON();
            if(stringifiedSchema){
                this.uiSchema = JSON.parse(stringifiedSchema);
            }

            this.treeService.registerObserver(this);
            this.dataschemaService.registerObserver(this);
        }

        update(update:PreviewUpdateEvent) {
            if (update.containsSchema()) {
                this.schema = update.getSchema();
            } else if (update.containsUiSchema()) {
                this.uiSchema = update.getUiSchema();
            }

            if(this.tab){
                this.tab.postMessage(update, '*');
            }
        }

        openInNewTab():void {
            this.tab = window.open('#preview');
            this.tab.addEventListener('load', () => {
                this.tab.postMessage(new PreviewUpdateEvent(this.schema, this.uiSchema), '*');
            }, false);

            this.$state.go('edit');
        }
    }

    angular.module('app.preview').service('PreviewService', PreviewService);
}