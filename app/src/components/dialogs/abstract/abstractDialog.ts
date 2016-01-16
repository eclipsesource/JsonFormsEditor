module app.dialogs {

    import IDialogService = angular.material.IDialogService;

    export abstract class AbstractDialog {

        constructor(protected $mdDialog:IDialogService){

        }

        hideDialog():void {
            this.$mdDialog.hide();
        }

    }
}