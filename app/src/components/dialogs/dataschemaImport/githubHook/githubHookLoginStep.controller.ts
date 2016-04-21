module app.dialogs.dataschemaimport {

    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;
    import IDialogService = angular.material.IDialogService;
    import GithubConnector = app.core.connectors.GithubConnector;

    export class GithubHookLoginStepController extends AbstractWizardStep {

        public url:string;

        constructor(wizard:AbstractWizard, private githubConnector: GithubConnector){
            super(wizard);
        }

        getTitle(index:number):string {
            return index+1+". Github Login";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookLoginStep.html";
        }

        getDescription():string {
            return "Click below to log-in to Github"
        }

        hasNavigation():boolean {
            return true;
        }

        shallSubmit():boolean {
            return true;
        }

        submit():IPromise<any> {
           return this.githubConnector.showPopupGithub();
        }
    }

}