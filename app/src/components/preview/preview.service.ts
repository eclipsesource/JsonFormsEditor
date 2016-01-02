module app.preview {
    import TreeService = app.tree.TreeService;
    import DataschemaService = app.core.dataschema.DataschemaService;

    export class PreviewService implements Observer<PreviewUpdateEvent> {
        public schema:{};
        public uiSchema:{};

        static $inject = ['TreeService', 'DataschemaService'];

        constructor(private treeService:TreeService, private dataschemaService:DataschemaService) {
            this.schema = dataschemaService.getDataSchema();
            this.uiSchema = JSON.parse(treeService.exportUISchemaAsJSON());

            //this.treeService.registerObserver(this);
            //this.dataschemaService.registerObserver(this);
        }

        update(update:PreviewUpdateEvent) {
            if (update.containsSchema()) {
                this.schema = update.getSchema();
            } else if (update.containsUiSchema()) {
                this.uiSchema = update.getUiSchema();
            }
        }


    }

    angular.module('app.preview').service('PreviewService', PreviewService);
}