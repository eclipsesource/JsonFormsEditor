module app.dialogs.dataschemaimport {

    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;
    import IDialogService = angular.material.IDialogService;
    import GithubConnector = app.core.connectors.GithubConnector;
    import GithubFile = app.core.connectors.GithubFile;
    import GithubFileLevel = app.core.connectors.GithubFileLevel;
    import IQService = angular.IQService;

    export class GithubHookUISchemaStepController extends AbstractWizardStep {

        public selectedFile:GithubFile;
        private wiz:AbstractWizard;
        private fileSelectorID = 1;
        private gonnaSkip = false;

        constructor(wizard:AbstractWizard, public githubConnector:GithubConnector, private $q: IQService) {
            super(wizard);
            this.wiz = wizard;
        }

        isAllowedToContinue(): boolean {
          if(this.selectedFile){
		 return true;
	  }	  
	  return false;
        }

        getTitle():string {
            return "UI";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookUISchemaStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        shallSubmit():boolean {
            return false;
        }

        hasParentFolder():boolean{
            return this.githubConnector.hasParentFolder();
        }

        goToParentFolder():void{
            this.githubConnector.goToParentFolder();
        }

        submit():IPromise<any> {
            if(this.gonnaSkip){
                var result = {
                    dataSchema: this.githubConnector.getFileLoader(0).loadedFileContents
                };
                return this.$q.when(result);
            }
            return this.githubConnector.loadFile(this.selectedFile, this.fileSelectorID).then((res)=> {
                return {
                    dataSchema: this.githubConnector.getFileLoader(0).loadedFileContents,
                    uiSchema: res
                };
            }, (error)=> {
                this.wiz.showNotification("Invalid file selected, try with a json file.", 3000);
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
                // Instead of going to next step when clicking the file, the user has to click OK
                //this.wizard.next();
            }
        }

        canSkip():boolean{
            return true;
        }
        skip():void{
            this.gonnaSkip = true;
            this.wizard.next();
        }

    }

}