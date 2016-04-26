module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import ToolboxService = app.toolbox.ToolboxService;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;

    export class UploadHookController extends AbstractWizardStep {

        public uploaderData;
        public uploaderUI;

        private dataFileName: string = "Select a file for the data schema";
        private uiFileName: string = "Select a file for the UI schema (optional)";
        private dataJson:any;
        private uiJson:any;

        static $inject = ['$mdDialog', 'FileUploader', 'ToolboxService'];

        constructor(wizard:AbstractWizard, FileUploader, private $q:IQService) {
            super(wizard);
            this.uploaderData = new FileUploader();
            this.uploaderUI = new FileUploader();
            this.uploaderData.onAfterAddingFile = (file) => {
                var reader = new FileReader();

                reader.onload = () => {
                    this.dataJson = JSON.parse(reader.result);
                };

                this.dataFileName = file._file.name;
                reader.readAsText(file._file);
            };
            this.uploaderUI.onAfterAddingFile = (file) => {
                var reader = new FileReader();

                reader.onload = () => {
                    this.uiJson = JSON.parse(reader.result);
                };

                this.uiFileName = file._file.name;
                reader.readAsText(file._file);
            };
        }

        getTitle(index:number):string {
            return index+1+". Upload";
        }

        getDescription():string {
            return "Please upload your schemas";
        }


        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/uploadHook/uploadStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        submit():angular.IPromise<any> {
            var deferred:IDeferred<any> = this.$q.defer();
            var result = {
                dataSchema: this.dataJson,
                uiSchema: this.uiJson
            };
            deferred.resolve(result);
            if (!result.dataSchema) {
                this.wizard.showNotification("Select at least a valid file for the Data Schema!");
            } else {
                return deferred.promise;
            }
        }

        shallSubmit():boolean {
            return true;
        }
    }
}