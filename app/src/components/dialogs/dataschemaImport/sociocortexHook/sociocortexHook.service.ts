module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;

    export class SociocortexHookService implements ImportHook {

        static $inject = ['DataschemaImportService', '$mdDialog'];

        constructor(importService:DataschemaImportService, private $mdDialog:IDialogService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "SocioCortex";
        }

        getDescription():string {
            return "Generate a DataSchema from SocioCortex";
        }

        openDialog():void {
            var options:IDialogOptions = {
                parent: angular.element(document.body),
                templateUrl: 'app/src/components/dialogs/dataschemaImport/sociocortexHook/sociocortexHook.html',
                controller: SociocortexHookController,
                controllerAs: 'dialog'
            };

            this.$mdDialog.show(options);
        }
    }

    angular.module('app.dialogs').service('SociocortexHookService', SociocortexHookService);
}