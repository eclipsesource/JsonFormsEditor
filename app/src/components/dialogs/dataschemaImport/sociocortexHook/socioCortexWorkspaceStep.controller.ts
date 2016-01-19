module app.dialogs.dataschemaimport {

    import SocioCortexConnector = app.core.connectors.SocioCortexConnector;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;

    export class SocioCortexWorkspaceStepController extends AbstractWizardStep {

        public selectedWorkspace;

        constructor(wizard:AbstractWizard, public sociocortexConnector:SocioCortexConnector, private $q:IQService){
            super(wizard);
        }

        getTitle():string {
            return "Workspace";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/sociocortexHook/socioCortexWorkspaceStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        submit():angular.IPromise<any> {
            return this.sociocortexConnector.selectWorkspace(this.selectedWorkspace);
        }

        shallSubmit():boolean {
            return true;
        }

        selectWorkspace(workspace):void {
            this.selectedWorkspace = workspace;
        }
    }
}