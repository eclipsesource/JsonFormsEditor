module app.dialogs.dataschemaimport {

    import SocioCortexConnector = app.core.connectors.SocioCortexConnector;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;
    import GithubConnector = app.core.connectors.GithubConnector;
    import GithubConnector = app.core.connectors.GithubConnector;

    export class GithubHookRepoStepController extends AbstractWizardStep {

        public selectedRepo;

        constructor(wizard:AbstractWizard, private githubConnector: GithubConnector, private repoList: any, private $q:ng.IQService){
            super(wizard);
        }

        getRepos(): any {
            return this.repoList;
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