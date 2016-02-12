module app.dialogs.dataschemaimport {

    import ImportHook = app.dialogs.dataschemaimport.ImportHook;
    import IDialogService = angular.material.IDialogService;
    import GithubConnector = app.core.connectors.GithubConnector;

    export class GithubHookService implements ImportHook {

        static $inject = ['$mdDialog', 'DataschemaImportService', 'GithubConnector'];



        constructor(private $mdDialog:IDialogService, importService:DataschemaImportService, private githubConnector:GithubConnector){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "Github";
        }

        getIconFont():string {
            return "cloud_download";
        }

        openDialog(wizard:AbstractWizard):void {
            this.githubConnector.showPopupGithub();
        }



    }

    angular.module('app.dialogs').service('GithubHookService', GithubHookService);

}