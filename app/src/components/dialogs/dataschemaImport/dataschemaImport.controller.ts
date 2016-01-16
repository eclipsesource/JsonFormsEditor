module app.dialogs.dataschemaimport {
    import IDialogService = angular.material.IDialogService;

    export class DataschemaImportController extends AbstractDialog {

        static $inject = ['$mdDialog', 'DataschemaImportService'];

        constructor($mdDialog:IDialogService, public importService:DataschemaImportService) {
            super($mdDialog);

        }

    }


}