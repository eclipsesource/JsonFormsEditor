module app.header {

    import IDialogService = angular.material.IDialogService;

    export class ExportDialogController {

        static $inject = ['$mdDialog', 'content'];

        constructor(private $mdDialog:IDialogService, public content:string) {
        }

        hideExportDialog():void {
            this.$mdDialog.hide();
        }
    }
}