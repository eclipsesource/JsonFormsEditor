module app.dialogs.dataschemaimport {

    import SocioCortexConnector = app.core.connectors.SocioCortexConnector;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;
    import GithubConnector = app.core.connectors.GithubConnector;

    export class GithubHookRepoStepController extends AbstractWizardStep {

        public someRepoIsSelected = false;
        public selectedRepo;
        public selectedBranch;
        public branches;

        constructor(wizard:AbstractWizard, private githubConnector: GithubConnector, private $q:ng.IQService){
            super(wizard);
        }

        getRepos(): any {
            return this.githubConnector.getRepoList();
        }

        getTitle():string {
            return "Repository";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookRepoStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        submit():angular.IPromise<any> {
            return this.githubConnector.getFilesFromBranch(this.selectedRepo.name, this.selectedBranch.name);
        }

        shallSubmit():boolean {
            return true;
        }

        selectRepo(repo):void {
            this.someRepoIsSelected = true;
            this.selectedRepo = repo;
            this.reloadBranches();
        }

        private reloadBranches(): void{
            this.branches = [];
            this.githubConnector.getBranchList(this.selectedRepo.name).then(
                (result) => {
                    console.log('Loaded branches');
                    console.log(result);
                    this.branches=result;
                },
                (error) => {
                    console.log(error);
                    throw new Error('unable to load branches')
                }
            );
        }

        getBranches(): any{
            return this.branches;
        }

        selectBranch(branch): void{
            console.log('branch selected');
            console.log(branch);
            this.selectedBranch = branch;
            this.wizard.next();
        }
    }
}