module app.dialogs.dataschemaimport {

    import ImportHook = app.dialogs.dataschemaimport.ImportHook;
    import IDialogService = angular.material.IDialogService;

    export class GithubHookService implements ImportHook {

        static $inject = ['$mdDialog', 'DataschemaImportService'];

        constructor(private $mdDialog:IDialogService, importService:DataschemaImportService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "Github";
        }

        getIconFont():string {
            return "cloud_download";
        }

        openDialog(wizard:AbstractWizard):void {
            this.$mdDialog.hide();
        }

    }

    angular.module('app.dialogs').service('GithubHookService', GithubHookService);

}