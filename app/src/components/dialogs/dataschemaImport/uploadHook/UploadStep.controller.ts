module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import ToolboxService = app.toolbox.ToolboxService;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;

    export class UploadHookController extends AbstractWizardStep {

        public uploader;

        private json:any;

        static $inject = ['$mdDialog', 'FileUploader', 'ToolboxService'];

        constructor(wizard:AbstractWizard, FileUploader, private $q:IQService) {
            super(wizard);
            this.uploader = new FileUploader();

            this.uploader.onAfterAddingFile = (file) => {
                var reader = new FileReader();

                reader.onload = () => {
                    this.json = JSON.parse(reader.result);
                };

                reader.readAsText(file._file);
            };
        }

        getTitle():string {
            return "Upload";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/uploadHook/uploadStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        submit():angular.IPromise<any> {
            var deferred:IDeferred<any> = this.$q.defer();

            deferred.resolve(this.json);

            return deferred.promise;

        }

        shallSubmit():boolean {
            return true;
        }
    }
}