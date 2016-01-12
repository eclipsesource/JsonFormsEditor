module app.dialogs.dataschemaimport {

    export class SociocortexHookService implements ImportHook {

        static $inject = ['DataschemaImportService'];

        constructor(importService:DataschemaImportService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "SocioCortex";
        }

        getDescription():string {
            return "Use a dataschema that is stored in SocioCortex";
        }

        openDialog():void {
        }
    }

    angular.module('app.dialogs').service('SociocortexHookService', SociocortexHookService);
}