module app.dialogs.dataschemaimport {

    import SocioCortexConnector = app.core.connectors.SocioCortexConnector;
    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;
    import IHttpService = angular.IHttpService;
    import IQService = angular.IQService;

    export class SociocortexHookService implements ImportHook {

        static $inject = ['DataschemaImportService', '$mdDialog', 'SocioCortexConnector', '$q'];

        constructor(importService:DataschemaImportService, private $mdDialog:IDialogService, private socioCortexConnector:SocioCortexConnector, private $q:IQService){
            // sociocortex integration disabled by default
            //importService.registerImportHook(this);
        }

        getTitle():string {
            return "SocioCortex";
        }

        getIconFont():string {
            return "cloud_download";
        }

        openDialog(wizard:AbstractWizard):void {
            wizard.addSteps([new SocioCortexLoginStepController(wizard, this.socioCortexConnector)
                , new SocioCortexWorkspaceStepController(wizard, this.socioCortexConnector, this.$q)
                , new SocioCortexEntityTypeStepController(wizard, this.socioCortexConnector, this.$q)]);
            wizard.next();
        }
    }

    angular.module('app.dialogs').service('SociocortexHookService', SociocortexHookService);
}