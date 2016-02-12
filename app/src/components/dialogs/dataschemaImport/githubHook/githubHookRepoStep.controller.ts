module app.dialogs.dataschemaimport {

    import SocioCortexConnector = app.core.connectors.SocioCortexConnector;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;

    export class GithubHookRepoStepController extends AbstractWizardStep {

        public selectedRepo;

        constructor(wizard:AbstractWizard, public githubConnector:GithubConnector, private $q:IQService){
            super(wizard);
        }

        getTitle():string {
            return "Repository";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/sociocortexHook/githubHookRepoStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        submit():angular.IPromise<any> {
            return this.githubConnector.selectRepo(this.selectedRepo);
        }

        shallSubmit():boolean {
            return true;
        }

        selectRepo(repo):void {
            this.selectedRepo = repo;
            this.wizard.next();
        }
    }
}