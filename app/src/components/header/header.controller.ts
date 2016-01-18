module app.header {

    import TreeService = app.tree.TreeService;
    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;
    import ConfigService = app.core.ConfigService;
    import ExportDialogController = app.dialogs.ExportDialogController;
    import ConfigDialogController = app.dialogs.ConfigDialogController;
    import DataschemaImportService = app.dialogs.dataschemaimport.DataschemaImportService;
    import DataschemaService = app.core.dataschema.DataschemaService;

    class HeaderViewController {

        static $inject = ['TreeService', 'DataschemaService', '$mdDialog'];

        constructor(private treeService:TreeService, private dataschemaService:DataschemaService, private $mdDialog:IDialogService) {
        }

        showExportDialog():void {
            var uiSchema:string = this.treeService.exportUISchemaAsJSON();
            var dataSchema:string = this.dataschemaService.exportDataSchemaAsString();

            var options:IDialogOptions = {
                parent: angular.element(document.body),
                templateUrl: 'app/src/components/dialogs/export/exportDialog.html',
                clickOutsideToClose: true,
                controller: ExportDialogController,
                controllerAs: 'dialog',
                locals: {
                    uiSchema: uiSchema,
                    dataSchema: dataSchema
                }
            };

            this.$mdDialog.show(options);
        }

        showConfigDialog():void {
            var options:IDialogOptions = {
                parent: angular.element(document.body),
                templateUrl: 'app/src/components/dialogs/config/configDialog.html',
                clickOutsideToClose: true,
                controller: ConfigDialogController,
                controllerAs: 'config'
            };

            this.$mdDialog.show(options);
        }
    }

    angular.module('app.header').controller('HeaderViewController', HeaderViewController);
}

