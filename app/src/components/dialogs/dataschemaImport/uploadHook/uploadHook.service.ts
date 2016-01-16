module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;
    import IQService = angular.IQService;

    export class UploadHookService implements ImportHook {

        static $inject = ['DataschemaImportService', 'FileUploader', '$q'];

        constructor(importService:DataschemaImportService, private FileUploader, private $q:IQService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "Upload";
        }

        getIconFont():string {
            return "file_upload";
        }

        openDialog(wizard:AbstractWizard):void {
            wizard.addSteps([new UploadHookController(wizard, this.FileUploader, this.$q)]);
            wizard.next();
        }
    }

    angular.module('app.dialogs').service('UploadHookService', UploadHookService);
}