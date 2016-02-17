module app.dialogs.dataschemaimport {

    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;
    import IDialogService = angular.material.IDialogService;
    import GithubConnector = app.core.connectors.GithubConnector;
    import GithubFile = app.core.connectors.GithubFile;
    export class GithubHookFileStepController extends AbstractWizardStep {

        public selectedFile: GithubFile;

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
            return this.githubConnector.loadFile(this.selectedFile);
        }

        getFiles(): GithubFile[]{
            return this.githubConnector.getFileLevel();
        }

        selectFile(file:GithubFile):void{
            if(file.getType()==='tree'){
                //The file selected was a folder, go into it
                this.githubConnector.goIntoFolder(file);
            }else{
                this.selectedFile = file;
                // Instead of going to next step when clicking the file, the user has to click OK
                //this.wizard.next();
            }
        }

    }

}