module app.dialogs.dataschemaimport {

    import IHttpService = angular.IHttpService;
    import SocioCortexConnector = app.core.connectors.SocioCortexConnector;

    export class SocioCortexLoginStepController extends AbstractWizardStep {

        public serverURL:string = 'http://server.sociocortex.com/api/v1';
        public username:string;
        public password:string;

        public loginError:boolean = false;
        public loginErrorMessage:string = "Login error. Check that the entered values are correct and try again."

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
            this.loginError = false;
            var catchedError:any;
            return this.sociocortexConnector.login(this.serverURL, this.username, this.password).catch((error) => {
                catchedError = error;
                this.loginError = true;
            }).then(() => {
                if (this.loginError) throw catchedError;
            });
        }

        shallSubmit():boolean {
            return true;
        }
    }
}