module app.dialogs.dataschemaimport {

    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;
    import IDialogService = angular.material.IDialogService;
    import GithubConnector = app.core.connectors.GithubConnector;
    import GithubFile = app.core.connectors.GithubFile;
    import GithubFileLevel = app.core.connectors.GithubFileLevel;

    export class GithubHookFileStepController extends AbstractWizardStep {

        public selectedFile:GithubFile;
        private wiz:AbstractWizard;
        private fileSelectorID = 0;

        constructor(wizard:AbstractWizard, public githubConnector:GithubConnector) {
            super(wizard);
            this.wiz = wizard;
        }

        navigatingToPrevious(){
            this.selectedFile = undefined;
            this.fileSelectorID = undefined;
        }

        isAllowedToContinue(): boolean {
            if(this.selectedFile){
	    	    return true;
	    }
	    return false;
        }

        getTitle(index:number):string {
            return index+1+". Data";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookFileStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        shallSubmit():boolean {
            return true;
        }

        getDescription():string{
            return "Select the data-schema (JSON file)";
        }

        hasParentFolder():boolean{
            return this.githubConnector.hasParentFolder();
        }

        goToParentFolder():void{
            this.githubConnector.goToParentFolder();
        }

        submit():IPromise<any> {
            return this.githubConnector.loadFile(this.selectedFile, this.fileSelectorID).catch((error)=> {
                this.wiz.showNotification("Invalid file selected, try with a json file.");
            });
        }

        getFiles():GithubFile[] {
            return this.githubConnector.getFileLevel().getFiles();
        }

        selectFile(file:GithubFile):void {
            if (file.getType() === 'tree') {
                //The file selected was a folder, go into it
                this.githubConnector.goIntoFolder(file);
            } else {
                this.selectedFile = file;
                // Uncomment this if you want to move to next step when clicking on the file
                //this.wizard.next();
            }
        }

    }

}