module app.dialogs {

    import IDialogService = angular.material.IDialogService;

    export class ExportDialogController extends AbstractDialog {

        static $inject = ['$mdDialog', 'content'];

        constructor($mdDialog:IDialogService, public content:string) {
            super($mdDialog);
        }
    }
}