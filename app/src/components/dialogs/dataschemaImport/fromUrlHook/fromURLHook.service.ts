module app.dialogs.dataschemaimport {

    export class FromUrlHookService implements ImportHook {

        static $inject = ['DataschemaImportService'];

        constructor(importService:DataschemaImportService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "URL";
        }

        getDescription():string {
            return "Upload a file from a URL";
        }

        openDialog():void {
        }
    }

    angular.module('app.dialogs').service('FromUrlHookService', FromUrlHookService);

}