module app.dialogs.dataschemaimport {
    import IDialogService = angular.material.IDialogService;

    export class DataschemaImportController {

        static $inject = ['$mdDialog', 'DataschemaImportService'];

        constructor(private $mdDialog:IDialogService, public importService:DataschemaImportService) {

        }

        hideDialog():void {
            this.$mdDialog.hide();
        }

    }


}