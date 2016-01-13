module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;

    export class UploadHookService implements ImportHook {

        static $inject = ['DataschemaImportService', '$mdDialog'];

        constructor(importService:DataschemaImportService, private $mdDialog:IDialogService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "Upload";
        }

        getDescription():string {
            return "Upload a file from your computer.";
        }

        openDialog():void {
            var options:IDialogOptions = {
                parent: angular.element(document.body),
                templateUrl: 'app/src/components/dialogs/dataschemaImport/uploadHook/uploadHook.html',
                controller: UploadHookController,
                controllerAs: 'dialog',
                clickOutsideToClose:true
            };

            this.$mdDialog.show(options);
        }
    }

    angular.module('app.dialogs').service('UploadHookService', UploadHookService);
}