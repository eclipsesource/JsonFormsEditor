module app.dialogs.dataschemaimport {

    import IHttpService = angular.IHttpService;
    import SocioCortexConnector = app.core.connectors.SocioCortexConnector;

    export class SocioCortexLoginStepController extends AbstractWizardStep {

        public username:string;
        public password:string;

        constructor(wizard:AbstractWizard, private sociocortexConnector:SocioCortexConnector){
            super(wizard);
        }

        getTitle():string {
            return "Login";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/sociocortexHook/socioCortexLoginStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        submit():angular.IPromise<any> {
            return this.sociocortexConnector.login(this.username, this.password);
        }

        shallSubmit():boolean {
            return true;
        }
    }
}