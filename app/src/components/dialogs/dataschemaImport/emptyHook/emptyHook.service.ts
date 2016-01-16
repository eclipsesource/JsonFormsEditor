module app.dialogs.dataschemaimport {

    import ImportHook = app.dialogs.dataschemaimport.ImportHook;
    import IDialogService = angular.material.IDialogService;

    export class EmptyHookService implements ImportHook {

        static $inject = ['$mdDialog', 'DataschemaImportService'];

        constructor(private $mdDialog:IDialogService, importService:DataschemaImportService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "Empty Dataschema";
        }

        getIconFont():string {
            return "crop_square";
        }

        openDialog(wizard:AbstractWizard):void {
            this.$mdDialog.hide();
        }

    }

    angular.module('app.dialogs').service('EmptyHookService', EmptyHookService);

}