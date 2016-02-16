module app.dialogs.dataschemaimport {

    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;
    import IDialogService = angular.material.IDialogService;
    import GithubConnector = app.core.connectors.GithubConnector;
    export class GithubHookFileStepController extends AbstractWizardStep {

        public selectedFile;

        constructor(wizard:AbstractWizard, private githubConnector: GithubConnector){
            super(wizard);
        }

        getTitle():string {
            return "Select file";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookFileStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        shallSubmit():boolean {
            return false;
        }

        submit():IPromise<any> {
            return undefined;
        }

        getFiles(): any{
            return this.githubConnector.getFileTree();
        }

        selectFile(file:any):void{
            this.selectedFile = file;
            console.log('selected File');
            console.log(file);
            console.log('TODO FROM HERE IN githubHookFileStep');
        }

    }

}