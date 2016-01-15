module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;

    export class FromUrlHookService implements ImportHook {

        static $inject = ['DataschemaImportService', '$mdDialog'];

        constructor(importService:DataschemaImportService, private $mdDialog:IDialogService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "URL";
        }

        getDescription():string {
            return "Upload a file from a URL";
        }

        openDialog():void {
            var options:IDialogOptions = {
                parent: angular.element(document.body),
                templateUrl: 'app/src/components/dialogs/dataschemaImport/fromUrlHook/fromUrlHook.html',
                controller: FromUrlHookController,
                controllerAs: 'dialog'
            };

            this.$mdDialog.show(options);
        }
    }

    angular.module('app.dialogs').service('FromUrlHookService', FromUrlHookService);
}