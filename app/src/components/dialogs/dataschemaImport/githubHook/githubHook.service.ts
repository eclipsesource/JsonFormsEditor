module app.dialogs.dataschemaimport {

    import ImportHook = app.dialogs.dataschemaimport.ImportHook;
    import IDialogService = angular.material.IDialogService;

    export class GithubHookService implements ImportHook {

        static $inject = ['$mdDialog', 'DataschemaImportService', '$interval', '$window'];

        private clientId = "0a4cb7fe05a491636df6";

        constructor(private $mdDialog:IDialogService, importService:DataschemaImportService, private $interval:any, private $window:any){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "Github";
        }

        getIconFont():string {
            return "cloud_download";
        }

        openDialog(wizard:AbstractWizard):void {
            this.showPopupGithub();
        }

        showPopupGithub(): void{
            var left = screen.width / 2 - 200;
            var top = screen.height /2 - 200;
            var popup = this.$window.open('https://github.com/login/oauth/authorize?client_id='+this.clientId+'&scope=repos&redirect_uri='+this.$window.location.host+'/#/githublogin', '', "top="+top+", left="+left+", width=400, height=500");
            var interval = 1000;

            var i = this.$interval(function(){
                console.log(popup);
            }, interval);
        }

    }

    angular.module('app.dialogs').service('GithubHookService', GithubHookService);

}