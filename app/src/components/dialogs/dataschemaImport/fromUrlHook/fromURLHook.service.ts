module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;
    import IHttpService = angular.IHttpService;

    export class FromUrlHookService implements ImportHook {

        static $inject = ['DataschemaImportService', '$http'];

        constructor(importService:DataschemaImportService, private $http:IHttpService){
            importService.registerImportHook(this);
        }

        getTitle():string {
            return "URL";
        }

        getIconFont():string {
            return "language";
        }

        openDialog(wizard:AbstractWizard):void {
            wizard.addSteps([new FromUrlHookController(wizard, this.$http)]);
            wizard.next();
        }
    }

    angular.module('app.dialogs.url').service('FromUrlHookService', FromUrlHookService);
}