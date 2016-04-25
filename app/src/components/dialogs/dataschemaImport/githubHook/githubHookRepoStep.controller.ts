module app.dialogs.dataschemaimport {

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

        isAllowedToContinue(): boolean {
            return (this.selectedRepo && this.selectedBranch);
        }

        getRepos(): any {
            return this.githubConnector.getRepoList();
        }

        getTitle(index:number):string {
            return index+1+". Repository";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookRepoStep.html";
        }

        getDescription():string{
            return "Select the repository and branch containing your schemas";
        }

        hasNavigation():boolean {
            return true;
        }

        submit():angular.IPromise<any> {
            return this.githubConnector.getFilesFromBranch(this.selectedRepo.name, this.selectedBranch.name).then((res)=>{
                this.selectedRepo = undefined;
                this.selectedBranch = undefined;
            });
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
            this.githubConnector.getBranchList(this.selectedRepo.name, this.selectedRepo.owner.login).then(
                (result) => {
                    this.branches=JSON.parse(result.data);
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
            this.selectedBranch = branch;
        }
    }
}