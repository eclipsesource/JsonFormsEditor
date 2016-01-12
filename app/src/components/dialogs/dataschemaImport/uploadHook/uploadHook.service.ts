module app.dialogs.dataschemaimport {

    export class UploadHookService implements ImportHook {

        static $inject = ['DataschemaImportService'];

        constructor(importService:DataschemaImportService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "Upload";
        }

        getDescription():string {
            return "Upload a file from your computer.";
        }

        openDialog():void {
        }
    }

    angular.module('app.dialogs').service('UploadHookService', UploadHookService);
}